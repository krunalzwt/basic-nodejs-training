const yup = require("yup");
const createUserSchema = yup.object({
  body: yup.object({
    first_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, 'invalid format:remove spaces,digits or special symbols from first name')
      .required("first name is required"),
    last_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, 'invalid format:remove spaces,digits or special symbols from last name')
      .required("last name is required"),
    email: yup.string().email().required("email is required"),
    password: yup.string().required(),
    role: yup
      .string()
      .oneOf(["customer", "admin"], 'role must be from ["customer" , "admin"]')
      .required("role is required"),
  }),
});

const updateUserSchema = yup.object({
  body: yup.object({
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    email: yup.string().email().optional(),
    role: yup
      .string()
      .oneOf(["customer", "admin"], 'role must be from ["customer", "admin"]')
      .optional(),
  }),
  password: yup.string().optional(),
});

const loginuserSchema = yup.object({
  body: yup.object({
    username: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

module.exports = { createUserSchema, updateUserSchema, loginuserSchema };
