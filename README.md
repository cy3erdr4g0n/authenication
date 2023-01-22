# Getting Started

First, run the development server:

npm run dev
# or 
yarn dev
 

# API ON TWO FACTOR AUCTENICATION 
`THE CODE WOULD HELP TO KEEP HIGH SECURITY`


# I would be using the nodemailer npm package to easy the process of sending emails here. For Sendgrid the process is quite lenghty and you need to do a lot of registerations.



#       WHEN USER FIRST SIGNS UP

Check if email/user is existing [http:127.0.0.1/api/v1/auth/registration]

If existing, can perform custom logic and return

If not, create a new user by hashing a password and generating OTP

#    TO VERIFY OTP

We send email and OTP to the controller `[http:127.0.0.1/api/v1/auth/otp]` which can be found [acctivate/activateUsers.js]

if the email is not existing, throw an error

if the email is existing and the OTP is incorrect, throw an error

if none of the checks fails, then update active as true and return


# The /api/auth/registration route handles the user and OTP creation.

# The /api/auth/otp routes handles the creation of new OTP WHEN THE OTHER IS EXPIRED 

# The /api/activate route handles verification of the OTP.

# the /api/recover route handles for forgetten password.

# the /api/reset/:userId/:token route handle for reset of password 

# the /api/change/password route handle for change of password 



#####       MIDDLEWARES


### generatePasswordReset method  IN THE MIDDLEWARES IN ROUTES 

`used to generate a password reset token using the Node.js crytpo module and and calculates an expiry time (1 hour), the user object is updated with this data. [passwordReset/passwordResetToken]`

### recover

`the database is queried using the user's email address to retrieve the user's object, if found, the generatePasswordReset method is called to generate a password reset token and set its expiry time (1 hour) which is then added to the user object and saved.A reset link is created and an options object is created defining the from, to, subject and text and an email is sent to the user using the sendgrid package.--`

### reset

`queries the database for the user object using the password reset token and verifying it's still valid by adding resetPasswordExpires: { _id : req.params.userId resetPasswordToken : req.params.token }.If user is found, the password reset page is displayed.---`

### resetPassword 

`We begin by querying the database using the password reset token and verifying it is still valid by adding resetPasswordExpires: {  _id : req.params.userId resetPasswordToken : req.params.token}.if the token is still valid, the user's password is updated, the resetPasswordToken resetPasswordExpires fields are set to undefined and the user object is saved and an email is sent to the user confirming the change.`


#####       FOLDER/DIRECTORY FOR THE PROJECT 

# THE activateAcct directory where the middlemare where the the account will be acctivate in project...  `[activateAcct/activateUsers]`

# the login dictory is where the middleware where you logininti the account..... [login/login]
