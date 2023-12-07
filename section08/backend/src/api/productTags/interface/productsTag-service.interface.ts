interface IProductsTagsServiceBulkInsert {
    names: {
        name: string;
    }[];
}

interface IProductsTagsServiceFindByNames {
    tagNames: string[];
}