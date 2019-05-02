import React from "react";
import { Modal, Button, Input } from "antd";

class App extends React.Component {
  state = {
    loading: false,
    visible: false,
    text: ""
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
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
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false, text: "" });
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
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
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

export default App;
