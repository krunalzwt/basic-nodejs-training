const yup = require('yup');

const idValidationSchema = yup.object({
  params: yup.object({
    id: yup
      .number()
      .required('ID is required')
      .positive('ID must be a positive number')
      .integer('ID must be an integer')
      .min(1, 'ID must be at least 1')  
      .typeError('ID must be a number')
  }),
});

module.exports = { idValidationSchema };
