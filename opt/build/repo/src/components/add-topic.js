import React, { useState } from 'react';
import { TextField, Button, Toolbar ,Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from 'react-bootstrap'
import * as TopicActions from "../redux/actions/topic-actions"
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


function AddTopic(props) {

  const [topicName, settopicName] = useState(0);
  const [imageUrl, setimageUrl] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [message , setMessage]= React.useState('');
  const handleClick = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (topicName && imageUrl) {
      props.addTopics({ topic: topicName, image: imageUrl }).then(data => {
        if (data && data.message) {
          if (data.message === "Topic Added Successfully") {
            setOpen(true)
            setMessage("Topic Added Successfully");
            props.history.push('/topic')
          }
        }
      })

    }else {
      setMessage('Please fill all fields');
      setOpen(true)
    }
  };

  function handleChange(event) {
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
      <form className={classes.root} noValidate autoComplete="off">
      <Toolbar style={{background:"#C0C0C0" , color:"#FFF"}}>
      <Button  variant="contained" color="secondary" onClick={()=>props.history.push('/topic')} style={{ height: "40px" }}> Back </Button>&nbsp;

      Add Topic </Toolbar>
        <div style={{ marginLeft: "25%", marginRight: "25%", marginTop: "100px" }}>
          <TextField
            error={topicName === '' ? true : false}
            type="email"
            id="outlined-error"
            label="Topic Name"
            placeholder="Please enter Topic Name"
            variant="outlined"
            size="small"
            helperText={topicName === '' ? 'Please enter email.' : ''}
            onChange={(e) => (settopicName(e.target.value))}
          />

        </div>
        <Row style={{ marginLeft: "26%", marginRight: "25%", marginTop: "20px" }}>
          <div className="input-group">

            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={handleChange}
              />

            </div>
          </div>
          {imageUrl ? <img style={{height:"200px"}} src = {imageUrl}></img> : ""}
          
        </Row>
        <Row style={{ marginLeft: "26%", marginRight: "25%", }}>
          <Button onClick={onSubmit} variant="contained" color="secondary" style={{ width: "100%", height: "40px" }}> Save Topic </Button>
        </Row>

      </form>
    </div>
  );
}

AddTopic.propTypes = {
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
  return bindActionCreators({ ...TopicActions }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(AddTopic)
);