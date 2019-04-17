import React from "react";
import { Modal, Button, Input } from "antd";

class App extends React.Component {
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
