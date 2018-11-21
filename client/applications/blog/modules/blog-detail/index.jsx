import React from 'react';
import { connect } from 'react-redux';
import { getBlogById } from './store/action';
import { Spin } from 'antd';
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
    const { blogContent } = this.props;
    return (
      <div className="module-blog-detail">
        {
          blogContent.loading ? <div className="loading"><Spin /></div> : <div className="blog-content">
            <h1 className="title">{blogContent.detail.title}</h1>
            <article className="article" dangerouslySetInnerHTML={{ __html: blogContent.detail.body }} />
          </div>
        }
      </div>
    );
  }
}

export default connect(state => ({
  blogContent: state.blogContent
}), {
  getBlogById
})(BlogDetail);
