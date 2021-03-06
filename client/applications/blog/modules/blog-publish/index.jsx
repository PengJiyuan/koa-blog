import React from 'react';
import { Form, Input, Button, message, Upload, Icon } from 'antd';
import uuid from 'uuid';
import BraftEditor from 'braft-editor';
import uploadFn from 'libs/upload';
import history from 'libs/history';
import request from './request';
import './style/index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

class BlogPublish extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: uuid.v4(),
      loading: false
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const data = {
        title: values.title,
        introduction: values.introduction,
        mediaPrefix: this.state.uuid,
        cover: values.cover.file.response.url,
        body: values.body.toHTML()
      };

      if (!err) {
        request.publish(data).then((res) => {
          message.info('博客发表成功', 1.5)
            .then(() => {
              history.push('/');
            });
        }).catch(console.error);
      }
    });
  }

  handleUploadFile = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.url;
      this.setState({
        imageUrl,
        loading: false
      });
    }
  }


  render() {
    const { imageUrl } = this.state;
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
              })(<Input placeholder="请输入标题" />)
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
              })(<TextArea
                rows={4}
                placeholder="请输入简介内容"
              />)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="封面图"
          >
            {getFieldDecorator('cover', {
              valuePropName: 'file'
            })(<Upload
              name="cover"
              action="/api/uploadCover"
              listType="picture-card"
              showUploadList={false}
              onChange={this.handleUploadFile}
            >
              {
                  imageUrl ? <img height="100" src={imageUrl} alt="cover" /> : <Icon style={{ fontSize: 24, }} type={this.state.loading ? 'loading' : 'upload'} />
              }
            </Upload>)}
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
              })(<BraftEditor
                className="my-editor"
                media={{ uploadFn: uploadFn.bind(this) }}
                placeholder="请输入正文内容"
              />)
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
