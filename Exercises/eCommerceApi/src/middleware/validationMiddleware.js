const validation = (schema) => async (req, res, next) => {
    try {
      // For form-data, `multer` will have parsed it into `req.body`
      // For JSON, it will be available directly in `req.body`
      const dataToValidate = {
        body: req.body,  // Form fields or JSON data
        params: req.params, // URL params (if any)
      };
  
      // Validate using Yup
      await schema.validate(dataToValidate, { abortEarly: false });
  
      // Proceed if validation passes
      return next();
    } catch (error) {
      // If validation fails, return errors
      return res.status(400).json({
        type: error.name,
        message: error.errors || error.message, // Provide validation errors
      });
    }
  };
  
  module.exports = validation;
  




// const validation = (schema) => async (req, res, next) => {
//     try {
//         await schema.validate({
//             body: req.body,
//             params: req.params,
//         }, { abortEarly: false });

//         return next();
//     } catch (error) {
//         return res.status(400).json({
//             type: error.name,
//             message: error.errors || error.message,  
//         });
//     }
// };

// module.exports = validation;
