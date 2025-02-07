const fs = require('fs');
const { createProductSchema } = require('./productAndCategoryValidations');
const path=require('path');
const validateProduct = (req, res, next) => {
    try {
        createProductSchema.validateSync(req.body, { abortEarly: false });
        console.log('RGWRE');
        next();
    } catch (error) {
        if (req.file) {
            try {
                console.log("dewuifgwerfg");
                const filepath=path.join(__dirname,'..','..',req.file.path)
                if (fs.existsSync(filepath)) { 
                    fs.unlinkSync(filepath);
                    console.log('File deleted:', filepath);
                } else {
                    console.log('File not found:', filepath);
                }
            } catch (err) {
                console.error('Error deleting file:', err);
            }
        }
        return res.status(400).json({ errors: error.errors });
    }
};

module.exports = { validateProduct };
