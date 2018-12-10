import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import history from 'libs/history';
import Footer from 'components/footer';
import NavBar from './components/navbar';
import BlogList from './modules/blog-list';
import BlogPublish from './modules/blog-publish';
import BlogDetail from './modules/blog-detail';
import BlogUpdate from './modules/blog-update';

class Model extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: window.userInfo
    };

    history.listen((h) => {
    });
  }

  render() {
    const { auth } = this.state;
    return (
      <Router history={history}>
        <div className="main">
          <NavBar />
          <div className="content">
            <Switch>
              <Route path="/" exact component={BlogList} />
              <Route path="/blog/list" exact component={BlogList} />
              {
                auth ? [
                  <Route path="/blog/publish" component={BlogPublish} />,
                  <Route path="/blog/update/:id" component={BlogUpdate} />
                ] : null
              }
              <Route path="/blog/list/:id" component={BlogDetail} />
              <Redirect to="/blog/list" />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default Model;
