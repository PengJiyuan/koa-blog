import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateList } from './store/action';
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
    const { list, state } = this.props;

    return (
      <div className="module-blog-list">
        <ul className="list-wrapper">
          {
            list.map((blog) => <li key={blog.id}>
              <h1><Link to={`/blog/list/${blog.id}`}>{blog.title}</Link></h1>
              <div className="content">{blog.body}</div>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.blogList
}), {
  updateList
})(BlogList);
