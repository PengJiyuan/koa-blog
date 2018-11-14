import React from 'react';
import { Button } from 'antd';
import request from './request';

class Model extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username'),
      data: []
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    request.getBlogList().then((res) => {
      this.setState({
        data: res
      });
    });
  }

  logout = () => {
    request.logout().then(res => {
      window.location = '/';
    });
  }

  render() {
    const { data } = this.state;
    const username = window.userInfo && wiondow.userInfo.username;
    return (
      <div className="blog-list">
        <nav className="nav">
          <div className="left">
            fdsafsd
          </div>
          <div className="right">
            {
              username ? <span>{`${username}, 欢迎您！`} <a onClick={this.logout}>注销</a></span> : <a href="/login">登录</a>
            }
          </div>
        </nav>
        <ul className="list-wrapper">
          {
            data.map((blog) => <li key={blog.id}>
              <h1><a href={`/api/blog/${blog.id}`}>{blog.title}</a></h1>
              <div className="content">{blog.body}</div>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default Model;
