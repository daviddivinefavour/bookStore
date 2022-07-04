const {registerUser} = require('../validations/userValidations');
const userModel = require('../models/user');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req,res)=>{
     try {
          registerUser.validate(req.body);
          const {firstname, lastname, email, password} = req.body;
          const hashPassword = bcrypt.hashSync(password, saltRounds);

          const duplicateUser = await userModel.findOne({email});

          if(duplicateUser){
               return res.status(400).json({
                    message: 'User already exists, login instead',
                    status:400
               });
          }

          const user = await new userModel({
               _id: uuidv4(),
               firstname,
               lastname,
               email,
               password: hashPassword,
          }).save();
          const token = user.generateVerificationToken();
          user.token = token;

          if (user) {
               return res
                   .status(200)
                   .send({
                     status: 200,
                     message: 'Success, new user created',
                     data: user,
                     token,
                   });
             }
           
             return res
                 .status(500)
                 .send({
                   status: 500,
                   message: 'An error occurred...',
                 });

     } catch (error) {
          console.log(`ERROR: ${error}`);
     }
};