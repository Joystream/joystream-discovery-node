import { createTestClient } from 'apollo-server-testing';
import sinon from 'sinon';
import gql from 'graphql-tag';
import { constructTestServer } from './__utils';
import { EntityManager } from 'typeorm';
import * as dbPostModule from '../../dist/src/entity/post';
import * as dbThreadModule from '../../dist/src/entity/thread';
import * as dbCategoryModule from '../../dist/src/entity/category';
import { ForumPost } from '../../dist/src/entity/post';


const THREAD_FIXTURE = {
  id: "thread id",
  title: "thread title",
}

const POST_FIXTURE = {
  id: "post id",
  current_text: "post text",
}

const CATEGORY_FIXTURE = {
  id: "category id",
  title: "category title",
  description: "category description",
}

const EXPECTED_OUTPUT = {
    "searchForum": [
    {
      "__typename": "ForumCategory",
      "id": "category id",
      "title": "category title",
      "description": "category description"
    },
    {
      "__typename": "ForumThread",
      "id": "thread id",
      "title": "thread title"
    },
    {
      "__typename": "ForumPost",
      "id": "post id",
      "current_text": "post text"
    }
  ]
}

const QUERY_SEARCH = gql`
  {
    searchForum(text: "foo") {
      __typename
      ... on ForumCategory {
        id
        title
        description
      }
      ... on ForumThread {
        id
        title
      }
      ... on ForumPost {
        id
        current_text
      }
    }
  }
`;

describe('searchForum', () => {
  it('searches categories, threads and posts', async () => {
    const manager = sinon.createStubInstance(EntityManager);
    sinon.stub(dbThreadModule, "findThreads").returns(Promise.resolve([THREAD_FIXTURE]));
    sinon.stub(dbPostModule, "findPosts").returns(Promise.resolve([POST_FIXTURE]));
    sinon.stub(dbCategoryModule, "findCategories").returns(Promise.resolve([CATEGORY_FIXTURE]));
    const { server } = constructTestServer({context: { manager }});
    const {query} = createTestClient(server);
    const res = await query({query: QUERY_SEARCH, variables: {term: 'test term'}});
    // console.log(JSON.stringify(res, null, 2))
    expect(res['data']).toEqual(EXPECTED_OUTPUT)
  });
});
