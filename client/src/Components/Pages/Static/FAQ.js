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
  PurpleDiv,
  SubTitleGroup
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

          <SubTitleGroup>
            <SubTitle list>Getting started</SubTitle>
            <SubTitle list sublist>
              Do I have to pay to use earwig?
            </SubTitle>
            <SubTitle list sublist>
              Why do I have to get verified as a worker before I can give
              reviews?
            </SubTitle>
            <SubTitle list sublist>
              Could I be blacklisted if I give bad reviews?
            </SubTitle>
            <SubTitle list sublist>
              Can agencies, payrolls or construction companies pay earwig to
              remove reviews?
            </SubTitle>
            <SubTitle list sublist>
              Can agencies, payrolls or construction companies force earwig to
              remove reviews?
            </SubTitle>
            <SubTitle list sublist>
              What’s stopping agencies, payrolls or construction companies from
              asking their own staff to sign-up and give reviews in their
              favour?
            </SubTitle>
            <SubTitle list sublist>
              Can I delete my earwig account at any time?
            </SubTitle>
            <SubTitle list>Using earwig</SubTitle>
            <SubTitle list sublist>
              How can I make my reviews the most helpful?
            </SubTitle>
            <SubTitle list sublist>
              How many reviews can I give?
            </SubTitle>
            <SubTitle list sublist>
              Can I edit or delete a review once I’ve given it?
            </SubTitle>
            <SubTitle list sublist>
              Why can’t I see a review I just published?
            </SubTitle>
            <SubTitle list sublist>
              What are my points for?
            </SubTitle>
          </SubTitleGroup>

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
