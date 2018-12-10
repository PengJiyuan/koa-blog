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
import UserList from './modules/user-list';

class Model extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // auth: window.userInfo
    };
  }

  render() {
    // const { auth } = this.state;
    return (
      <Router history={history}>
        <div className="main">
          <NavBar />
          <div className="content">
            <Switch>
              <Route path="/admin/userlist" component={UserList} />
              <Redirect to="/admin/userlist" />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default Model;
