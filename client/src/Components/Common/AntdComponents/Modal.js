import React from "react";
import { Modal, Button, Input, Icon } from "antd";
import axios from "axios";

class App extends React.Component {
  // state = {
  //   loading: false,
  //   visible: false,
  //   name: ""
  // };

  // showModal = () => {
  //   this.setState({
  //     visible: true
  //   });
  // };

  // handleChange = e => {
  //   this.setState({ name: e.target.value });
  // };

  // handleOk = () => {
  //   const { category } = this.props;
  //   this.setState({ loading: true });

  //   axios
  //     .post("/api/organizations", {
  //       category,
  //       name: this.state.name
  //     })
  //     .then(res => {
  //       console.log("res", res);
  //     })
  //     .catch(err => {
  //       console.log("err", err);
  //     });

  //   setTimeout(() => {
  //     this.setState({ loading: false, visible: false });
  //   }, 3000);
  // };

  // handleCancel = () => {
  //   this.setState({ visible: false });
  // };

  render() {
    const { visible, loading } = this.props;
    return (
      <>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.props.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <Input value={this.props.name} onChange={this.props.handleChange} />
        </Modal>
      </>
    );
  }
}

export default App;
