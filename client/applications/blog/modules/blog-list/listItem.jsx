import React from 'react';
import { Link } from 'react-router-dom';
import { message, Popconfirm, Icon, Card, Avatar } from 'antd';
import { connect } from 'react-redux';
import { updateList } from './store/action';
import history from 'libs/history';
import request from './request';

const { Meta } = Card;

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

  onRoute = (blogId) => {
    history.push(`/blog/list/${blogId}`);
  }

  onEdit = (blogId) => {
    history.push(`/blog/update/${blogId}`);
  }

  render() {
    const { blog } = this.props;
    const user = window.userInfo;
    return (
      <li>
        <Card
          cover={blog.cover ? <img alt={blog.title} src={blog.cover} /> : null}
          actions={[<Icon onClick={this.onEdit.bind(this, blog.id)} type="edit" />, <Popconfirm
            title="确认删除？"
            okText="删除"
            cancelText="取消"
            okType="danger"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={this.deleteBlog.bind(this, blog.id)}
          >
            <Icon type="delete" />
          </Popconfirm>]}
          hoverable
        >
          <Meta
            avatar={<Avatar src={user.avatar} />}
            title={blog.title}
            description={blog.introduction}
            onClick={this.onRoute.bind(this, blog.id)}
          />
        </Card>
      </li>
    );
  }
}

export default connect(null, {updateList})(ListItem);
