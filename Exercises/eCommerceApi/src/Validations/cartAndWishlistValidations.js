const yup=require('yup');

const createCartSchema=yup.object({
    body:yup.object({
        product_id:yup.number().required('please enter the product id you wanted to be added in the cart!'),
        quantity:yup.number().required('please enter the quantity of product you required!'),
    }),
});

const updateCartSchema=yup.object({
    body:yup.object({
        product_id:yup.number().required('please enter the product id you wanted to be added in the cart!'),
        quantity:yup.number().required('please enter the quantity of product you required!'),
    }),
});

const createWishlistSchema=yup.object({
    body:yup.object({
        product_id:yup.number().required('please enter the product id you wanted to be added in the wishlist!'),
    }),
});

const updateWishlistSchema=yup.object({
    body:yup.object({
        product_id:yup.number().required('please enter the product id you wanted to be added in the wishlist!'),
        quantity:yup.number().required('please enter the quantity of product you required!'),
    }),
});

module.exports={createCartSchema,updateCartSchema,createWishlistSchema,updateWishlistSchema}