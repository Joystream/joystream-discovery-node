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

# Properties from: apps/packages/joy-types/src/members.ts:Profile
# Preserving this structure as much as possible,
# since its what the client already expects.
type Profile {
  id: String # instead of u64 due to overflow
  handle: String
  avatar_uri: String
  about: String
  registered_at_block: BlockNumber # FIXME correct type
  registered_at_time: Moment # FIXME correct type
  entry: String # FIXME correct type?
  suspended: Boolean
  subscription: String # instead of u64 due to overflow
}

type BlockchainTimestamp {
  block: String # instead of u64 due to overflow
  time: String # instead of Date.
}

type ChildPositionInParentCategory {
  parent_id: string # instead of u64 due to overflow
  child_nr_in_parent_category: string # instead of u32 due to overflow
}

type Category {

  # Relations
  parent: Category
  author: Profile
  threads: [Thread]
  subcategories: [Category]

  # Properties from: apps/packages/joy-types/src/forum.ts:CategoryType
  # Preserving this structure as much as possible,
  # since its what the client already expects.
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

type ModerationActionType {
  moderated_at: BlockchainTimestamp
  moderator_id: string # AccountId
  rationale: string
}

type Thread {

  # Relations
  parent: Category
  author: Profile
  replies: [Post]

  # Properties from: apps/packages/joy-types/src/forum.ts:ThreadType
  # Preserving this structure as much as possible,
  # since its what the client already expects.
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

type Post {

  # Relations
  thread: Thread
  author: Profile

  # Properties from: apps/packages/joy-types/src/forum.ts:PostType
  # Preserving this structure as much as possible,
  # since its what the client already expects.
  id: string # instead of u64 due to overflow
  thread_id: String # instead of u64 due to overflow
  nr_in_thread: string # instead of u32 due to overflow
  current_text: string
  moderation: ModerationActionType
  text_change_history: VecPostTextChange # FIXME what is this?
  created_at: BlockchainTimestamp
  author_id: string # AccountId
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
`

export {typeDefs};
