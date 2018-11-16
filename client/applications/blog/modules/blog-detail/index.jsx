import React from 'react';
import { connect } from 'react-redux';
import { getBlogById } from './store/action';
import request from './request';
import getPathList from '../../utils/pathlist';
import './style/index.less';

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    const pathlist = getPathList();
    this.props.getBlogById(pathlist[2]);
  }

  render() {
    const { blog } = this.props;
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

export default connect(state => ({
  blog: state.blogContent
}), {
  getBlogById
})(BlogDetail);
