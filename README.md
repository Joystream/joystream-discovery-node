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