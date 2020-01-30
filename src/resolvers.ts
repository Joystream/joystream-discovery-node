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

import {
  ForumCategory,
  findCategories,
  getCategory,
  getCategories
} from "./entity/category";
import {
  ForumThread,
  findThreads,
  getCategoryThreads,
  getThread
} from "./entity/thread";
import { ForumPost, findPosts, getThreadPosts } from "./entity/post";

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
  ForumSearchResult: {
    // tslint:disable-next-line: all
    __resolveType(obj: any, context: any, info: any) {
      return obj.__typename;
    }
  },
  Query: {
    getForumCategories,
    getForumThreads,
    getForumPosts,

    // tslint:disable-next-line: no-any
    searchForum: async (root: any, args: any, context: any, info: any) => {
      const categories = await findCategories(context.manager, args.text).then(
        (fcs: ForumCategory[]) => {
          for (const obj of fcs) {
            obj.__typename = "ForumCategory";
          }
          return fcs;
        }
      );
      const threads = await findThreads(context.manager, args.text).then(
        (fts: ForumThread[]) => {
          for (const obj of fts) {
            obj.__typename = "ForumThread";
          }
          return fts;
        }
      );
      const posts = await findPosts(context.manager, args.text).then(
        (fps: ForumPost[]) => {
          for (const obj of fps) {
            obj.__typename = "ForumPost";
          }
          return fps;
        }
      );
      // tslint:disable-next-line: no-any
      const results: any[] = [];
      return results.concat(categories, threads, posts);
    }
  }
};
