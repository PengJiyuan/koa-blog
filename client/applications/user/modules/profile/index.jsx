import React from 'react';
import { Form, Input, Button, Upload, Icon, notification } from 'antd';
import request from './request';
import './style/index.less';

const FormItem = Form.Item;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      avatarLoading: false,
      user: {},
      avatarUrl: ''
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    request.getUser().then((res) => {
      const user = res.user;
      this.setState({
        loading: false,
        user,
        avatarUrl: user.avatar
      });
      this.props.form.setFieldsValue({
        username: user.username,
        nickname: user.nickname,
        id: user.id,
        avatar: user.avatar
      });
    });
  }

  handleUploadFile = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      const avatarUrl = info.file.response.url;
      this.setState({
        avatarUrl,
        avatarLoading: false
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    this.props.form.validateFields((err, values) => {
      const data = {
        nickname: values.nickname,
        avatar: typeof values.avatar === 'string' ? values.avatar : values.avatar.file.response.url
      };

      if (!err) {
        request.updateUser(user.id, data).then((res) => {
          notification.success({
            message: '修改成功',
            description: '用户信息修改成功'
          });
          this.initData();
        }).catch(console.error);
      }
    });
  }

  render() {
    const { loading, user, avatarUrl } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="module-user-profile">
        {
          loading ? 'Loading...' : <div>
            <Form onSubmit={this.onSubmit}>
              <FormItem
                {...formItemLayout}
                label="用户名"
              >
                {
                  getFieldDecorator('username')(<Input disabled />)
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="用户ID"
              >
                {
                  getFieldDecorator('id')(<Input disabled />)
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="昵称"
              >
                {
                  getFieldDecorator('nickname', {
                    rules: [
                      { required: true, message: '昵称不能为空!' },
                    ],
                  })(<Input placeholder="请输入昵称" />)
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="头像"
              >
                {getFieldDecorator('avatar', {
                  valuePropName: 'file'
                })(<Upload
                  name="avatar"
                  action="/api/uploadAvatar"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={this.handleUploadFile}
                >
                  {
                    avatarUrl ? <img height="100" src={avatarUrl} alt="avatar" /> : <Icon style={{ fontSize: 24, }} type={this.state.avatarLoading ? 'loading' : 'upload'} />
                  }
                </Upload>)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="是否为管理员"
              >
                <span className="ant-form-text">{user.admin ? '是' : '否'}</span>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="创建时间"
              >
                <span className="ant-form-text">{user.created_at}</span>
              </FormItem>
              <FormItem
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 24, offset: 12 },
                }}
              >
                <Button type="primary" htmlType="submit">发布</Button>
              </FormItem>
            </Form>
          </div>
        }
      </div>
    );
  }
}

export default Form.create()(UserProfile);
