import React, { Component } from "react";
import lampIcon from "./../../../assets/lamp-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  LargeParagraph,
  TextArea,
  Button,
  PageTitle
} from "./../../Common/StaticPages.style";

export default class ShapeEarwig extends Component {
  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <PageTitle>Shape earwig</PageTitle>
          <MainIcon src={lampIcon} />
          <LargeParagraph>
            Have you got an idea for a new earwig feature or review question?
          </LargeParagraph>

          <LargeParagraph>
            Help shape earwig so it’s more helpful for you and other workers.
          </LargeParagraph>
          <TextArea />
          <Button>Send</Button>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
