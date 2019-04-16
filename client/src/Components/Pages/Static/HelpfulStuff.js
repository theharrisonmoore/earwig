import React, { Component } from "react";
import linkIcon from "./../../../assets/link-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  SubTitle,
  SmallParagraph,
  Iframe,
  LargeParagraph,
  TextArea,
  Button,
  PageTitle,
  Devider
} from "./Static.style";
export default class HelpfulStuff extends Component {
  render() {
    return (
      <Wrapper>
        <ContentWrapper>
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
          <Devider />
          <LargeParagraph>
            Still got a question? Ask us and we’ll get back to you shortly.
          </LargeParagraph>
          <TextArea />
          <Button>Send</Button>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
