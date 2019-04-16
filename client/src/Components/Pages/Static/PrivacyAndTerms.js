import React, { Component } from "react";
import paperIcon from "./../../../assets/paper-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  SubTitle,
  SmallParagraph,
  PageTitle
} from "./Static.style";
export default class PrivacyAndTerms extends Component {
  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <PageTitle>Privacy & terms</PageTitle>
          <MainIcon src={paperIcon} />
          <SubTitle>Heading</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no, tota insolens recteque ex sea.
            Natum noster causae te quo. Prompta singulis ex nec, ad mei falli
            iisque dolores.
          </SmallParagraph>
          <SubTitle>Heading</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no, tota insolens recteque ex sea.
            Natum noster causae te quo.
          </SmallParagraph>
          <SubTitle>Heading</SubTitle>
          <SmallParagraph>
            Lorem ipsum dolor sit amet, possim ocurreret cum id, ei prima
            tritani quaerendum mea, eos omnium accusamus et. Fuisset eligendi no
            cum. Porro delectus oportere has no.
          </SmallParagraph>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
