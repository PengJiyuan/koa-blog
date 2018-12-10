import React from 'react';
import { Breadcrumb, Icon, Button } from 'antd';
import './style/index.less';

export default props => (<div className="module-admin-com-wrapper">
  <div className="breadcrumb-wrapper">
    <Breadcrumb>
      <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
      <Breadcrumb.Item>{props.name}</Breadcrumb.Item>
    </Breadcrumb>
  </div>
  <div className="button-wrapper">
    {
      props.btns && props.btns.map(btn => <Button onClick={props.onClickBtnList.bind(this, btn.key)} key={btn.key} type={btn.type || 'primary'}>{btn.name}</Button>)
    }
  </div>
  <div className="content">
    {props.children}
  </div>
</div>);
