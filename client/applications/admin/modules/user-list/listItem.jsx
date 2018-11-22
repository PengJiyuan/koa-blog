import React from 'react';
import { Link } from 'react-router-dom';
import { message, Popconfirm, Icon } from 'antd';
import { connect } from 'react-redux';
import { updateList } from './store/action';
import history from 'libs/history';
import request from './request';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteBlog = (id) => {
    request.deleteBlog(id).then(res => {
      message.info('删除成功', 1.5).then(() => {
        this.props.updateList();
      });
    }).catch(err => {
      message.error('删除失败！');
    });
  }

  render() {
    const { blog } = this.props;
    const auth = window.userInfo;
    return (
      <li>
        <div className="listitem">
          <h1><Link to={`/blog/list/${blog.id}`}>{blog.title}</Link></h1>
          <div className="author">作者：{blog.username}</div>
          <div className="content">{blog.introduction}</div>
        </div>
        <div className={`edit ${auth ? '' : 'hide'}`}>
          <Link to={`/blog/update/${blog.id}`}>编辑</Link>
          <Popconfirm
            title="确认删除？"
            okText="删除"
            cancelText="取消"
            okType="danger"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={this.deleteBlog.bind(this, blog.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </div>
      </li>
    );
  }
}

export default connect(null, {updateList})(ListItem);
