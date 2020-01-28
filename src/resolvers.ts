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

import { findCategory } from "./entity/category";
import { findThreads } from "./entity/thread";
import { findPost } from "./entity/post";

// tslint:disable-next-line: no-any
async function getCategories(root: any, args: any, context: any) {
  return findCategory(context.manager, args.text);
}

// tslint:disable-next-line: no-any
async function getThreads(root: any, args: any, context: any) {
  return findThreads(context.manager, args.text);
}

// tslint:disable-next-line: no-any
async function getPosts(root: any, args: any, context: any) {
  return findPost(context.manager, args.text);
}

// tslint:disable-next-line: no-any
async function searchFor(root: any, args: any, context: any) {
  // tslint:disable-next-line: no-any
  let results: any[] = [];
  results = results.concat(
    await getCategories(root, args, context),
    await getThreads(root, args, context),
    await getPosts(root, args, context)
  );
  return results;
}

export default {
  Query: {
    getCategories,
    getThreads,
    getPosts,
    searchFor
  },
  SearchResult: {
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
  /*
    ForumModerationAction {
      // TODO just supply directly in parent?
    }
    ForumBlockchainTimestamp {
      // TODO just supply directly in parent?
    }
    ForumChildPositionInParentCategory {
      // TODO just supply directly in parent?
    }
    ForumCategory {
      parent(root, args, context, info) {
        return null // TODO implement
      }
      author(root, args, context, info) {
        return null // TODO implement
      }
      threads(root, args, context, info) {
        return null // TODO implement
      }
      subcategories(root, args, context, info) {
        return null // TODO implement
      }
    }
    ForumThread {
      parent(root, args, context, info) {
        return ForumCategory.findOne({ id: root.id });
      }
      replies(root, args, context, info) {
        return ForumThread.findOne({ threadId: root.id });
      }
    }
    ForumPost {
      thread(root, args, context, info) {
        return ForumThread.findOne({ threadId: root.id });
      }
    }
    */
};
