import React from 'react';
import logo from './logo.svg';
import './App.css';
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
function App(props) {
  console.log(props.logoutcall);
  let data = JSON.parse(localStorage.getItem('user'));
  if (data === null ){
    props.history.push('/login')
  }else {
    props.history.push('/topic')

  }
// if ( JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).message !== "Success"){
// }
  return (
    <div className="App">
    
    </div>
  );
}


App.propTypes = {
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
  return bindActionCreators({  }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(App)
);