import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Tabs } from 'antd';
import history from 'libs/history';
import Footer from 'components/footer';
import NavBar from './components/navbar';
import UserProfile from './modules/profile';
import UserSetting from './modules/setting';

const TabPane = Tabs.TabPane;

class Model extends React.Component {
  constructor(props) {
    super(props);

    const pathList = history.getPathList();

    this.state = {
      // auth: window.userInfo
      activeKey: pathList.length > 1 ? pathList[1] : 'profile'
    };
  }

  onChangeTab = (key) => {
    this.setState({
      activeKey: key
    }, () => {
      history.push(`/user/${key}`);
    });
  }

  render() {
    const { activeKey } = this.state;
    return (
      <Router history={history}>
        <div className="main">
          <NavBar />
          <div className="content">
            <Tabs onChange={this.onChangeTab} tabPosition="top" activeKey={activeKey}>
              <TabPane tab="个人信息" key="profile" />
              <TabPane tab="设置" key="setting" />
            </Tabs>
            <Switch>
              <Route path="/user/profile" component={UserProfile} />
              <Route path="/user/setting" component={UserSetting} />
              <Redirect to="/user/profile" />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default Model;
