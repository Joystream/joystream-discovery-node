// Joystream Discovery Node is a graphql query server for 
// the Joystream Substrate SRML.
// Copyright (C) 2019 Kulpreet Singh

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import {createConnection} from "typeorm";
import { ApolloServer, ServerInfo } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './resolvers';
import CategoryDataSource from "./datasources/category_datasource";
import PostDataSource from "./datasources/post_datasource";
import ThreadDataSource from "./datasources/thread_datasource";

// Create connection to database
createConnection().then(async connection => {
  // Create apollo server
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
      categories: new CategoryDataSource(connection),
      posts: new PostDataSource(connection),
      threads: new ThreadDataSource(connection)
    }),
  });

  // start apollo server
  server.listen().then((url: ServerInfo) => {
    console.log(`Server ready at ${url.url}`);
  });

}).catch(error => console.log(error));
