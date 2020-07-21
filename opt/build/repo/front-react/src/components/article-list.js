import React, { useState, useEffect } from 'react';
import * as TopicActions from "../redux/actions/topic-actions"
import * as ArticleActions from "../redux/actions/article-actions"
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Popover, Button, Toolbar, TextField, Snackbar,  Table,  TableBody,  TableCell,  TableContainer,
  TableHead,  TableRow,  Paper } from '@material-ui/core';
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


const useStyles = makeStyles({
  table: {
    minWidth: 700
  }

});

function ArticleList(props) {
  const [Article, setArticle] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tagName, settagName] = React.useState(null)
  const [CurrentArticle, setCurrentArticle] = React.useState(null)
  const [open1, setOpen1] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleClose = () => {
    setAnchorEl(null);
    settagName(null)
  };
  const classes = useStyles();

  useEffect(() => {
    props.getArticlebytopic(props.match.params.topicid).then(data => {
      setArticle(data.data)
    });
  }, [])


  const onSubmit = async (e) => {
    props.history.push('/add-Article/' + props.match.params.topicid)
  }
  const viewArticle = (id) => {
    props.history.push('/update-Article/' + id + "/topicid/" + props.match.params.topicid)
  }
  const addTag = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentArticle(id)
    // props.history.push('/article/'+id )
  }

  const open = Boolean(anchorEl);
  const savetag = () => {
    console.log(tagName, CurrentArticle);
    props.addTag({ CurrentArticle: CurrentArticle, tag: tagName }).then(data => {
      console.log(data);
      if (data.data === "Tag Added Successfully") {
        setOpen1(true)
        setMessage(data.data)
        handleClose();
      }
    })
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open1}
        autoHideDuration={1000}
        // onClose={handleClose}
        message={message}

      />
      <Popover
        // id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

        <TextField
          style={{ margin: "20px" }}
          placeholder="Please enter tag name"
          value={tagName}
          size="small"
          label="Tag Name"
          helperText={tagName === '' ? 'Please enter tag name.' : ''}
          onChange={(e) => (settagName(e.target.value))}
        />
        <Button variant="contained" color="secondary" onClick={savetag}
          style={{ height: "40px", marginRight: "20px", marginTop: "20px" }}> Save Tag </Button>

      </Popover>
      <Toolbar style={{ background: "#C0C0C0" }}>
        <Button variant="contained" color="secondary" onClick={() => props.history.push('/topic')} style={{ height: "40px" }}> Back </Button>
    &nbsp;Articles
  <Button onClick={onSubmit} variant="contained" color="secondary" style={{ marginLeft: "80%", height: "40px" }}> Add Article </Button>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Content</StyledTableCell>
              <StyledTableCell>Is Featured</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>Tags</StyledTableCell>

              {/* <StyledTableCell>Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Article.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <img style={{ height: "60px" }} src={row.image} />
                </StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>{row.content}</StyledTableCell>
                <StyledTableCell>{row.isFeatured ? 'Yes' : 'No'}</StyledTableCell>
                <StyledTableCell><a onClick={(id) => viewArticle(row._id)}>Edit Article</a></StyledTableCell>
                <StyledTableCell><a onClick={(e) => addTag(e, row._id)}>Add</a></StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

ArticleList.propTypes = {
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
  return bindActionCreators({ ...ArticleActions, ...TopicActions }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(ArticleList)
);