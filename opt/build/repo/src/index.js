import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducers/combine';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import TopicList from './components/topic-list';
import AddTopic from './components/add-topic';
import AddArticle from './components/add-article';
import ArticleList from './components/article-list';
import ViewTopic from './components/view-topic'
const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
ReactDOM.render(  
<Provider store={store}>
<Router history ={useHistory}>
      <Switch>
        <Route path="/register"> <Register /></Route>
        <Route path="/login"> <Login /></Route>
        <Route path="/topic"> <TopicList /></Route>
        <Route path="/add-topic"> <AddTopic /></Route>
        <Route path="/view-topic/:id"> <ViewTopic /></Route>
        <Route path="/add-article/:topicid"> <AddArticle /></Route>
        <Route path="/update-article/:id/topicid/:topicid/"> <AddArticle /></Route>
        <Route path="/article/:topicid"> <ArticleList /></Route>
        <Route path="/"> <App /></Route>

      </Switch>
</Router>
      </Provider>,
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
