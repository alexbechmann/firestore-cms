---
path: "/cli"
title: Use the Refract-CMS CLI
section: Quick start
order: 1
---

## Create new project with CLI

```
npx @refract-cms/create-app --dir my-app
cd my-app
```

## Setup MongoDB

### Use docker

The easiest way to develop is to use docker for MongoDB.

The file `docker-compose.yml` in the root of the project contains two images, one for mongodb & another for mongo-express, so you can view/edit/delete records in the database.

`docker-compose` command requires docker to be installed on your local machine.

```
docker-compose up -d
```

### Provide your own MongoDB connection string

You can put the connection string for a MongoDB Connection in .env file.

It should have read & write access so the server can interact with the database

## Commands

### start

```
npm start
```

### build

```
npm run build
```

## Start building your schema

Create your schema (See "Create schema config") and watch your changes hot reload automatically.

## Run in production

```
npm run build
node ./dist/server.js
```
