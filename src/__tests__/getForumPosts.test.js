import { createTestClient } from 'apollo-server-testing';
import sinon from 'sinon';
import gql from 'graphql-tag';
import { constructTestServer } from './__utils';
import { EntityManager } from 'typeorm';
import * as dbPostModule from '../../dist/src/entity/post';
import * as dbThreadModule from '../../dist/src/entity/thread';
import { ForumPost } from '../../dist/src/entity/post';

const QUERY_THREAD_POSTS = gql`
  {
    getForumPosts(threadId: 1) {
      thread { title }
      current_text
      id
      thread_id
      nr_in_thread
      current_text
      author_id
      moderation { moderator_id }
      created_at { block, time }
    }
  }
`;

const THREAD_FIXTURE = {
  title: "thread title"
}

const POST_FIXTURE = {
  current_text: "post text",
  id: "post id",
  thread_id: "1",
  nr_in_thread: "rn in thread",
  author_id: "author id",
  created_at_block_number: "created at block number",
  created_at_moment: "created at moment"
}

const EXPECTED_OUTPUT = {

}

describe('getForumPosts', () => {
  it('foo', async () => {
    const manager = sinon.createStubInstance(EntityManager);
    // manager.find.resolves([POST_FIXTURE]);
    sinon.stub(dbPostModule, "findPosts").returns(Promise.resolve([POST_FIXTURE]));
    sinon.stub(dbThreadModule, "getThread").returns(Promise.resolve(THREAD_FIXTURE));
    const { server } = constructTestServer({context: { manager }});
    const {query} = createTestClient(server);
    const res = await query({query: QUERY_THREAD_POSTS, variables: {term: 'test term'}});
    console.log("RES: ", JSON.stringify(res, null, 2))
  });

});
