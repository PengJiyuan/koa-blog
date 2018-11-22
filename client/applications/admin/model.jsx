import React from 'react';
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import history from 'libs/history';
import NavBar from './components/navbar';
import UserList from './modules/user-list';

class Model extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: window.userInfo
    };
  }

  render() {
    const { auth } = this.state;
    return (
      <Router history={history}>
        <div className="main">
          <NavBar />
          <div className="content">
            <Switch>
              <Route path="/admin/userlist" component={UserList} />
              <Redirect to="/admin/userlist" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Model;
