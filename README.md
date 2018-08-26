# Refract-CMS

Refract-CMS allows you to build a frontend first, code first, headless CMS using React, Express & MongoDB.

## Stack

### Frontend
Unlike most other CMS systems, the models are defined in a React SPA, rather than the Backend. The SPA defines the schema & renders the Content Manager "Admin" Component. 

You can host a seperate React app for the CMS frontend, or add it to a route on your existing React app.

Property editors for each property on the entity model are added to the schema here, allowing you to choose between some of the in-built editors (TextBox, Select, Image) or to write your own.


### Technologies
* React
* Typescript (optional)


### Server
The backend server hosts the API endpoints & handles authentication.

### Technologies
* Node
* Express
* MongoDB
* Typescript (optional)

## Quick Start (TypeScript)

## Frontend
```
npm i -g create-react-app
create-react-app frontend --scripts-version=react-scripts-ts
cd ./frontend
npm i -S @refract-cms/core
```

```tsx
import * as React from 'react';
import {
  Entity,
  defineEntity,
  TextEditor,
  EntityPickerEditor,
  DatePickerEditor,
  ListEditor,
  Admin,
  configure
} from '@refract-cms/core';

export interface NewsArticle extends Entity {
  title: string;
  articleText: string;
  articleDate: Date;
}

export const NewsArticleSchema = defineEntity<NewsArticle>({
  alias: 'newsArticle',
  displayName: 'News Article'
})({
  title: {
    displayName: 'Headline',
    editorComponent: TextEditor({
      maxLength: 100
    }),
    defaultValue: 'default headline'
  },
  articleText: {
    displayName: 'Article text',
    editorComponent: props => <input value={props.value} onChange={e => props.setValue(e.target.value)} /> 
    // This is a bare bones custom component at it's most basic level
  }
});

configure({
  schema: [NewsArticleSchema],
  serverUrl: 'http://localhost:3500' // See server below
});

ReactDOM.render(<Admin />, document.getElementById('root') as HTMLElement);
```

## Server
`docker-compose.yml`
```yml
version: "3"
services:
  mongo:
    image: mongo

  server:
    image: refractcms/server
    links: 
      - mongo
    expose: 
      - 3500
    ports:
      - "3500:3500"
    restart: unless-stopped

  mongoexpress:
    image: mongo-express
    ports: 
      - "8071:8071"
    links:
      - mongo
```
```
docker-compose up
```