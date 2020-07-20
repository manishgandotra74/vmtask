const express = require('express');
const router = express.Router();
const con = require('../database/mysqldb');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const URL = "http://localhost:4000/images/"

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})
const upload = multer({ storage: storage });
  
router.post("/addarticle", upload.single('file'), function (req, res) {
    jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
        if (decoded && decoded.token && decoded.token.role === "ADMIN" ){
          if (req.file && req.file.filename){

         var reg_sql ="call add_articles('"+req.query.title+"',"+req.query.topic+ ",'"+req.query.content+ "',"+req.query.isfeatured +",'"+URL+req.file.filename+ "','"+req.query.tags+  "')"
      console.log(reg_sql);
         con.query(reg_sql, function (err, result) {
              if (err){
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result[0]})
              }
              });
            }else {
              res.send({message :"Please select image"})

            }
        }else {
            res.send({message :"Unauthorized"})
        }
    });
  
})

router.post("/updatearticle", upload.single('file'), function (req, res) {
    jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
        if (decoded && decoded.token && decoded.token.role === "ADMIN" ){
          if (req.file && req.file.filename){
         var reg_sql ="call update_articles("+req.query.articleid+",'"+req.query.title+"',"+req.query.topic+ ",'"+req.query.content+ "',"+req.query.isfeatured +",'"+URL+req.file.filename+ "','"+req.query.tags+  "')"
            con.query(reg_sql, function (err, result) {
                
              if (err){
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result[0]})
              }
              });
            }else {
              res.send({message :"Please select image"})
            }
        }else {
            res.send({message :"Unauthorized"})
        }
    });
})

// get all articles by topic id
router.get("/getarticlebytopicid/:id", function (req, res) {
        jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
            // if loggined
        if (decoded && decoded.token){
            var reg_sql ="select * from tb_articles where topic = "+req.params.id
        }else {
            // if not logined
            var reg_sql ="select * from tb_articles where topic = "+req.params.id +" and isFeatured=false"

        }
        con.query(reg_sql, function (err, result) {        
              if (err){
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result})
              }
              });
        
    });
})
// get articles by id 
router.get("/getArticleByid/:id",  function (req, res) {
    let reg_sql= "call getArticlebyid("+req.params.id+")"
    con.query(reg_sql, function (err, result) {        
          if (err){
            res.status(400).json({error:'Some error occured please try again later'})
          }else {
            res.json({message:result})
          }
          });
    
})


// get all articles
router.get("/getArticles/:id", function (req, res) {
  // if id = 1 ascending order , if 2 descending order else normal order
  jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
      // if loggined
 var req_sql = "call get_Articles("+ req.params.id + ")"
  con.query(req_sql, function (err, result) {        
        if (err){
          res.status(400).json({error:'Some error occured please try again later'})
        }else {
          res.json({message:result})
        }
        });
  
});
})
// call fetch_articles("Titlee7")
router.get("/fetcharticles/:article_name", function (req, res) {
  // if id = 1 ascending order , if 2 descending order else normal order
  jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
      // if loggined
      var reg_sql ="call fetch_Articles('"+ req.params.article_name + "')"
      console.log(reg_sql);  
      con.query(reg_sql, function (err, result) {  

        if (err){
          res.status(400).json({error:'Some error occured please try again later'})
        }else {
          res.json({message:result})
        }
        });
  
});
})
module.exports = router;
