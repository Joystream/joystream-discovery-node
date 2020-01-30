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

import { findCategory, getCategory, getCategories } from "./entity/category";
import { findThreads, getCategoryThreads, getThread } from "./entity/thread";
import { findPosts, getThreadPosts } from "./entity/post";

// tslint:disable-next-line: no-any
async function getForumCategories(root: any, args: any, context: any) {
  return getCategories(context.manager, args.id);
}

// tslint:disable-next-line: no-any
async function getForumThreads(root: any, args: any, context: any) {
  return getCategoryThreads(context.manager, args.categoryId);
}

// tslint:disable-next-line: no-any
async function getForumPosts(root: any, args: any, context: any) {
  return getThreadPosts(context.manager, args.threadId);
}

// tslint:disable-next-line: no-any
async function searchForum(root: any, args: any, context: any) {
  // tslint:disable-next-line: no-any
  let results: any[] = [];
  results = results.concat(
    await getForumCategories(root, args, context),
    await getForumThreads(root, args, context),
    await getForumPosts(root, args, context)
  );
  return results;
}

export default {
  ForumCategory: {
    // tslint:disable-next-line: all
    subcategories(root: any, args: any, context: any, info: any) {
      return getCategories(context.manager, root.id);
    },
    // tslint:disable-next-line: all
    parent(root: any, args: any, context: any, info: any) {
      return getCategory(context.manager, root.parent_id);
    },
    // tslint:disable-next-line: all
    threads(root: any, args: any, context: any, info: any) {
      return getCategoryThreads(context.manager, root.id);
    },
    // tslint:disable-next-line: all
    moderator_id(root: any, args: any, context: any, info: any) {
      return root.account_id;
    },
    // tslint:disable-next-line: all
    created_at(root: any, args: any, context: any, info: any) {
      return {
        block: root.created_at_block_number,
        time: root.created_at_moment
      };
    },
    // tslint:disable-next-line: all
    position_in_parent_category(root: any, args: any, context: any, info: any) {
      return {
        parent_id: root.parent_id,
        child_nr_in_parent_category: root.position_in_parent_category_db
      };
    }
  },
  ForumThread: {
    // tslint:disable-next-line: all
    created_at(root: any, args: any, context: any, info: any) {
      return {
        block: root.created_at_block_number,
        time: root.created_at_moment
      };
    },
    // tslint:disable-next-line: all
    parent(root: any, args: any, context: any, info: any) {
      return getCategory(context.manager, root.category_id);
    },
    // tslint:disable-next-line: all
    replies(root: any, args: any, context: any, info: any) {
      return getThreadPosts(context.manager, root.id);
    }
  },
  ForumPost: {
    // tslint:disable-next-line: all
    created_at(root: any, args: any, context: any, info: any) {
      return {
        block: root.created_at_block_number,
        time: root.created_at_moment
      };
    },
    // tslint:disable-next-line: all
    thread(root: any, args: any, context: any, info: any) {
      return getThread(context.manager, root.thread_id);
    },
    // tslint:disable-next-line: all
    moderation(root: any, args: any, context: any, info: any) {
      return null; // FIXME implement, where to get this data?
    }
  },
  Query: {
    getForumCategories,
    getForumThreads,
    getForumPosts,
    searchForum
  },
  ForumSearchResult: {
    // tslint:disable-next-line: all
    __resolveType(obj: any, context: any, info: any) {
      if (obj.description) {
        return "Category";
      }
      if (obj.categoryId) {
        return "Thread";
      }
      if (obj.threadId) {
        return "Post";
      }
    }
  }
};
