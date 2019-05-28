import React from "react";
import { Modal, Button, Input } from "antd";

class ModalComment extends React.Component {
  state = {
    loading: false,
    visible: false,
    text: "",
    submittedText: ""
  };

  showModal = () => {
    this.setState({
      visible: true,
      text: this.state.submittedText
    });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ text: value });
  };

  handleOk = () => {
    if (this.props.comment) {
      this.props.setFieldValue(
        `comments[${this.props.number}]`,
        this.state.text
      );
    } else {
      this.props.setFieldValue(
        `questions[${this.props.number}]`,
        this.state.text
      );
    }
    this.setState({
      visible: false,
      submittedText: this.state.text,
      text: ""
    });
  };

  handleCancel = () => {
    this.setState({ visible: false, text: this.state.submittedText });
  };

  render() {
    const { visible, loading, text } = this.state;
    return (
      <>
        <div onClick={this.showModal}>{this.props.render(this.state)}</div>
        <Modal
          visible={visible}
          title={this.props.title}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Save
            </Button>
          ]}
        >
          <Input
            value={text}
            onChange={this.handleChange}
            allowClear
            autoFocus
          />
        </Modal>
      </>
    );
  }
}

export default ModalComment;
