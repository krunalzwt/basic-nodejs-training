const yup = require("yup");
const createUserSchema = yup.object({
  body: yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().email().required("email is required"),
    age: yup.number().min(1,'age must be grater than 1').required("age is required"),
    role: yup
      .string()
      .oneOf(["User", "Admin"], 'role must be from ["User", "Admin"]')
      .required("role is required"),
    isActive: yup.boolean('isActive must be a boolean value (true,false)').required("isActive is required"),
  }),
});

const updateUserSchema = yup.object({
  body: yup.object({
    name: yup.string().optional(),
    email: yup.string().email().optional(),
    age: yup.number().optional().min(1,'age must be grater than 1').max(120),
    role: yup
      .string()
      .oneOf(["User", "Admin"], 'role must be from ["User", "Admin"]')
      .optional(),
    isActive: yup.boolean().optional(),
  }),
  params: yup.object({
    id: yup
      .number()
      .required("id is required")
      .positive("id must be a positive integer"),
  }),
});

module.exports = { createUserSchema, updateUserSchema };
