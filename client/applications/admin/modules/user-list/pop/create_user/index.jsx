import React from 'react';
import { Form, Input, Icon } from 'antd';
import pop from '../../../../components/modal';
import request from '../../request';

class Content extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (<div>
      <Form>
        <Form.Item
          label="用户名"
          {...formItemLayout}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
        </Form.Item>
        <Form.Item
          label="密码"
          {...formItemLayout}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
        </Form.Item>
        <Form.Item
          label="确认密码"
          {...formItemLayout}
        >
          {getFieldDecorator('rePassword', {
            rules: [{ required: true, message: '请再次输入密码!' }],
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />)}
        </Form.Item>
      </Form>
    </div>);
  }
}

export default (callback) => {
  const _props = {
    title: '创建用户',
    Content: Form.create()(Content),
    onConfirm: (values, form, cb) => {
      if (values.password !== values.rePassword) {
        form.setFields({
          rePassword: {
            value: values.rePassword,
            errors: [new Error('两次输入的密码不一致')]
          },
        });
      } else {
        const data = {
          username: values.username,
          password: values.password
        };
        request.createUser(data).then((res) => {
          callback && callback();
          cb(true);
        });
      }
    }
  };

  pop(_props);
};
