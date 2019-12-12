const { ApolloServer } = require('apollo-server');

import { typeDefs } from '../../dist/src/schema';
import resolvers from '../../dist/src/resolvers';

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = {} } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  return { server };
};

const _constructTestServer = constructTestServer;
export { _constructTestServer as constructTestServer };

// KP: There is more about e2e testing here:
// https://github.com/apollographql/fullstack-tutorial/blob/6988f6948668ccc2dea3f7a216dd44bdf25a0b9f/final/server/src/__tests__/__utils.js#L37
// We can add that later as needed.