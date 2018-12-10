import React from 'react';
import { Link } from 'react-router-dom';
import request from '../../request';
import logo from '../../assets/logo.gif';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    request.logout().then((res) => {
      window.location = '/';
    });
  }

  routes = [{
    url: '/blog/list',
    key: 'list',
    name: '列表'
  }, {
    url: '/blog/publish',
    key: 'publish',
    name: '发布'
  }];

  render() {
    const username = window.userInfo && window.userInfo.username;
    return (
      <nav className="nav">
        <div className="left">
          <img alt="logo" src={logo} height="40" />
        </div>
        <div className="right">
          {
            username ? <div className="right-wrapper">
              {
                this.routes.map(route => <div key={route.key}><Link to={route.url}>{route.name}</Link></div>)
              }
              <div>{`${username}, 欢迎您！`} <a onClick={this.logout}>注销</a></div>
            </div> : <a href="/login">登录</a>
          }
        </div>
      </nav>
    );
  }
}

export default Navbar;
