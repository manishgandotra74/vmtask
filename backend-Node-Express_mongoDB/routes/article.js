const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var Article = require('../models/article');
var Tags = require('../models/tags');


router.post("/addarticle", function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    if (decoded && decoded.token && decoded.token.role === "ADMIN") {
      const article = new Article({
        title: req.body.title,
        topic: req.body.selectedTopic,
        content: req.body.Content,
        isFeatured: req.body.isfeatured,
        image: req.body.image

      });
      article.save({}).then(art => {
        if (art._id) {
          res.send({ message: "Article saved Successfully" })
        }
      })
    } else {
      res.send({ message: "Unauthorized" })
    }
  });
})

router.post("/updatearticle", function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    if (decoded && decoded.token && decoded.token.role === "ADMIN") {
      console.log(req.body);
      Article.updateOne({
        _id: req.body.id,
      }, {
        title: req.body.title,
        topic: req.body.selectedTopic,
        content: req.body.Content,
        isFeatured: req.body.isfeatured,
        image: req.body.image

      }).then(data => {
        if (data.nModified === 1) {
          res.status(200).json({
            message: 'Article Updated Successfully'
          })
        } else {
          res.status(200).json({
            message: 'Article Updated Successfully'
          })
        }
      })
    } else {
      res.send({ message: "Unauthorized" })
    }
  });
})
// get all articles by topic id
router.get("/getarticlebytopicid/:id", function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    // if loggined
    if (decoded && decoded.token) {
      Article.find({ topic: req.params.id }).then(article => {
        res.send({ data: article })
      })
    } else {
      // if not logined
      Article.find({ topic: req.params.id, isFeatured: false }).then(article => {
        res.send({ data: article })
      })
    }
  });
})
// get articles by id 
router.get("/getArticleByid/:id", function (req, res) {
  Article.find({ _id: req.params.id }).then(article => {
    res.send({ data: article })
  })
})

// get all articles
router.get("/getArticles/:id", function (req, res) {
  // if id = 1 ascending order , if -1 descending order 
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    // if loggined
    if (decoded && decoded.token) {
      Article.find({}).sort({ title: req.params.id }).then(article => {
        res.send({ data: article })
      })
    }
  });
});
// add tag
router.post("/addTag", function (req, res) {
  console.log(req.body);
  // if id = 1 ascending order , if -1 descending order 
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    console.log(decoded);
    if (decoded && decoded.token) {
      const tag = new Tags({
        tag_name: req.body.tag,
        article: req.body.CurrentArticle,

      });
      tag.save({}).then(tag => {
        console.log(tag);
        if (tag._id) {
          res.send({ data: "Tag Added Successfully" })

        }
      })
    }
  });
});
router.get("/fetchArticles_relatedTags", function (req, res) {
  console.log(req.body);
  // jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    //  /   if (decoded && decoded.token){
    Article.find({ title: 'Javascript' }).then(data => {
      if (data.length>0 && data[0]._id) {
        Tags.find({ article: data[0]._id }).then(art => {
          let art_id=art.map(data =>{return data._id});
          console.log(art_id);
          Article.find({ _id: { $in: art_id } }).then(article_data=>{
            console.log(article_data);
            res.send({ art: article_data })

          })
        })
      } else {
        res.send({ data: [] })

      }
    })
    // }
  // });
});
module.exports = router;
