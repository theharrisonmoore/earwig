import React, { Component } from "react";
import lampIcon from "../../../assets/lamp-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  LargeParagraph,
  PageTitle,
  BlueDiv,
  PurpleDiv,
} from "../../Common/StaticPages.style";

import CommentSection from "../../Common/CommentSection";

export default class ShapeEarwig extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Wrapper>
        <ContentWrapper
          width="50%"
          style={{ maxWidth: "32rem", margin: "0 auto", paddingTop: "6rem" }}
        >
          <PageTitle>Shape earwig</PageTitle>
          <MainIcon src={lampIcon} />
          <LargeParagraph>
            Have you got an idea for a new earwig feature or review question?
          </LargeParagraph>
          <CommentSection
            title="Help shape earwig so it’s more helpful for you
            and other workers."
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
        <PurpleDiv width="25%" />
        <BlueDiv width="25%" />
      </Wrapper>
    );
  }
}
