const userModel = require('../models/auth.models');

const { sendMail }  = require('../mail/mail'); 

const { encrypt } = require('../sevice/crypto')

const otpGenerator = require('otp-generator')

const sigupOtp = async (req, res, next)=>{
    
    try{

        let otpcode = otpGenerator.generate(6, { upperCaseAlphabets : false, specialChars : false});

        const hashedOtp = await encrypt(otpcode)

        const hashedPassword = await encrypt(req.body.password)

            const newUser = await new userModel({
    
                email : req.body.email,
    
                username: req.body.username,
    
                password: hashedPassword,
    
                firstName: req.body.firstName,
    
                lastName: req.body.lastName,
    
                otp : hashedOtp,
    
                timeOptCreate: Date.now(), 
    
                timeOptExpired : Date.now() + 36000000,
    
                active : false
    
            });
        
          await  newUser.save()
          .then( async (result)=>{
    
               await sendMail({
    
                  email: result.email,
    
                  otp: otpcode,
    
                });
    
            });
    
            res.json({
    
                status: "PENDING",
    
                message:"VERIFY CODE HAVE BEEN SENT TO YOUR MAIL"
    
            });

    }catch(error){

        res.json({            
            
            status : "FAILED",

            message : "An error occur when creating the account"

        });

    };

} 

module.exports = {

    sigupOtp
    
}