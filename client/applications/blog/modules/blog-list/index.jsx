import React from 'react';
import { connect } from 'react-redux';
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
    const { list } = this.props;

    return (
      <div className="module-blog-list">
        <ul className="list-wrapper">
          {
            list.map((blog) => <ListItem key={blog.id} blog={blog} />)
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
