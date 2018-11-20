import React from 'react';
import { Form, Input, Button, message } from 'antd';
import BraftEditor from 'braft-editor';
import history from 'libs/history';
import request from './request';
import uuid from 'uuid';
import './style/index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

class BlogPublish extends React.Component {
  constructor(props) {
    super(props);

    this.uuid = uuid.v4();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const data = {
        title: values.title,
        introduction: values.introduction,
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

  myUploadFn = (param) => {
    console.log(param)
    const serverURL = '/api/uploadFile';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      console.log(JSON.parse(xhr.responseText));
      param.success({
        url: JSON.parse(xhr.responseText).url,
        meta: {
          id: 'xxx',
          title: 'xxx',
          alt: 'xxx',
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      });
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100);
    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      });
    };

    xhr.upload.addEventListener("progress", progressFn, false);
    xhr.addEventListener("load", successFn, false);
    xhr.addEventListener("error", errorFn, false);
    xhr.addEventListener("abort", errorFn, false);

    fd.append('uuid', this.uuid);
    fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    xhr.send(fd);
  }

  render() {
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
                  media={{uploadFn: this.myUploadFn}}
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
