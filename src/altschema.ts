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

import { gql } from 'apollo-server';

const typeDefs = gql`

# FIXME remove this and replace with correct data type
type User {
  id: ID!
  sudoer: Boolean!
  timestamp: String!
  handle: String!
  avatar_url: String
  about: String
}

type BlockchainTimestamp {
  block: String # instead of u64 due to overflow
  time: String # instead of Date.
}

type ChildPositionInParentCategory {
  parent_id: string # instead of u64 due to overflow
  child_nr_in_parent_category: string # instead of u32 due to overflow
}

# From: apps/packages/joy-types/src/forum.ts:CategoryType
# Preserving this structure as much as possible,
# since its what the client already expects.
type CategoryData {
  id: String # instead of u64 due to overflow
  title: String
  description: String
  created_at: BlockchainTimestamp
  deleted: Boolean
  archived: Boolean
  num_direct_subcategories: String # instead of u32 due to overflow
  num_direct_unmoderated_threads: String # instead of u32 due to overflow
  num_direct_moderated_threads: String # instead of u32 due to overflow
  position_in_parent_category: ChildPositionInParentCategory 
  moderator_id: string # AccountId
}

type Category {
  parent: Category
  author: User
  threads: [Thread]
  subcategories: [Category]
  data: CategoryData
}

type ModerationActionType {
  moderated_at: BlockchainTimestamp
  moderator_id: string # AccountId
  rationale: string
}

# From: apps/packages/joy-types/src/forum.ts:ThreadType
# Preserving this structure as much as possible,
# since its what the client already expects.
type ThreadData {
  id: String # instead of u64 due to overflow
  title: String
  category_id: String # instead of u64 due to overflow
  nr_in_category: String # instead of u64 due to overflow
  moderation: ModerationActionType
  num_unmoderated_posts: String # instead of u64 due to overflow
  num_moderated_posts: String # instead of u64 due to overflow
  created_at: BlockchainTimestamp
  author_id: String
}

type Thread {
  parent: Category
  author: User
  replies: [Post]
  data: ThreadData
}

# From: apps/packages/joy-types/src/forum.ts:PostType
# Preserving this structure as much as possible,
# since its what the client already expects.
type PostData {
  id: string # instead of u64 due to overflow
  thread_id: String # instead of u64 due to overflow
  nr_in_thread: string # instead of u32 due to overflow
  current_text: string
  moderation: ModerationActionType
  text_change_history: VecPostTextChange # FIXME what is this?
  created_at: BlockchainTimestamp
  author_id: string # AccountId
}

type Post {
  thread: Thread
  author: User
  data: PostData
}

# FIXME replace with correct transaction data node expects
type MembershipInput {
  handle: String!
  avatar_url: String
  about: String
}

# FIXME replace with correct transaction data node expects
type CategoryInput {
  title: String!
  description: String!
  parentId: String # null -> root category
}

# FIXME replace with correct transaction data node expects
type ThreadInput {
  category: ID!
  title: String!
  text: String! # This becomes the first reply.
}

# FIXME replace with correct transaction data node expects
type PostInput {
  thread: ID!
  text: String!
}

type Query {

  # Story: A user can list categories.
  # Story: A user can list subcategories.
  getCategories(id: ID): [Category]

  # Story: A user can list threads for a category.
  getThreads(categoryId: ID!): [Thread]

  # Story: A user can list replies for a thread.
  getReplies(threadId: ID!): [Post]

  # TODO search stories and queries
}

type Mutation {

  # Story: User can register as a account membership.
  registerMembership(input: MembershipInput): User

  # Story: User can update their account membership information.
  editMembership(id: ID!, input: MembershipInput): User

  # Story: A sudo user can create a new category.
  # Story: A sudo user can create a new subcategory.
  createCategory(input: CategoryInput): Category

  # Story: A sudo user can edit a category.
  # Story: A sudo user can edit a subcategory.
  editCategory(id: ID!, input: CategoryInput): Category

  # Story: A user can create threads for a category.
  createThread(input: ThreadInput): Thread

  # Story: A user reply to a thread.
  createPost(input: PostInput): Post

  # Story: A user can edit their reply.
  editPost(id: ID!, input: PostInput): Post
}
`

export {typeDefs};
