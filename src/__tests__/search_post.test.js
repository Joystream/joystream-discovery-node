import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import sinon from 'sinon';

import { constructTestServer } from './__utils';
import { EntityManager } from 'typeorm';
import { ForumPost } from '../../dist/src/entity/post';

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

describe.skip('Search posts query', () => {

    it('finds a match for existing string', async () => {
        const manager = sinon.createStubInstance(EntityManager);
        let post = new ForumPost()

        post.parent = null
        post.replies = null
        post.moderation = null
        post.created_at = null

        post.id = 1
        post.thread_id = 'thread id'
        post.author_id = 'author id'
        post.nr_in_thread = 'author id'
        post.current_text = 'current text'
        post.created_at_block_number = '12345'
        post.created_at_moment = '12345'
        post.block_id = '12345'
        post.extrinsic_idx = '12345'
        post.event_id = '12345'

        manager.find.resolves([post]);

        const context = {
            manager: manager
        }
        const { server } = constructTestServer({context: context});
        const {query} = createTestClient(server);
        const res = await query({query: SEARCH_POSTS, variables: {term: 'test term'}});
        console.log("RES: ", res)
        expect(res).toMatchSnapshot();
    });
});
