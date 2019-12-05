export default {
    Query: {
        getCategories: async (root: any, args: any, context: any) => {
            const categories = await context.dataSources.categories.getCategories();
            return [categories]
        }
    }
};
