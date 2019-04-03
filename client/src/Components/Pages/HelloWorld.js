import React, { Component } from "react";
import axios from "axios";

import { Container, Headline } from "./HelloWorld.style";

class HelloWorld extends Component {
  state = {
    testCall: ""
  };

  componentDidMount() {
    axios
      .get("/api/hi")
      .then(res => {
        const { data } = res;
        this.setState({ testCall: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { testCall } = this.state;
    return (
      <Container>
        <Headline>CLIENT!!!</Headline>
        <Headline>{testCall}</Headline>
      </Container>
    );
  }
}
export default HelloWorld;
