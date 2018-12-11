import React from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Icon } from 'antd';
import history from 'libs/history';
import { updateList } from './store/action';
import ListItem from './listItem';
import './style/index.less';

class BlogList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.updateList();
  }

  goToPublish = () => {
    history.push('/blog/publish');
  }

  render() {
    const { blogList } = this.props;

    return (
      <div className="module-blog-list">
        {
          blogList.loading && <div className="loading"><Spin /></div>
        }
        {
          !blogList.loading && blogList.list.length > 0 && <ul className="list-wrapper">
            {
              blogList.list && blogList.list.map(blog => <ListItem key={blog.id} blog={blog} />)
            }
          </ul>
        }
        {
          !blogList.loading && blogList.list.length === 0 && <div className="no-data">
            <div className="no-data-wrapper">
              <Button onClick={this.goToPublish} type="primary"><Icon type="plus-square" />发布</Button>
              <p style={{ marginTop: 10, }}>没有内容</p>
            </div>
          </div>
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
