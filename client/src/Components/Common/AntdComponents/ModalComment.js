import React from "react";
import { Modal, Button, Input } from "antd";
import axios from "axios";

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
      text: this.props.value
    });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ text: value });
  };

  handleOk = async () => {
    const { number } = this.props;
    const { category } = this.props;
    let orgCategory = "";
    if (category === "agency") {
      orgCategory = "payroll";
    } else if (category === "payroll") {
      orgCategory = "agency";
    } else {
      orgCategory = category;
    }

    if (this.props.comment) {
      this.props.setFieldValue(this.state.text, number);
    } else {
      await axios.post("/api/organizations", {
        name: this.state.text,
        active: false,
        category: orgCategory
      });
      this.props.setFieldValue(this.state.text, number);
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
