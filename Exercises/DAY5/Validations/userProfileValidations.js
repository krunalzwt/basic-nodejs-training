const yup=require('yup');

const userProfileSchema = yup.object({
    body: yup.object({
      bio: yup.string().required("bio is required"),
      linkedInUrl: yup.string().url().required("linkedInUrl is required"),
      facebookUrl: yup.string().url().required("facebookUrl is required"),
      instaUrl: yup.string().url().required("instaUrl is required"),
    }),
  });

  module.exports=userProfileSchema;