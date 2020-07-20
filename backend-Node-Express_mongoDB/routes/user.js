const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// authentication login 
router.post("/authenticate", function (req, res) {
  // password arrived in crypto JS form 
  //password decrypted

  User.find({
    email: req.body.email, password: req.body.password
  }).then(user => {
    if (user.length > 0) {
      var token = jwt.sign({ token: { email: user[0].email, role: user[0].role } }, 'usertoken', { expiresIn: 300 });
      let response = [{
        email: user[0].email,
        role: user[0].role,
        id: user[0]._id,
        token: token

      }];
      res.status(200).json({
        message: 'Success',
        data: response
      });
    } else {

      res.status(201).json({
        message: 'User Doesnot Exists'
      });
    }

  })
});
/// create new user
router.post('/register-user', function (req, res, err) {
  //password decrypted
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || "USER",

  });
  User.find({
    email: req.body.email
  }).then(createdPost => {
    if (createdPost.length === 1) {

      res.status(200).json({
        message: 'User Already Exists'
      });
    } else {

      user.save().then(createdPost => {
        User.find({
          _id: createdPost._id
        }).then(data => {
          res.send({
            message: 'User added successfully',
            userinfo: [{
              email: data[0].email,
              role: data[0].role,
              id: data[0]._id,
            }]

          })
        })
      });
    }
  });

});
module.exports = router;
