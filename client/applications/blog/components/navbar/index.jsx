import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Icon } from 'antd';
import request from '../../request';

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
    name: '列表',
    icon: 'ordered-list'
  }, {
    url: '/blog/publish',
    key: 'publish',
    name: '发布',
    icon: 'file-add'
  }];

  render() {
    const user = window.userInfo;
    const username = user && user.username;
    const avatar = user && user.avatar;
    return (
      <nav className="nav">
        <div className="left">
          {
            user && <Avatar alt="avatar" src={avatar} />
          }
        </div>
        <div className="right">
          {
            username ? <div className="right-wrapper">
              {
                this.routes.map(route => <div key={route.key}><Link to={route.url}><Icon style={{ marginRight: 4, }} type={route.icon} />{route.name}</Link></div>)
              }
              <div><a onClick={this.logout}><Icon style={{ marginRight: 4, }} type="logout" />注销</a></div>
            </div> : <a href="/login">登录</a>
          }
        </div>
      </nav>
    );
  }
}

export default Navbar;
