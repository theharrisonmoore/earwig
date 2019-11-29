import React, { Component } from "react";
import {
  Wrapper,
  ContentWrapper,
  LargeParagraph,
  BlueDiv,
  PurpleDiv,
} from "../../Common/StaticPages.style";

import CommentSection from "../../Common/CommentSection";

export default class ShapeEarwig extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Wrapper>
        <PurpleDiv width="25%" />
        <ContentWrapper
          width="50%"
          style={{ maxWidth: "32rem", margin: "0 auto", paddingTop: "3rem" }}
        >
          <LargeParagraph>
            Have you got an idea for a new earwig feature or review question?
          </LargeParagraph>
          <CommentSection
            title="Help shape earwig so it’s more helpful for you
            and other workers."
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
        <BlueDiv width="25%" />
      </Wrapper>
    );
  }
}
