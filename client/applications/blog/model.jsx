import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import NavBar from './components/navbar';
import BlogList from './modules/blog-list';
import BlogPublish from './modules/blog-publish';
import BlogDetail from './modules/blog-detail';

const HISTORY = createBrowserHistory({
  basename: `/blog`
});

class Model extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="main">
          <NavBar />
          <div className="content">
            <Switch>
              <Route path="/" exact component={BlogList} />
              <Route path="/blog/list" exact component={BlogList} />
              <Route path="/blog/publish" component={BlogPublish} />
              <Route path="/blog/list/:id" component={BlogDetail} />
              <Redirect to="/blog/list" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Model;
