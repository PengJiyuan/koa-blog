import React from 'react';
import { connect } from 'react-redux';
import { getBlogById } from './store/action';
import request from './request';
import history from 'libs/history';
import './style/index.less';

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    const pathlist = history.getPathList();
    this.props.getBlogById(pathlist[2]);
  }

  render() {
    const { blog } = this.props;
    return (
      <div className="module-blog-detail">
        <div className="blog-content">
          <h1 className="title">{blog.title}</h1>
          <article className="article" dangerouslySetInnerHTML={{ __html: blog.body }} />
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
