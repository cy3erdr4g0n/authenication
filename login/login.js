const userModel = require('../models/auth.models')

const jwt = require('jsonwebtoken')

const { compare } = require('../sevice/crypto')

const secret = process.env.SECRET

const loginVerify = async (req, res)=>{

    try {

        let { email, password } = req.body;
        
        let user = await userModel.findOne({

            email : email

        });

        if (!user){

            res.status(302).json({

                'message' : "USER NOT FOUND"

            });

            throw Error("USER NOT FOUND");

        }else{

            if(user.active == false){

                res.status(302).json({

                    'message' : `account haven't been verify`

                })

                throw new Error(`account haven't been verify`)

            }else{

                let hashedPassword = user.password

                const validate = await compare(password, hashedPassword);

                if(!validate){

                    res.status(202).json("Invalid detail");
                            
                    throw new Error("Invalid detail");

                }else{

                    let userDetails = { email };
        
                    const token = jwt.sign(userDetails,secret,{expiresIn:10});
        
                    res.status(201).json({

                        message:'sign in successful',
        
                        token:token
                    });

                };

            };

        };

    }catch (error) {
        
        res.status(401).json({

            'message' : "INTERNAL SERVER ERROR"

        });

        throw Error(error);

    };

};

module.exports = {

    loginVerify

};