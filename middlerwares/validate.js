const userModel = require('../models/auth.models')


// TO MAYBE USER EMAIL EXIST BEFORE
const signUpUser  = (req, res, next) => {

    userModel.findOne({email:req.body.email,username:req.body.username},(err,result)=>{

        if(err){

            res.status(202).json({message: 'error occur'})

        }else{

            if (result != null){

                res.status(202).json({message: 'invalid email'})

            }else{

                next()

            }
        }
    })

}

//  TO CHECK MAYBE PASSWORD IS VALID 

const validatePassword = (req,res, next)=>{
    
    let newPassword = req.body.password
    
    let regularExpression  = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    
    if (regularExpression.test(newPassword)){
        
        next()
        
    }else{
        
        res.status(202).json({message:"password should contain atleast one number and one special character"})

    }
}

//  TO VERIFY MAYBE EMAIL IS CORRECT 

const validateEmail = (req, res, next)=>{
    
    let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if (req.body.email !== '' && req.body.email.match(emailFormat)){
        
        next()
        
    }else{
        
        res.status(202).json({message:"email not valid "})
        
    }
}

//  TO CHECK THE NAMES 

const validatename = (req, res, next)=>{
    
    let name = /^([a-zA-Z])[a-zA-Z]+$/
    
    if(name.test(req.body.firstName) && name.test(req.body.lastName)){
        
        next()
        
    }else{
        
        res.status(202).json({message:"name not valid "})
        
    }
}

module.exports = {

    signUpUser, 

    validatePassword,

    validateEmail,

    validatename
}