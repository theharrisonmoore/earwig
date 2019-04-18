import React, { Component } from "react";

import { SEARCH_URL } from "../../../constants/naviagationUrls";
// styles
import {
  HeadlineDiv,
  H2,
  RowDiv,
  ItemDiv,
  LogosContainer,
  FooterDiv,
  H3,
  P,
  MainDiv,
  AddWrapper,
  ProfileLink,
  AddProfileLink
} from "./Search.style";

export default class AddProfileReviewStart extends Component {
  render() {
    const { name, category } = this.props.location.state;

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
            <AddProfileLink
              to={{
                pathname: `/review`,
                state: { name: `${name}`, category: `${category}` }
              }}
            >
              Full Review
            </AddProfileLink>
            <AddProfileLink
              to={{
                pathname: `/review-quick`,
                state: { name: `${name}`, category: `${category}` }
              }}
            >
              Quick Review
            </AddProfileLink>
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
