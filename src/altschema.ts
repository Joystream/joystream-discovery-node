// Joystream Discovery Node is a graphql query server for
// the Joystream Substrate SRML.
// Copyright (C) 2020 Fabian Barkhau

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
  ##  TODO add when harvester updated
  ##  type MembersProfile {
  ##
  ##    # From: apps/packages/joy-types/src/members.ts:Profile
  ##    id: String # instead of u64 due to overflow
  ##    handle: String
  ##    avatar_uri: String
  ##    about: String
  ##    registered_at_block: BlockNumber # FIXME correct type
  ##    registered_at_time: Moment # FIXME correct type
  ##    entry: String # FIXME correct type?
  ##    suspended: Boolean
  ##    subscription: String # instead of u64 due to overflow
  ##  }

  # From: apps/packages/joy-types/src/forum.ts:ModerationActionType
  type ForumModerationAction {
    moderated_at: ForumBlockchainTimestamp
    moderator_id: string # AccountId
    rationale: string
  }

  # From: apps/packages/joy-types/src/forum.ts:BlockchainTimestamp
  type ForumBlockchainTimestamp {
    block: String # instead of u64 due to overflow
    time: String # instead of Date.
  }

  # From: apps/packages/joy-types/src/forum.ts:ChildPositionInParentCategoryType
  type ForumChildPositionInParentCategory {
    parent_id: string # instead of u64 due to overflow
    child_nr_in_parent_category: string # instead of u32 due to overflow
  }

  type ForumCategory {
    # Relations
    parent: ForumCategory
    # author: MembersProfile # TODO add when harvester updated
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
    moderator_id: string # AccountId
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
    # author: MembersProfile # TODO add when harvester updated

    # From: apps/packages/joy-types/src/forum.ts:PostType
    id: string # instead of u64 due to overflow
    thread_id: String # instead of u64 due to overflow
    nr_in_thread: string # instead of u32 due to overflow
    current_text: string
    moderation: ForumModerationAction
    created_at: ForumBlockchainTimestamp
    author_id: string # AccountId
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
