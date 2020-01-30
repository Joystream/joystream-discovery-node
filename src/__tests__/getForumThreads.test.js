import { createTestClient } from 'apollo-server-testing';
import sinon from 'sinon';
import gql from 'graphql-tag';
import { constructTestServer } from './__utils';
import { EntityManager } from 'typeorm';
import * as dbPostModule from '../../dist/src/entity/post';
import * as dbThreadModule from '../../dist/src/entity/thread';
import * as dbCategoryModule from '../../dist/src/entity/category';
import { ForumPost } from '../../dist/src/entity/post';

const QUERY_CATEGORY_THREADS = gql`
  {
    getForumThreads(categoryId: 1) {
      parent { title }
      replies { current_text }
      id
      title
      category_id
      nr_in_category
      # TODO moderation
      num_unmoderated_posts
      num_moderated_posts
      created_at { block, time }
      author_id
    }
  }
`;

const THREAD_FIXTURE = {
  id: "id",
  title: "thread title",
  category_id: "category id",
  nr_in_category: "nr in category",
  num_unmoderated_posts: "num unmoderated posts",
  num_moderated_posts: "num moderated posts",
  author_id: "author id",
  created_at_block_number: "created at block number",
  created_at_moment: "created at moment"
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

const CATEGORY_FIXTURE = {
  title: "category title"
}

const EXPECTED_OUTPUT = {
  "getForumThreads": [
    {
      "parent": {
        "title": "category title"
      },
      "replies": [
        {
          "current_text": "post text"
        }
      ],
      "id": "id",
      "title": "thread title",
      "category_id": "category id",
      "nr_in_category": "nr in category",
      "num_unmoderated_posts": "num unmoderated posts",
      "num_moderated_posts": "num moderated posts",
      "created_at": {
        "block": "created at block number",
        "time": "created at moment"
      },
      "author_id": "author id"
    }
  ]
}

describe('getForumThreads', () => {
  it('gets threads for given categoryId id', async () => {
    const manager = sinon.createStubInstance(EntityManager);
    sinon.stub(dbThreadModule, "getCategoryThreads").returns(Promise.resolve([THREAD_FIXTURE]));
    sinon.stub(dbPostModule, "getThreadPosts").returns(Promise.resolve([POST_FIXTURE]));
    sinon.stub(dbCategoryModule, "getCategory").returns(Promise.resolve(CATEGORY_FIXTURE));
    const { server } = constructTestServer({context: { manager }});
    const {query} = createTestClient(server);
    const res = await query({query: QUERY_CATEGORY_THREADS, variables: {term: 'test term'}});
    expect(res['data']).toEqual(EXPECTED_OUTPUT)
  });
});
