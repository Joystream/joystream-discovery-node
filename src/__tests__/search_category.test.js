import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import sinon from 'sinon';

import { constructTestServer } from './__utils';
import { ForumCategory } from '../../dist/src/entity/category';
import { EntityManager } from 'typeorm';

const SEARCH_CATEGORIES = gql`
    query categoryList($term: String) {
        getCategories(text: $term) {
            id
            parentId
            title
            description
            blockId
            extrinsicIdx
            eventIdx
            threads {
                title
                    posts {
                        currentText
                    }
                }
        }
    }
`;

describe.skip('Search categories query', () => {

    it('finds a match for existing string', async () => {
        const manager = sinon.createStubInstance(EntityManager);
        let category = new ForumCategory()
        category.id = 1
        category.title = 'category 1'
        category.description = 'category 1 description'
        category.blockId = 1000
        category.extrinsicIdx = 1
        category.eventIdx = 1
        manager.find.resolves([category]);

        const context = {
            manager: manager
        }
        const { server } = constructTestServer({context: context});
        const {query} = createTestClient(server);
        const res = await query({query: SEARCH_CATEGORIES, variables: {term: 'test term'}});
        expect(res).toMatchSnapshot();
    });
});
