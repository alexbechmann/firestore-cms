import React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import {
  Link,
  Button,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  List,
  Avatar,
  ListItemAvatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  makeStyles
} from '@material-ui/core';
import Img from 'gatsby-image';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    [key: string]: any;
  };
}

const useStyles = makeStyles(theme => ({
  cardContent: {
    minHeight: theme.spacing(14)
  }
}));

export default function(props: IndexPageProps) {
  const classes = useStyles();
  return (
    <Layout title="Welcome to the Refract Cms docs">
      <Typography variant="h5" gutterBottom>
        What is Refract-CMS?
      </Typography>
      <Typography paragraph>
        Refract-CMS is an open source, code first, self-hosted headless CMS that uses React, Express & MongoDB.
      </Typography>
      <br />
      <br />

      <Typography variant="h5" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card elevation={20}>
            <CardHeader title="Code first" />
            <CardContent className={classes.cardContent}>
              <Typography>
                Schema configuration such as fields & editor components are configured in code only. This means
                developers can version control & embrace good DevOps practices.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={20}>
            <CardHeader title="Customizable" />
            <CardContent className={classes.cardContent}>
              <Typography>
                Creating a custom editor is as simple as creating a react component & importing it into the schema
                declaration. You can also add server-side custom resolvers for user-defined custom fields.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={20}>
            <CardHeader title="Type safety" />
            <CardContent className={classes.cardContent}>
              <Typography>
                All configuration is type-safe using TypeScript, allowing you to be confident when making changes to the
                schema.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={20}>
            <CardHeader title="GraphQL" />
            <CardContent className={classes.cardContent}>
              <Typography>
                A GraphQL endpoint with rich filtering & sorting is generated for your consuming apps, allowing you to
                extract all CMS data as well as add custom resolvers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Button variant="raised" component="a" color="secondary" onClick={() => navigate('/cli')}>
          Get started with CLI
        </Button> */}
    </Layout>
  );
}
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    tsImg: file(relativePath: { eq: "ts.png" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    mongodbImg: file(relativePath: { eq: "mongodb.jpg" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    nodejsImg: file(relativePath: { eq: "nodejs.png" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    reactImg: file(relativePath: { eq: "react.png" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
