const yup = require('yup');

const userValidator = {
     registerUser : yup.object().shape({
          firstname: yup.string().required(),
          lastname: yup.string().required(),
          email: yup.string().email(),
          password: yup.string().min(6).required(),
          confirmPassword: yup.string().min(6)
              .oneOf([yup.ref('password'), null], 'Password must match'),          
        }),
     userLogin: yup.object().shape({
          email: yup.string().email(),
          password: yup.string().min(6).required(),
     })
};

module.exports = userValidator;