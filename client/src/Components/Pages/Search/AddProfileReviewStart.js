import React, { Component } from "react";

import { SEARCH_URL } from "../../../constants/naviagationUrls";
// styles
import {
  HeadlineDiv,
  H2,
  FooterDiv,
  H3,
  P,
  MainDiv,
  AddWrapper,
  ProfileLink
} from "./Search.style";

import GiveReview from "../../Common/GiveReview";

export default class AddProfileReviewStart extends Component {

  render() {
    const { name, category } = this.props.location.state;
    const { isTablet, isMobile } = this.props;

    return (
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>Almost done...</H2>
            <P>
              To finish adding <strong>{name}</strong>,
            </P>
            <P>please give a full or quick review </P>
          </HeadlineDiv>
          <div>
            <GiveReview
              category={category}
              isTablet={isTablet}
              isMobile={isMobile}
              state={{
                name: `${name}`,
                category: `${category}`,
                needsVerification: true
              }}
            />
          </div>
          <ProfileLink to={SEARCH_URL}>
            <FooterDiv>
              <H3>Cancel and return to Search</H3>
            </FooterDiv>
          </ProfileLink>
        </MainDiv>
      </AddWrapper>
    );
  }
}
