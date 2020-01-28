import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import sinon from 'sinon';

import { constructTestServer } from './__utils';
import { EntityManager } from 'typeorm';
import { PostDB } from '../../dist/src/entity/post';

const SEARCH_POSTS = gql`
    query postList($term: String) {
        getPosts(text: $term) {
            id
            current_text
            thread {
                id
                title
                text
            }
        }
    }
`;

describe('Search posts query', () => {

    it('finds a match for existing string', async () => {
        const manager = sinon.createStubInstance(EntityManager);
        let post = new PostDB()
        post.id = 1
        post.title = 'post 1'
        post.text = 'post 1 text'
        manager.find.resolves([post]);

        const context = {
            manager: manager
        }
        const { server } = constructTestServer({context: context});
        const {query} = createTestClient(server);
        const res = await query({query: SEARCH_POSTS, variables: {term: 'test term'}});
        expect(res).toMatchSnapshot();
    });
});
