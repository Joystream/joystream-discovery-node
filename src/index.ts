import {createConnection} from "typeorm";
import { ApolloServer, ServerInfo } from 'apollo-server';
import { typeDefs } from './schema';

// Create connection to database
createConnection().then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));

// Create apollo server
const server = new ApolloServer({ typeDefs });

// start apollo server
server.listen().then((url: ServerInfo) => {
  console.log(`Server ready at ${url.url}`);
});



