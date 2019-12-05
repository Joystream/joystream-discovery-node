export default {
    Query: {
        getCategories: (root: any, args: any, context: any) => {
            context.dataSources.categories.getCategories()
        }
    }
};
