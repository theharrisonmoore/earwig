import React, { Component } from "react";
import linkIcon from "./../../../assets/link-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  SubTitle,
  SmallParagraph,
  PageTitle
} from "./../../Common/StaticPages.style";

import CommentSection from "./../../Common/CommentSection";

export default class HelpfulStuff extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Wrapper>
        <ContentWrapper
          style={{ maxWidth: "32rem", margin: "0 auto", paddingTop: "6rem" }}
        >
          <PageTitle>More helpful stuff for workers</PageTitle>
          <MainIcon src={linkIcon} />
          <SubTitle>Link 1</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no, tota insolens recteque ex sea.
            Natum noster causae te quo. Prompta singulis ex nec, ad mei falli
            iisque dolores.
          </SmallParagraph>
          <SubTitle>Link 2</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no, tota insolens recteque ex sea.
            Natum noster causae te quo.
          </SmallParagraph>
          <SubTitle>Link 3</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no.
          </SmallParagraph>
          <CommentSection
            title="Wanna recommend something useful to help other workers? Let us know so we can add it here."
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
