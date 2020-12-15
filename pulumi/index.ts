import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';
import * as digitalocean from '@pulumi/digitalocean';
import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';

const sharedStack = new pulumi.StackReference('alexbechmann/pulumi-home-k8s-shared/master');
const kubeconfig = sharedStack.getOutput('kubeconfig');
const publicIp = sharedStack.getOutput('publicIp');
// const nginxIngressIp = sharedStack.getOutput('nginxIngressIp');
const provider = new k8s.Provider('shared-cluster', {
  kubeconfig
});
const env = pulumi.getStack();

const project = 'refract-cms';

const dockerImage = new docker.Image('image', {
  build: '../docs/',
  imageName: `alexbechmann/${project}:${env}`
});

const appName = `${project}-${env}`;
const appLabels = { app: appName };

const namespace = appName;

const appNamespace = new k8s.core.v1.Namespace(
  'namespace',
  {
    metadata: {
      name: namespace
    }
  },
  { provider }
);

const deployment = new k8s.apps.v1.Deployment(
  appName,
  {
    metadata: {
      namespace
    },
    spec: {
      selector: { matchLabels: appLabels },
      strategy: {
        rollingUpdate: { maxSurge: 5, maxUnavailable: 3 }
      },
      replicas: 2,
      template: {
        metadata: { labels: appLabels },
        spec: {
          containers: [
            {
              name: 'app',
              imagePullPolicy: 'Always',
              image: dockerImage.imageName,
              resources: {
                requests: {
                  cpu: '100m',
                  memory: '128Mi'
                },
                limits: {
                  cpu: '250m',
                  memory: '256Mi'
                }
              },
              ports: [{ containerPort: 80 }],
              livenessProbe: {
                httpGet: {
                  path: '/',
                  port: 80
                },
                initialDelaySeconds: 5,
                periodSeconds: 15
              }
            }
          ]
        }
      }
    }
  },
  { provider }
);

const appService = new k8s.core.v1.Service(
  appName,
  {
    metadata: {
      name: appName,
      namespace
    },
    spec: {
      ports: [
        {
          name: 'app',
          port: 80,
          protocol: 'TCP',
          targetPort: 80
        }
      ],
      selector: {
        app: appName
      },
      type: 'ClusterIP'
    }
  },
  { provider }
);

const hostPrefixes = [`${env}`];

if (env === 'master') {
  const domain = new digitalocean.Domain('refract-cms', {
    name: 'refract-cms.com',
    ipAddress: publicIp
  });
  hostPrefixes.push(''); // empty for root domain
  hostPrefixes.push('www'); // empty for root domain
}

export const hosts: string[] = [];

hostPrefixes.forEach(hostPrefix => {
  const issuer: 'staging' | 'prod' = 'prod'; // env === "master" ? "prod" : "staging";
  const secretName = `tls-${hostPrefix}-secret-${issuer}`;
  const host = hostPrefix ? `${hostPrefix}.refract-cms.com` : 'refract-cms.com';
  hosts.push(host);
  if (hostPrefix) {
    var dns = new digitalocean.DnsRecord(host, {
      ttl: 300,
      name: hostPrefix,
      domain: 'refract-cms.com',
      type: 'A',
      value: publicIp
    });
  }
  const ingress = new k8s.networking.v1beta1.Ingress(
    host,
    {
      metadata: {
        name: hostPrefix,
        namespace,
        annotations: {
          'kubernetes.io/ingress.class': 'nginx',
          'cert-manager.io/cluster-issuer': `letsencrypt-${issuer}`
        }
      },
      spec: {
        tls: [
          {
            hosts: [host],
            secretName
          }
        ],
        rules: [
          {
            host,
            http: {
              paths: [
                {
                  path: '/',
                  backend: {
                    serviceName: appService.metadata.name,
                    servicePort: 80
                  }
                }
              ]
            }
          }
        ]
      }
    },
    { provider }
  );

  // const sslCert = k8s.yaml.parse(
  //   {
  //     yaml: `
  //     apiVersion: cert-manager.io/v1alpha2
  //     kind: Certificate
  //     metadata:
  //       name: ${secretName}
  //     spec:
  //       secretName: ${secretName}
  //       dnsNames:
  //       - ${host}
  //       acme:
  //         config:
  //         - http01:
  //             ingressClass: nginx
  //           domains:
  //           - ${host}
  //       issuerRef:
  //         name: letsencrypt-prod
  //         kind: Issuer
  //       `
  //   },
  //   { provider }
  // );
});
