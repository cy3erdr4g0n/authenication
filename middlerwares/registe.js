const Validator = require("validator");

const isEmpty = require("is-empty");

module.exports =  function validateRegister(body){

        let errors = {};
        
        body.firstName = !isEmpty(body.firstName) ? body.firstName : "";
        
        body.lastName = !isEmpty(body.lastName) ? body.lastName : "";

        body.username = !isEmpty(body.username) ? body.username : "";
        
        body.email = !isEmpty(body.email) ? body.email : "";
        
        body.password = !isEmpty(body.password) ? body.password : "";
    
        if (Validator.isEmpty(body.email)) {
    
            errors.email = "Email field is required";
    
        } else if (!Validator.isEmail(body.email)) {
    
            errors.email = "Email is invalid";
    
        }
        if (Validator.isEmpty(body.password)) {
    
            errors.password = "Password field is required";
    
        }
        
        if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
    
            errors.password = "Password must be at least 6 characters";
    
        }
    
        if (Validator.isEmpty(body.firstName)) {
    
            errors.firstName = "first name field is required";
    
        }
    
        if (!Validator.isLength(body.firstName, { min: 3, max: 30 })) {
    
            errors.firstName = "first name must be at least 6 characters";
    
        }
    
        if (Validator.isEmpty(body.lastName)) {
    
            errors.lastName = "last name field is required";
    
        }
    
        if (!Validator.isLength(body.lastName, { min: 3, max: 30 })) {
    
            errors.lastName = "last name must be at least 6 characters";
    
        }

        if (Validator.isEmpty(body.username)) {
    
            errors.username = "last name field is required";
    
        }
    
        if (!Validator.isLength(body.username, { min: 3, max: 30 })) {
    
            errors.username = "last user must be at least 6 characters";
    
        }


      return {

        errors,

        isValid: isEmpty(errors)

       };


};
