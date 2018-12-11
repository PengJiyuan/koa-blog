import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Icon, Dropdown, Menu } from 'antd';
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

  onClickMenu = ({ key }) => {
    switch (key) {
      case 'user':
        window.location = '/user';
        break;
      case 'logout':
        this.logout();
        break;
      default:
        break;
    }
  }

  render() {
    const user = window.userInfo;
    const username = user && user.username;
    const avatar = user && user.avatar;
    const menu = (
      <Menu onClick={this.onClickMenu}>
        <Menu.Item key="user">
          <Icon type="user" /> 个人中心
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" /> 退出
        </Menu.Item>
      </Menu>
    );
    return (
      <nav className="nav">
        <div className="left" />
        <div className="right">
          {
            username ? <div className="right-wrapper">
              {
                this.routes.map(route => <div key={route.key}><Link to={route.url}><Icon style={{ marginRight: 4, }} type={route.icon} />{route.name}</Link></div>)
              }
              {
                user && <div style={{ cursor: 'pointer', }}>
                  <Dropdown overlay={menu}><Avatar alt="avatar" src={avatar} /></Dropdown>
                </div>
              }
            </div> : <a href="/login">登录</a>
          }
        </div>
      </nav>
    );
  }
}

export default Navbar;
