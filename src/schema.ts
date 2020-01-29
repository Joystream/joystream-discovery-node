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

import { gql } from "apollo-server";

const typeDefs = gql`
  # From: apps/packages/joy-types/src/forum.ts:ModerationActionType
  type ForumModerationAction {
    moderated_at: ForumBlockchainTimestamp
    moderator_id: String # AccountId
    rationale: String
  }

  # From: apps/packages/joy-types/src/forum.ts:BlockchainTimestamp
  type ForumBlockchainTimestamp {
    block: String # instead of u64 due to overflow
    time: String # instead of Date.
  }

  # From: apps/packages/joy-types/src/forum.ts:ChildPositionInParentCategoryType
  type ForumChildPositionInParentCategory {
    parent_id: String # instead of u64 due to overflow
    child_nr_in_parent_category: String # instead of u32 due to overflow
  }

  type ForumCategory {
    # Relations
    parent: ForumCategory
    threads: [ForumThread]
    subcategories: [ForumCategory]

    # From: apps/packages/joy-types/src/forum.ts:CategoryType
    id: String # instead of u64 due to overflow
    title: String
    description: String
    created_at: ForumBlockchainTimestamp
    deleted: Boolean
    archived: Boolean
    num_direct_subcategories: String # instead of u32 due to overflow
    num_direct_unmoderated_threads: String # instead of u32 due to overflow
    num_direct_moderated_threads: String # instead of u32 due to overflow
    position_in_parent_category: ForumChildPositionInParentCategory
    moderator_id: String # AccountId
  }

  type ForumThread {
    # Relations
    parent: ForumCategory
    # author: MembersProfile # TODO add when harvester updated
    replies: [ForumPost]

    # From: apps/packages/joy-types/src/forum.ts:ThreadType
    id: String # instead of u64 due to overflow
    title: String
    category_id: String # instead of u64 due to overflow
    nr_in_category: String # instead of u64 due to overflow
    moderation: ForumModerationAction
    num_unmoderated_posts: String # instead of u64 due to overflow
    num_moderated_posts: String # instead of u64 due to overflow
    created_at: ForumBlockchainTimestamp
    author_id: String
  }

  type ForumPost {
    # Relations
    thread: ForumThread

    # From: apps/packages/joy-types/src/forum.ts:PostType
    id: String # instead of u64 due to overflow
    thread_id: String # instead of u64 due to overflow
    nr_in_thread: String # instead of u32 due to overflow
    current_text: String
    moderation: ForumModerationAction
    created_at: ForumBlockchainTimestamp
    author_id: String # AccountId
  }

  union ForumSearchResult = ForumCategory | ForumThread | ForumPost

  type Query {
    # Story: A user can list categories.
    # Story: A user can list subcategories.
    getForumCategories(id: ID): [ForumCategory]!

    # Story: A user can list threads for a category.
    getForumThreads(categoryId: ID!): [ForumThread]!

    # Story: A user can list replies for a thread.
    getForumPosts(threadId: ID!): [ForumPost]!

    # Story: A user should be able to full text search over threads and posts.
    searchForum(text: String!): [ForumSearchResult]!

    # Story: A user should get the most recent posts in a category and over all.
    recentForumPosts(categoryId: ID, limit: Int): [ForumPost]!
  }
`;

export { typeDefs };
