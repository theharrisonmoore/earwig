import React from "react";
import { Modal, Button, Input } from "antd";

import commentIcon from "../../../assets/comment-icon.svg";

import { CommentsIcon } from "../../Pages/Review/Question/Question.style";

class App extends React.Component {
  state = {
    loading: false,
    visible: false,
    name: ""
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleOk = () => {
    if (this.props.comment) {
      this.props.setFieldValue(
        `comments[${this.props.number}]`,
        this.state.name
      );
    } else {
      this.props.setFieldValue(
        `questions[${this.props.number}]`,
        this.state.name
      );
    }
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading, name } = this.state;
    return (
      <>
        <div onClick={this.showModal}>
          {/* <CommentsIcon hasValue={!!this.state.name}>
            <img src={commentIcon} alt="" />
          </CommentsIcon> */}
          {this.props.render(this.state)}
        </div>
        <Modal
          visible={visible}
          title="Add your comments here"
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
          <Input value={name} onChange={this.handleChange} allowClear />
        </Modal>
      </>
    );
  }
}

export default App;
