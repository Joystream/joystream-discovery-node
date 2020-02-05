import { createTestClient } from 'apollo-server-testing';
import sinon from 'sinon';
import gql from 'graphql-tag';
import { constructTestServer } from './__utils';
import { EntityManager } from 'typeorm';
import * as dbPostModule from '../../dist/src/entity/post';
import * as dbCategoryModule from '../../dist/src/entity/category';
import * as dbThreadModule from '../../dist/src/entity/thread';
import { ForumPost } from '../../dist/src/entity/post';

const QUERY_THREAD_POSTS = gql`
  {
    getForumCategories(id: null) {

      parent { title }
      threads { title }
      subcategories { title }

      id
      title
      description
      created_at { block, time }
      deleted
      archived
      num_direct_subcategories
      num_direct_unmoderated_threads
      num_direct_moderated_threads
      position_in_parent_category { parent_id, child_nr_in_parent_category }
      moderator_id
    }
  }
`;

const CATEGORY_FIXTURE = {
  id: "id",
  parent_id: "parent id",
  title: "category title text",
  description: "description text",
  deleted: false,
  archived: false,
  num_direct_subcategories: "1",
  num_direct_unmoderated_threads: "2",
  num_direct_moderated_threads: "3",
  account_id: "account id",
  created_at_block_number: "created at block number",
  created_at_moment: "created at moment",
  position_in_parent_category_db: "position in parent category db",
}

const THREAD_FIXTURE = {
  title: "thread title"
}

const EXPECTED_OUTPUT = {
  "getForumCategories": [
    {
      "parent": {
        "title": "category title text"
      },
      "threads": [
        {
          "title": "thread title"
        }
      ],
      "subcategories": [
        {
          "title": "category title text"
        }
      ],
      "id": "id",
      "title": "category title text",
      "description": "description text",
      "created_at": {
        "block": "created at block number",
        "time": "created at moment"
      },
      "deleted": false,
      "archived": false,
      "num_direct_subcategories": "1",
      "num_direct_unmoderated_threads": "2",
      "num_direct_moderated_threads": "3",
      "position_in_parent_category": {
        "parent_id": "parent id",
        "child_nr_in_parent_category": "position in parent category db"
      },
      "moderator_id": "account id"
    }
  ]
}

describe('getForumCategories', () => {
  it('gets posts for given thread id', async () => {
    const manager = sinon.createStubInstance(EntityManager);
    sinon.stub(dbCategoryModule, "getCategories").returns(Promise.resolve([CATEGORY_FIXTURE]));
    sinon.stub(dbCategoryModule, "getCategory").returns(Promise.resolve(CATEGORY_FIXTURE));
    sinon.stub(dbThreadModule, "getCategoryThreads").returns(Promise.resolve([THREAD_FIXTURE]));

    const { server } = constructTestServer({context: { manager }});
    const {query} = createTestClient(server);
    const res = await query({query: QUERY_THREAD_POSTS});

    //console.log("RES: ", JSON.stringify(res, null, 2))
    expect(res['data']).toEqual(EXPECTED_OUTPUT)
  });
});
