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

import { Category } from "./entity/category";
import { Like } from "typeorm";
import { Thread } from "./entity/thread";
import { Post } from "./entity/post";

async function getCategories(root: any, args: any, context: any) {
    return context.connection.manager.find(Category, 
        {
            where: [
                {
                    title: Like(`%${args.text}%`)
                },
                {
                    description: Like(`%${args.text}%`)
                },
            ]
        }
    );
}

async function getThreads(root: any, args: any, context: any) {
    return context.connection.manager.find(Thread, 
        {
            where: [
                {
                    title: Like(`%${args.text}%`)
                },
                {
                    text: Like(`%${args.text}%`)
                },
            ]
        }
    );
}

async function getPosts(root: any, args: any, context: any) {
    return context.connection.manager.find(Post, 
        {
            current_text: Like(`%${args.text}%`)
        },
    );
}

async function searchFor(root: any, args: any, context: any) {
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
        getCategories: getCategories,
        getThreads: getThreads,
        getPosts: getPosts,
        searchFor: searchFor
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
