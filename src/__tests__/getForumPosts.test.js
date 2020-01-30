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
    "getForumPosts": [
    {
      "thread": {
        "title": "thread title"
      },
      "current_text": "post text",
      "id": "post id",
      "thread_id": "1",
      "nr_in_thread": "rn in thread",
      "author_id": "author id",
      "moderation": null,
      "created_at": {
        "block": "created at block number",
        "time": "created at moment"
      }
    }
  ]
}

describe('getForumPosts', () => {
  it('gets posts for given thread id', async () => {
    const manager = sinon.createStubInstance(EntityManager);
    sinon.stub(dbPostModule, "getThreadPosts").returns(Promise.resolve([POST_FIXTURE]));
    sinon.stub(dbThreadModule, "getThread").returns(Promise.resolve(THREAD_FIXTURE));
    const { server } = constructTestServer({context: { manager }});
    const {query} = createTestClient(server);
    const res = await query({query: QUERY_THREAD_POSTS, variables: {term: 'test term'}});
    // console.log("RES: ", JSON.stringify(res, null, 2))
    expect(res['data']).toEqual(EXPECTED_OUTPUT)
  });
});
