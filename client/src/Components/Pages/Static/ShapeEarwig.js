import React, { Component } from "react";
import lampIcon from "./../../../assets/lamp-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  LargeParagraph,
  PageTitle
} from "./../../Common/StaticPages.style";

import CommentSection from "./../../Common/CommentSection";

import { CONTACT_URL } from "./../../../constants/naviagationUrls.js";

export default class ShapeEarwig extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Wrapper>
        <ContentWrapper>
          <PageTitle>Shape earwig</PageTitle>
          <MainIcon src={lampIcon} />
          <LargeParagraph>
            Have you got an idea for a new earwig feature or review question?
          </LargeParagraph>
          <CommentSection
            title="Help shape earwig so it’s more helpful for you
            and other workers."
            section={CONTACT_URL}
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
