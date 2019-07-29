const userModel = require('../models/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {

  create: function(req, res, next) {
    userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err) {
        if (err.code === 11000) {
          return res.json({status: 'error', message: 'Duplicate email address', data: null});
        } else {
          return next(err);
        }
      } else {
        return res.json({status: "success", message: "User added successfully.", data: null});
      }
    });
 },

  authenticate: function(req, res, next) {
    // find the user by email
    userModel.findOne(
      {
        email:req.body.email
      },
      function(err, userInfo){
        if (err) {
          next(err);
        } else {
          // compare the request body password to the DB password
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {

            // create a jwt token, encoding the id
            const token = jwt.sign(
              {
                id: userInfo._id,
                email: userInfo.email // sensitive?
              },
              req.app.get('jwtSecretKey'),
              {
                expiresIn: '1h'
              }
            );

            // send the token back to the client
            res.json(
              {
              status:"success",
              message: "user found.",
              data: {
                user: userInfo,
                token: token
              }
            }
          );
        } else {
          res.json({status:"error", message: "Invalid email/password.", data:null});
        }
      }
    });
  },
}