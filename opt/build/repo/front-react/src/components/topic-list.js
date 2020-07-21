import React, { useState, useEffect } from 'react';

import * as TopicActions from "../redux/actions/topic-actions"
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField, Button, Toolbar } from '@material-ui/core';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
 function TopicList(props) {
 const [Topic, setTopic] = useState([]);
    const classes = useStyles();
  useEffect(() => { 

    props.getTopics(0).then(data =>{
    
      if (data && data.message){
        if (data.message && data.message !== "Unauthorized"){
          setTopic(data.message)

        }

      }
    });
  }, [])

  
  const onSubmit = async (e) => {
    props.history.push('/add-topic')
  }
  const viewTopic =(id)=>{
    props.history.push('/view-topic/'+id )
  }
  const viewArticle=(id)=>{
    props.history.push('/article/'+id )
  }
  console.log(Topic);
  return (
    <div>
  <Toolbar style ={{background:"#C0C0C0"}}>Topics
  <Button  onClick={onSubmit} variant="contained" color="secondary" style={{marginLeft:"85%",  height: "40px" }}> Add Topic </Button>
  </Toolbar>
  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>View&nbsp;Topic</StyledTableCell>
            <StyledTableCell>Articles&nbsp;List</StyledTableCell>
            {/* <StyledTableCell>Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {Topic ? Topic.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
             <img style ={{height:"60px"}} src ={row.image} />   
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>
              <a onClick={(id)=>viewTopic(row._id)}>View</a>
              </StyledTableCell>
              <StyledTableCell>
              <a onClick={(id)=>viewArticle(row._id)}>View Articles</a>
              </StyledTableCell>
            </StyledTableRow>
          )):[]}
        </TableBody>
      </Table>
    </TableContainer>
 
    </div>
   );
}

TopicList.propTypes = {
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
  )(TopicList)
);