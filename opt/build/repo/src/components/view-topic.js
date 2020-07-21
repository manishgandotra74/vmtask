import React, { useState , useEffect} from 'react';
import { Button, Toolbar  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Row , Col} from 'react-bootstrap'
import * as TopicActions from "../redux/actions/topic-actions"
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


function ViewTopic(props) {
    const [Topic, setTopic] = useState([]);

    useEffect(() => { 
        props.getTopics( props.match.params.id).then(data =>{
          if (data && data.message){
            setTopic(data.message[0])
          }else {
            
          }
        });
      }, [])
  
  return (
 <div>
     <Toolbar style={{background:"#C0C0C0" , color:"#FFF"}}>
     <Button variant="contained" color="secondary" onClick={()=>props.history.push('/topic/')} style={{ height: "40px" }}> Back </Button>
         &nbsp;{Topic.name} </Toolbar>
     <Row>
   Topic Name:- {Topic.name}
     </Row>
     <Row>
    Topic Icon :- <img src = {Topic.image}></img>
     </Row>
 </div>
  );
}

ViewTopic.propTypes = {
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
  )(ViewTopic)
);