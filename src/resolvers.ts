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

export default {
    Query: {
        getCategories: async (root: any, args: any, context: any) => {
            return await context.dataSources.categories.getCategories();
        },
        getThreads: async (root: any, args: any, context: any) => {
            return await context.dataSources.threads.getThreads();
        },
        getPosts: async (root: any, args: any, context: any) => {
            return await context.dataSources.posts.getPosts();
        },
        searchFor: async (root: any, args: any, context: any) => {
            // let results: any[] = [];
            // results.concat(await context.dataSources.posts.getPosts());
            // results.concat(await context.dataSources.threads.getThreads());
            // results.concat(await context.dataSources.categories.getCategories());
            // return results;

            return await context.dataSources.categories.getCategories();
        },
    },
    SearchResult: {
        __resolveType(obj: any, context: any, info: any) {
            if (obj.description) {
                return 'Category'
            }
            if (obj.categoryId) {
                return 'Thread'
            }
            if (obj.threadId) {
                return 'Post'
            }
        }
    }
};
