const userModel = require('../models/auth.models');

const { sendMail }  = require('../mail/mail'); 

const { encrypt } = require('../sevice/crypto')

const otpGenerator = require('otp-generator')

const validate = require('../middlerwares/registe')

const sigup = async (req, res, next)=>{
    
    try{
        
        let withMessage = validate(req.body)

        if (withMessage.isValid == true){

            const user = await userModel.findOne({

                email : req.body.email

            })

            if (!user){

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
            
                    res.status(202).json({
            
                        message:"VERIFY CODE HAVE BEEN SENT TO YOUR MAIL"
            
                    });
                
            }else{

                res.status(402).json({            
        
                    message : `Invalid Credential`
        
                }); 

            }


        }else{

            res.status(401).json({            
    
                message : `Invalid Credential`
    
            }); 

        }
 

    }catch(error){

        res.status(400).json({            
    
            message : `Bad request`

        }); 

    };

} 

module.exports = {

    sigup
    
}