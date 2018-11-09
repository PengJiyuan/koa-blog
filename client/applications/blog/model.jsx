import React from 'react';
import { Button } from 'antd';
import request from './request';

class Model extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getList();
  }

  async getList() {
    request.getBlogList().then((res) => {
      this.setState({
        data: res
      });
    });
  }

  logout = () => {
    request.logout().then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.data.map((blog) => <li key={blog.id}>{blog.title}</li>)
          }
        </ul>
        <Button onClick={this.logout} type="primary">登出</Button>
      </div>
    );
  }
}

export default Model;
