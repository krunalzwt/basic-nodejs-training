const validation = (schema) => async (req, res, next) => {
    try {
      const dataToValidate = {
        body: req.body,  
        params: req.params, 
      };
      await schema.validate(dataToValidate, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({
        type: error.name,
        message: error.errors || error.message, 
      });
    }
  };
  
  module.exports = validation;
  

