import React from 'react';
import { Form, Input, Button, message } from 'antd';
import BraftEditor from 'braft-editor';
import history from 'libs/history';
import uploadFn from 'libs/upload';
import request from './request';
import './style/index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

class BlogPublish extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: ''
    };
  }

  componentDidMount() {
    const pathList = history.getPathList();
    if (pathList.length > 2) {
      request.getBlogById(pathList[2]).then((res) => {
        const blog = res.blog;
        this.setState({
          uuid: blog.mediaPrefix
        });
        this.props.form.setFieldsValue({
          title: blog.title,
          introduction: blog.introduction,
          body: BraftEditor.createEditorState(blog.body)
        });
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const data = {
        title: values.title,
        introduction: values.introduction,
        body: values.body.toHTML()
      };

      console.log(data);

      if (!err) {
        const pathList = history.getPathList();
        request.updateBlog(pathList[2], values).then((res) => {
          message.info('博客修改成功', 1.5)
            .then(() => {
              history.push('/');
            });
        }).catch(console.error);
      }
    });
  }

  render() {
    const { uuid } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="module-blog-update">
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
            label="简介"
          >
            {
              getFieldDecorator('introduction', {
                rules: [
                  { required: true, message: '博客简介不能为空!' },
                ],
              })(
                <TextArea
                  rows={4}
                  placeholder="请输入简介内容"
                >
                </TextArea>
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
                <BraftEditor
                  className="my-editor"
                  media={{uploadFn: uploadFn.bind(this)}}
                  placeholder="请输入正文内容"
                />
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
