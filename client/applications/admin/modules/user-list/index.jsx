import React from 'react';
import { connect } from 'react-redux';
import { Table, Avatar } from 'antd';
import { updateList } from './store/action';
import Wrapper from '../../components/wrapper';
import popCreateUser from './pop/create_user/index';
import './style/index.less';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.updateList();
  }

  columns = [{
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: text => <a href="javascript:;">{text}</a>
  }, {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    render: text => <Avatar src={text} />
  }, {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '是否为管理员',
    dataIndex: 'admin',
    key: 'admin',
    render: text => (text ? <span style={{ color: 'orange', }}>是</span> : '不是')
  }, {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at'
  }];

  btns = [{
    name: '创建用户',
    key: 'create_user'
  }];

  onClickBtnList = (key) => {
    switch (key) {
      case 'create_user':
        popCreateUser(this.refresh);
        break;
      default:
        break;
    }
  }

  refresh = () => {
    this.props.updateList();
  }

  render() {
    const { userList } = this.props;

    return (
      <div className="module-user-list">
        <Wrapper
          name="用户列表"
          btns={this.btns}
          onClickBtnList={this.onClickBtnList}
        >
          <Table
            pagination={{
              showTotal: (total, range) => `${range[0]}-${range[1]} ／ 共 ${total} 个用户`
            }}
            bordered
            columns={this.columns}
            dataSource={userList.list}
            loading={userList.loading}
          />
        </Wrapper>
      </div>
    );
  }
}

export default connect(state => ({
  userList: state.userList
}), {
  updateList
})(UserList);
