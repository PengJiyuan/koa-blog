import React from 'react';
import { Form, Button, Upload, Icon, notification } from 'antd';
import request from './request';
import './style/index.less';

const FormItem = Form.Item;

class UserSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      backgroundImgLoading: false
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    request.getUser().then((res) => {
      const setting = res.setting;
      this.setState({
        loading: false,
        user: res.user,
        backgroundImgUrl: setting.background_img
      });
      this.props.form.setFieldsValue({
        background_img: setting.background_img
      });
    });
  }

  handleUploadFile = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ backgroundImgLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      const backgroundImgUrl = info.file.response.url;
      this.setState({
        backgroundImgUrl,
        backgroundImgLoading: false
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    this.props.form.validateFields((err, values) => {
      const data = {
        background_img: typeof values.background_img === 'string' ? values.background_img : values.background_img.file.response.url
      };

      console.log(data);

      if (!err) {
        request.updateSetting(user.id, data).then((res) => {
          notification.success({
            message: '修改成功',
            description: '用户设置修改成功'
          });
          this.initData();
        }).catch(console.error);
      }
    });
  }

  render() {
    const { loading, backgroundImgUrl } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="module-user-setting">
        {
          loading ? 'Loading...' : <div>
            <Form onSubmit={this.onSubmit}>
              <FormItem
                {...formItemLayout}
                label="博客背景图片"
              >
                {getFieldDecorator('background_img', {
                  valuePropName: 'file'
                })(<Upload
                  name="background_img"
                  action="/api/uploadBackgroundImg"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={this.handleUploadFile}
                >
                  {
                    backgroundImgUrl ?
                      <img height="100" src={backgroundImgUrl} alt="avatar" /> :
                      <Icon style={{ fontSize: 24, }} type={this.state.backgroundImgLoading ? 'loading' : 'upload'} />
                  }
                </Upload>)}
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

export default Form.create()(UserSetting);
