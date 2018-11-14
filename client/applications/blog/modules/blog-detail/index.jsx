import React from 'react';
import request from './request';
import getPathList from '../../utils/pathlist';
import './style/index.less';

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blog: ''
    }
  }

  componentDidMount() {
    this.getBlogById();
  }

  getBlogById() {
    const pathlist = getPathList();
    request.getBlogById(pathlist[2]).then((res) => {
      this.setState({
        blog: res.blog
      });
    });
  }

  render() {
    const { blog } = this.state;
    return (
      <div className="module-blog-detail">
        <div className="blog-content">
          <h1 className="title">{blog.title}</h1>
          <article className="article">{blog.body}</article>
        </div>
      </div>
    );
  }
}

export default BlogDetail;
