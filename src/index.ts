import {createConnection} from "typeorm";
import { ApolloServer, ServerInfo } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './resolvers';
import { Category } from "./entity/category";
import CategoryDataSource from "./datasources/category_datasource";

// Create connection to database
createConnection().then(async connection => {
  // Create apollo server
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
      categories: new CategoryDataSource(connection)
    }),
  });

  // start apollo server
  server.listen().then((url: ServerInfo) => {
    console.log(`Server ready at ${url.url}`);
  });

}).catch(error => console.log(error));
