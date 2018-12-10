import React from 'react';
import { Modal } from 'antd';

class MyModal extends React.Component {
  state = {
    visible: true,
    loading: false
  };

  onCancel = () => {
    this.setState({
      visible: false
    });
    setTimeout(() => {
      this.props.onAfterClose();
    }, 300);
  }

  onOk = () => {
    const form = this.modalRef.current;
    this.setState({
      loading: true
    }, () => {
      if (form.validateFields) {
        form.validateFields((err, values) => {
          if (err) {
            this.setState({
              loading: false
            });
          } else {
            this.props.onConfirm && this.props.onConfirm(values, form, this.onCancel);
          }
        });
      }
    });
  }

  modalRef = React.createRef();

  render() {
    const {
      root, title, width, Content
    } = this.props;
    const { visible, loading } = this.state;
    return (
      <Modal
        title={title}
        visible={visible}
        getContainer={() => root}
        width={width || 540}
        onCancel={this.onCancel}
        onOk={this.onOk}
        confirmLoading={loading}
        okText="确定"
        cancelText="取消"
        maskClosable={false}
      >
        <Content ref={this.modalRef} />
      </Modal>
    );
  }
}

export default MyModal;
