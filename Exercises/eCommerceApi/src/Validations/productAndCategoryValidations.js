const yup=require('yup');
const createProductSchema=yup.object({
    body:yup.object({
        name:yup.string().required('product name is required!!'),
        description:yup.string().optional(),
        price:yup.number().required('product price is required'),
        stock:yup.number().required('stock is required feilds , please enter the total number of available stock!!'),
        category_id:yup.number().required('please enter the appropriate category id'),
    }),
});

const updateProductSchema=yup.object({
    body:yup.object({
        name:yup.string().optional(),
        description:yup.string().optional(),
        price:yup.number().optional(),
        stock:yup.number().optional(),
        category_id:yup.number().optional()
    }),
})

const createCategorySchema=yup.object({
    body:yup.object({
        name:yup.string().required('please enter name of the category'),
    }),
});


const updateCategorySchema=yup.object({
    body:yup.object({
        name:yup.string().optional(),
    }),
});

module.exports={createProductSchema,updateProductSchema,createCategorySchema,updateCategorySchema}