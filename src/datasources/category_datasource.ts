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

    async getCategories(text: string) {
        return this.db.manager.find(Category);
    }
}