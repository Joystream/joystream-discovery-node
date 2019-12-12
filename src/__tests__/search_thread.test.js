import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import sinon from 'sinon';

import { constructTestServer } from './__utils';
import { EntityManager } from 'typeorm';
import { Thread } from '../../dist/src/entity/thread';

const SEARCH_THREADS = gql`
    query threadList($term: String) {
        getThreads(text: $term) {
            id
            title
            text
        }
    }
`;

describe('Search threads query', () => {

    it('finds a match for existing string', async () => {
        const manager = sinon.createStubInstance(EntityManager);
        let thread = new Thread()
        thread.id = 1
        thread.title = 'thread 1'
        thread.text = 'thread 1 text'
        manager.find.resolves([thread]);

        const context = {
            manager: manager
        }
        const { server } = constructTestServer({context: context});
        const {query} = createTestClient(server);
        const res = await query({query: SEARCH_THREADS, variables: {term: 'test term'}});
        expect(res).toMatchSnapshot();
    });
});