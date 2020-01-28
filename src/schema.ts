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
  """
  Category created in Joystream Forum module
  """
  type Category {
    """
    ID of the ID in the Joystream blockchain
    """
    id: ID
    """
    ID of the parent Category in the Joystream blockchain
    """
    parentId: ID
    """
    Title of the Category
    """
    title: String
    """
    Description of the Category
    """
    description: String
    """
    The block number where the category was created in Joystream blockchain
    """
    createdAtBlockNumber: Int
    """
    The time stamp when the category was created in Joystream blockchain
    """
    createdAtMoment: Int
    """
    Deleted flag if the category has been deleted
    """
    deleted: Boolean
    """
    Archived flag if the category has been archived
    """
    archived: Boolean
    """
    Number of subcategories this category has
    """
    numDirectSubcategories: Int
    """
    Number of Threads that have at least one moderation action
    """
    numDirectModeratedThreads: Int
    """
    Position (index) of this category in the parent category
    """
    positionInParentCategory: Int
    """
    ID of the account that created this category
    """
    accountId: ID

    """
    ID of the block when this category was created
    """
    blockId: Int
    """
    ID of the extrinsic in the block when this category was created
    """
    extrinsicIdx: Int
    """
    ID of the event in the block when this category was created
    """
    eventIdx: Int

    """
    List of threads in this category
    """
    threads: [Thread!]
  }

  """
  Thread in the forum module of Joystream blockchain
  """
  type Thread {
    """
    ID of the ID in the Joystream blockchain
    """
    id: ID!
    """
    Title of the thread
    """
    title: String
    """
    Text in the thread
    """
    text: String

    """
    Index of this thread in the category
    """
    nrInCategory: Int
    """
    Number of posts not yet moderated in this thread
    """
    numUnmoderatedPosts: Int
    """
    Number of posts moderated in this thread
    """
    numModeratedPosts: Int
    """
    The block number where the thread was created in Joystream blockchain
    """
    createdAtBlockNumber: Int
    """
    The time stamp when the thread was created in Joystream blockchain
    """
    createdAtMoment: Int
    """
    ID of the account that created this thread
    """
    authorId: ID

    """
    "Category this thread belongs to
    """
    category: Category
    """
    Posts in this thread
    """
    posts: [Post!]
    """
    List of moderation actions that have occured on this thread
    """
    moderationActions: [ModerationAction!]
  }

  """
  Post in the forum module of Joystream blockchain
  """
  type Post {
    """
    ID of the post
    """
    id: ID!

    """
    Index of this post in the thread
    """
    nrInThread: Int
    """
    Text of the post, currently available on the blockchain
    """
    currentText: String
    """
    The block number where the post was created in Joystream blockchain
    """
    createdAtBlockNumber: Int!
    """
    The time stamp when the post was created in Joystream blockchain
    """
    createdAtMoment: Int!

    """
    Edit history of the post
    """
    history: [PostTextChangeHistory!]

    """
    The thread this post belongs to
    """
    thread: Thread
  }

  """
  Post text change history tracks the edit history of a post
  """
  type PostTextChangeHistory {
    """
    ID of the change; this is not from the blockchain
    """
    id: ID!
    """
    Text that the post had prior to this change
    """
    text: String!
    """
    The block number where the post was changed in Joystream blockchain
    """
    expiredAtBlockNumber: Int!
    """
    The time stamp when the post was changed in Joystream blockchain
    """
    expiredAtMoment: Int!

    """
    The post this change belongs to
    """
    post: Post!
    """
    ID of the account that made this change
    """
    authorId: Int!
  }

  """
  A moderation action. It can occur on thread or on posts.
  """
  type ModerationAction {
    """
    ID of the moderation action
    """
    id: ID!
    """
    ID of the account moderating
    """
    moderatorId: Int
    """
    Reason for this moderation
    """
    moderationRationales: [ModerationRationale!]
    """
    The block number where the moderation action took place in Joystream blockchain
    """
    moderatedAtBlockNumber: Int
    """
    The time stamp where the moderation action took place in Joystream blockchain
    """
    moderatedAtMoment: Int
  }

  """
  A moderation rationale.. It can occur on thread or on posts.
  """
  type ModerationRationale {
    """
    ID of the moderation rationale
    """
    id: ID!
    """
    The moderation action taken
    """
    moderationAction: ModerationAction!
    """
    Reason for the moderation action
    """
    rationale: Int
  }

  # union SearchResult = Category | Thread | Post | PostTextChangeHistory

  union SearchResult = Category | Thread | Post

  type Query {
    """
    returns all Categories matching text in title or description
    """
    getCategories(text: String): [Category]

    """
    returns all Threads matching text in title or description
    """
    getThreads(text: String): [Thread]!

    """
    returns all Posts matching text in title or description
    """
    getPosts(text: String): [Post]!

    """
    Searches Category, Thread and Post for matching text
    For Posts, also searches PostTextChangeHistory
    """
    searchFor(text: String): [SearchResult]!
  }
`;

export { typeDefs };
