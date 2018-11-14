import React from 'react';
import { Form, Input, Button, message } from 'antd';
import request from './request';
import './style/index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

class BlogPublish extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        request.publish(values).then((res) => {
          message.loading('博客发表成功', 1.5)
            .then(() => {
              window.location = '/';
            });
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }

  render() {
    const { data } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="module-blog-publish">
        <Form onSubmit={this.onSubmit}>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            {
              getFieldDecorator('title', {
                rules: [
                  { required: true, message: '请输入标题!' },
                ],
              })(
                <Input placeholder="请输入标题" />
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内容"
          >
            {
              getFieldDecorator('body', {
                rules: [
                  { required: true, message: '博客内容不能为空!' },
                ],
              })(
                <TextArea rows={6} placeholder="请输入博客内容" />
              )
            }
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
    );
  }
}

export default Form.create()(BlogPublish);
