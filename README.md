# Joystream Discovery Node Graphql Schema and queries

This project might evolve into a discovery node service that
talks to the polkascan harvester database and exposes a graphql
search interface.

## Schema

Currently the `schemas/joystream_forum.gql` file has the types for
the discovery node graphql query api.

## Queries

The `schemas/queries.gql` file defines the queries schema.

### Sample Queries [TODO]

We need to add a set of sample queries. For this we want to set up
a graphql service so we can evaluate the correctness of queries.

### Node modules

There are some node modules installed for supporting graphql linting
and supporting visual studio code.

These will be built upon as well when we start building a node.js
service.

## Notes

1. We probably need to capture the account in the grapqhl schema so
that we can use Account type for author and moderator.

## Apollo Service

## Build

Development node was v12.13.0

### Install packages

`yarn install`

### Build from typescript

`yarn run build`

This will put the compiled js files into `dist` folder.

### Run service

Copy `ormconfig.json.sample` to `ormconfig.json` and change the `username`,
`password` and `database` to your connection settings.

Then run the service:

`yarn run start`

Once the service is running you can use the apollo playground to interact
with the query service.

The service will be available on `http://localhost:4000`

## Example Queries

```graphql
{
  getCategories(text: "descr") {
    id
    parentId
    title
    description
    blockId
    extrinsicIdx
    eventIdx
    threads {
      title
      posts {
        currentText
      }
    }
  }
  getPosts(text: "text") {
    id
    currentText
  }
  getThreads(text: "text") {
    id
    text
    posts {
      currentText
    }
  }
  searchFor(text: "text") {
    __typename
    ... on Category {
      title
      description
    }
    ... on Thread {
      title
      text
      authorId
    }
    ... on Post {
      currentText
    }
  }
}
```

The above query is currently returning the following results when there is only one
category in the database, and no threads or posts. The result highlights the use of
unions, __resolveType and __typename.

```json
{
  "data": {
    "getCategories": [
      {
        "id": "1",
        "parentId": null,
        "title": "test title",
        "description": "test description",
        "blockId": 101,
        "extrinsicIdx": 1,
        "eventIdx": 1,
        "threads": null
      }
    ],
    "getPosts": [
      {
        "id": "1",
        "currentText": "a post text"
      }
    ],
    "getThreads": [
      {
        "id": "1",
        "text": "a thread text...",
        "posts": null
      }
    ],
    "searchFor": [
      {
        "__typename": "Thread",
        "title": "a thread title",
        "text": "a thread text...",
        "authorId": null
      },
      {
        "__typename": "Post",
        "currentText": "a post text"
      }
    ]
  }
}
```
