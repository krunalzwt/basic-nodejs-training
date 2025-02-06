const yup=require('yup');

const updateStatusSchema=yup.object({
    body:yup.object({
        status:yup.string().required('order status is required!!')
    }),
});

module.exports={updateStatusSchema}