import React, { Component } from "react";
import {
  Wrapper,
  ContentWrapper,
  BlueDiv,
  PurpleDiv,
} from "../StaticPages.style";

export default class CentredBluePurpleLayout extends Component {
  render() {
    return (
      <Wrapper>
        <PurpleDiv width="25%" />
        <ContentWrapper
          width="50%"
          style={{ maxWidth: "32rem", margin: "0 auto", paddingTop: "3rem" }}
        >
          {this.props.children}
        </ContentWrapper>
        <BlueDiv width="25%" />
      </Wrapper>
    );
  }
}
