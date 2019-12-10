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

import { DataSource } from 'apollo-datasource';
import { Category } from '../entity/category';
import { Connection } from 'typeorm';

export default class CategoryDataSource extends DataSource {
    private db: Connection;

    constructor( connection: Connection ){
        super();
        this.db = connection;
    }

    initialize(config: any) {
    }

    // categoryReducer(category: Category) {
    // }

    async getCategories(text: string) {
        return this.db.manager.find(Category);
    }
}