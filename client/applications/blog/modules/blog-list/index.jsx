import React from 'react';
import { Link } from 'react-router-dom';
import request from './request';
import './style/index.less';

class BlogList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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

  render() {
    const { data } = this.state;
    return (
      <div className="module-blog-list">
        <ul className="list-wrapper">
          {
            data.map((blog) => <li key={blog.uuid}>
              <h1><Link to={`/blog/list/${blog.uuid}`}>{blog.title}</Link></h1>
              <div className="content">{blog.body}</div>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default BlogList;
