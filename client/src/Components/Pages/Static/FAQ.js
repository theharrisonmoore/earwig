import React, { Component } from "react";
import quesstionIcon from "./../../../assets/question-mark.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  SubTitle,
  SmallParagraph,
  Iframe,
  PageTitle,
  BlueDiv,
  PurpleDiv
} from "./../../Common/StaticPages.style";

import CommentSection from "./../../Common/CommentSection";

export default class FAQ extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Wrapper>
        <PurpleDiv width="25%" />
        <BlueDiv width="25%" />
        <ContentWrapper
          width="50%"
          style={{ padding: "3rem 4vw", paddingTop: "6rem" }}
        >
          <PageTitle>FAQ & explainer videos</PageTitle>
          <MainIcon src={quesstionIcon} />
          {/* <SubTitle list>How do I give a review?</SubTitle>
          <SubTitle list>How do I give a voice review?</SubTitle>
          <SubTitle list>Will my identity be shown?</SubTitle>
          <SubTitle list>Who will see reviews I give?</SubTitle>
          <SubTitle list>How do I search for jobs?</SubTitle> */}

          <SubTitle>How do I give a review?</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no, tota insolens recteque ex sea.
            Natum noster causae te quo. Prompta singulis ex nec, ad mei falli
            iisque dolores.
          </SmallParagraph>
          <Iframe
            src="https://www.youtube.com/embed/OCWj5xgu5Ng"
            frameBorder="0"
          />

          <SubTitle>How do I give a voice review?</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no, tota insolens recteque ex sea.
            Natum noster causae te quo. Prompta singulis ex nec, ad mei falli
            iisque dolores.
          </SmallParagraph>
          <Iframe
            src="https://www.youtube.com/embed/OCWj5xgu5Ng"
            frameBorder="0"
          />
          <CommentSection
            title="Still got a question? Ask us and we'll get back to you shortly"
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
