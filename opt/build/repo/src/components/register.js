import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from 'react-bootstrap'
import * as UserActions from "../redux/actions/user-actions"
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));


function RegisterComponent(props) {

  const [email, setEmail] = useState(0);
  const [name, setName] = useState(0);
  const [password, setPassword] = useState(0);
  const [conpassword, setConPassword] = useState(0);

  const classes = useStyles();
  const onSubmit = async (e) => {
  await  e.preventDefault();
    if (email && password && name ){
    await  props.register({ email: email,name :name,  password: password }).then(data =>{
 if (data.message === "User added successfully"){
      props.history.push('/login')
    }
    });
   
    }
  };
  const onsignup = (e) => {
    e.preventDefault();
    props.history.push('/')
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div style={{ marginLeft: "25%", marginRight: "25%", marginTop: "100px" }}>
      <TextField
          error={name === '' ? true : false}
          type="text"
          id="outlined-error"
          label="Name"
          placeholder="Please Enter Name"
          variant="outlined"
          size="small"
          helperText={name === '' ? 'Please enter name.' : ''}
          onChange={(e) => (setName(e.target.value))}
        />
        <TextField
          error={email === '' ? true : false}
          type="email"
          id="outlined-error"
          label="Email ID"
          placeholder="Please Enter Email"
          variant="outlined"
          size="small"
          helperText={email === '' ? 'Please enter email.' : ''}
          onChange={(e) => (setEmail(e.target.value))}
        />
        <TextField
          error={password === '' ? true : false}
          type="password"
          id="outlined-error-helper-text"
          label="Password"
          placeholder="Please enter Password"
          helperText={password === '' ? 'Please enter Password.' : ''}
          variant="outlined"
          size="small"
          // value ={this.state.password}
          onChange={(e) => (setPassword(e.target.value))}

        />
        <TextField
          error={conpassword === '' ? true : false}
          type="password"
          id="outlined-error-helper-text"
          label="Confirm Password"
          placeholder="Please enter Confirm Password"
          helperText={conpassword === '' ? 'Confirm Password must be same as Password.' : ''}
          variant="outlined"
          size="small"
          // value ={this.state.password}
          onChange={(e) => (setConPassword(e.target.value))}

        />
      </div>
      <Row style={{ marginLeft: "26%", marginRight: "25%", }}>
        <Button onClick={onSubmit} variant="contained" color="secondary" style={{ width: "100%", height: "40px" }}> Sign Up </Button>
      </Row>
      <Row style={{ marginLeft: "26%", marginRight: "25%",marginTop:"20px" }}>

      <a onClick={onsignup}>Already have an account ? Login Here</a>      </Row>
    </form>
  );
}

RegisterComponent.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  registermessage: PropTypes.string
};
function mapStateToProps(state) {
  return {
    ...state.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(RegisterComponent)
);