import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { updateList } from './store/action';
import ListItem from './listItem';
import request from './request';
import './style/index.less';

class BlogList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    const { store } = this.context;
    this.props.updateList();
  }

  render() {
    const { blogList } = this.props;

    return (
      <div className="module-blog-list">
        {
          blogList.loading ? <div className="loading"><Spin /></div> : <ul className="list-wrapper">
            {
              blogList.list && blogList.list.map((blog) => <ListItem key={blog.id} blog={blog} />)
            }
          </ul>
        }
      </div>
    );
  }
}

export default connect(state => ({
  blogList: state.blogList
}), {
  updateList
})(BlogList);
