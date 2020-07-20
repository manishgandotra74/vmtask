const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var Topic = require('../models/topic');
router.post("/addtopic", function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
        if (decoded && decoded.token && decoded.token.role === "ADMIN" ){
          const topic = new Topic({
            name: req.body.topic,
            image: req.body.image        
          });
          topic.save({}).then(createdPost => {
            console.log(createdPost);
            if (createdPost._id) {

              res.status(200).json({
                message: 'Topic Added Successfully'
              });
            }
          })
        }else {
            res.send({message :"Unauthorized"})
        }
    });
});
// get all topics . get by id 
router.get("/gettopics/:id", function (req, res) {
  console.log(req.headers); 
  jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
    console.log(decoded);
        if (decoded && decoded.token ){
        if (req.params.id === '0'){
            Topic.find({}).then(data => {
              console.log(data);
              res.send({
                message: data,
              })
            })
        }else {
          Topic.find({_id : req.params.id}).then(data => {
            console.log(data);
            res.send({
              message: data,
            })
          })
        }
        }else {
            res.send({message :"Unauthorized"})
        }
    });
})
module.exports = router;
