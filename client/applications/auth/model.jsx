import React from 'react';
import {
  Input,
  Icon,
  Button
} from 'antd';
import request from './request';

class Model extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: ''
    }
  }

  componentDidMount() {

  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmit = async (e) => {
    const data = {
      username: this.state.userName,
      password: this.state.password
    };
    // const res = await request.login(data);
    // console.log(res);
    request.login(data).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { userName, password } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div className="app-auth">
        <header className="header"></header>
        <main className="content">
          <div className="left">登录</div>
          <div className="right">
            <div className="input-wrapper">
              <Input
                placeholder="请输入用户名"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={suffix}
                value={userName}
                onChange={this.onChangeUserName}
                ref={node => this.userNameInput = node}
              />
              <Input
                type="password"
                placeholder="请输入密码"
                prefix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={password}
                onChange={this.onChangePassword}
              />
              <Button onClick={this.onSubmit} type="primary">登录</Button>
            </div>
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    );
  }
}

export default Model;
