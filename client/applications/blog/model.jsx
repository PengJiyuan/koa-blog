import React from 'react';
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
    const data = await request.getBlogList();
    this.setState({
      data
    });
  }

  render() {
    return (
      <ul>
        {
          this.state.data.map((blog) => <li key={blog.id}>{blog.title}</li>)
        }
      </ul>
    );
  }
}

export default Model;
