---
path: "/plugin-code-gen"
title: Codegen Plugin
section: Plugins
order: 7
---

This will generate typescript interfaces for all schemas & allow you to write queries that will generate react hooks for apollo to be consumed by a frontend project.

### Installation

```
npm install --save @refract-cms/plugin-code-gen
```

Add server plugin to `server.config.ts`

This example assumes you used the "blog" starter for the query. If you didn't use this starter, replace `authorList` with any query that makes sense in your project.

```tsx
// ... rest of imports
import { codeGenServerPlugin } from "@refract-cms/plugin-code-gen/dist/server";
import path from "path";
import gql from "graphql-tag";

export default configureCliServer({
  // rest of config
  plugins: [
    // rest of your plugins
    codeGenServerPlugin({
      outputPath: path.resolve(process.cwd(), "generated"),
      queries: [
        gql`
          query allAuthors {
            authorList {
              _id
              firstName
              lastName
            }
          }
        `
      ]
    })
  ]
});
```

Then in your frontend project

```
npm install --save @apollo/react-hooks graphql apollo-client apollo-link-http apollo-cache-inmemory
```

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import introspectionResult from "../path/to/generated/introspect.generated.json";
import { useAllAuthorsQuery } from "../path/to/generated";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "same-origin"
});
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult
});
const cache = new InMemoryCache({
  addTypename: true,
  fragmentMatcher
});
const apolloClient = new ApolloClient({
  link,
  cache
});

function Authors() {
  const { data, error, loading } = useAllAuthorsQuery();
  if (error) {
    return <p>Something went wrong!</p>;
  } else if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {data.authorList.map(author => {
        return (
          <p>
            {author.lastName}, {author.firstName}
          </p>
        );
      })}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Authors />
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Architecture

We recommend having both backend & all frontends in one "mono-repo" e.g:

```
git repo:

cms/
frontend-web/
frontend-react-native/
```

This way you can import the generated output from the server in your frontend projects and be 100% sure that it's always in sync.
