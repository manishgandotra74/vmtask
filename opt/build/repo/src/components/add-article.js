import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, Snackbar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from 'react-bootstrap'
import * as TopicActions from "../redux/actions/topic-actions"
import * as ArticleActions from "../redux/actions/article-actions"

import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));


function AddArticle(props) {

  const [titleName, settitleName] = useState('');
  const [Content, setContent] = useState('');
  const [isfeatured, setisfeatured] = useState(false);
  const [imageUrl, setimageUrl] = useState('');
  const [open, setOpen] = React.useState(false);
  const [message , setMessage]= React.useState('');
  const classes = useStyles();

  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id){
      props.getArticlebyarticleId(props.match.params.id).then(data =>{
        // setarticledata(data.data[0])
        settitleName(data.data[0].title);
        setContent(data.data[0].content)
        setisfeatured(data.data[0].isFeatured)
        setimageUrl(data.data[0].image)
      })
    }
 
  }, [])
  const onSaveSubmit = async (e) => {
    e.preventDefault();
    if (titleName && imageUrl && Content) {
      props.addArticles({ Content: Content, title: titleName, image: imageUrl,
         isfeatured:isfeatured , selectedTopic:props.match.params.topicid}).then(data => {
        if (data && data.message) {
          if (data.message === "Article saved Successfully") {
            props.history.push('/article/'+props.match.params.topicid)
          }
        }
      })

    }else {
      setMessage('Please fill all fields');
      setOpen(true)
    }
  };
  const onUpdateSubmit = async (e) => {
    e.preventDefault();

    if (titleName && imageUrl && Content) {
      props.updateArticles({ Content: Content, title: titleName, image: imageUrl,id :props.match.params.id,
         isfeatured:isfeatured , selectedTopic:props.match.params.topicid}).then(data => {
        if (data && data.message) {
          if (data.message === "Article Updated Successfully") {
            setMessage("Article Updated Successfully");
            setOpen(true)
            props.history.push('/article/'+props.match.params.topicid)
          }
        }
      })

    }else {
      setMessage('Please fill all fields');
      setOpen(true)
    }
  };
  const handleChange = (event) => {
    setisfeatured(event.target.checked);
  };
  function imagechange(event) {
    let images;

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      images = file;
      const formData = new FormData();
      formData.append('file', images);
      axios({
        method: 'post',
        url: 'http://localhost:4000/upload/uploadpicture',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(function (response) {
          setimageUrl(response.data.fileUrl)

        })
        .catch(function (response) {
        });
    }
  }
  return (
    <div>
           <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1000}
        // onClose={handleClose}
        message={message}
  
      />
        <Toolbar style ={{background:"#C0C0C0"}}>
  <Button variant="contained" color="secondary" onClick={()=>props.history.push('/article/'+props.match.params.topicid)} style={{ height: "40px" }}> Back </Button>
  </Toolbar>
      <form className={classes.root} noValidate autoComplete="off">
        <div style={{ marginLeft: "25%", marginRight: "25%", marginTop: "30px" }}>
          <TextField
            placeholder="Please enter Title"
            value={titleName}
            size="small"
            label="Title"
            helperText={titleName === '' ? 'Please enter title.' : ''}
            onChange={(e) => (settitleName(e.target.value))}
          />
          <TextField
            // error={Content === '' ? true : false}
            // id="outlined-error"
            label="Content"
            placeholder="Please enter Content"
            value={Content}

            size="small"
            helperText={Content === '' ? 'Please enter content.' : ''}
            onChange={(e) => (setContent(e.target.value))}
          />
         
          <Checkbox
            checked={isfeatured}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          {isfeatured ? 'Is Featured' : 'Not Featured'}
        </div>
        <Row style={{ marginLeft: "26%", marginRight: "25%", marginTop: "20px" }}>
          <div className="input-group">

            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={imagechange}
              />
            </div>
          </div>
          {imageUrl ? <img style={{ height: "200px" }} src={imageUrl}></img> : ""}
        </Row>
        <Row style={{ marginLeft: "26%", marginRight: "25%", }}>
       {props.match && props.match.params && props.match.params.id ?
         <Button onClick={onUpdateSubmit} variant="contained" color="secondary" style={{ width: "100%", height: "40px" }}> Update Article </Button>        
        : <Button onClick={onSaveSubmit} variant="contained" color="secondary" style={{ width: "100%", height: "40px" }}> Save Article </Button>
       }</Row>
      </form>
    </div>
  );
}
AddArticle.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  saveusermessage: PropTypes.string
};
function mapStateToProps(state) {
  return {
    ...state.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TopicActions , ...ArticleActions }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(AddArticle)
);