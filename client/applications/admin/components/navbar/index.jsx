import React from 'react';
import request from '../../request';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    request.logout().then(res => {
      window.location = '/';
    });
  }

  render() {
    const username = window.userInfo && window.userInfo.username;
    return (
      <nav className="nav">
        <div className="left">
        </div>
        <div className="right">
          {
            username ? <div className="right-wrapper">
              <a href="/">博客</a>
              <div>{`${username}, 欢迎您！`} <a onClick={this.logout}>注销</a></div>
            </div> : <a href="/login">登录</a>
          }
        </div>
      </nav>
    );
  }
}

export default Navbar;
