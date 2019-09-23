import React, { Component } from "react";
import axios from "axios";

// styles
import {
  HeadlineDiv,
  H2,
  FooterDiv,
  H3,
  P,
  MainDiv,
  AddWrapper
} from "./Search.style";

import GiveReview from "../../Common/GiveReview";

export default class AddProfileReviewStart extends Component {
  deleteOrg = name => {
    axios
      .delete(`/api/delete-organization/${name}`)
      .then(() => this.props.history.push("/search"))
      .catch(err => console.log(err));
  };

  render() {
    console.log("addProfileReviewStart")
    // const {
    //   newOrg: { name, category, _id }
    // } = this.props.location.state;
    const {
      orgName: name,orgCategory:category
    } = this.props.location.state;
    const { isTablet, isMobile } = this.props;

    return (
      <AddWrapper>
        <MainDiv>
          <HeadlineDiv>
            <H2>Almost done...</H2>
            <P>
              To finish adding <strong>{name}</strong>,
            </P>
            <P>please give a review</P>
          </HeadlineDiv>
          <div>
            <GiveReview
              category={category}
              isTablet={isTablet}
              isMobile={isMobile}
              history={this.props.history}
              state={{
                name: `${name}`,
                category: `${category}`,
                needsVerification: true,
                shouldCreateNew: true
                // orgId: _id
              }}
            />
          </div>
          {/* <ProfileLink to={SEARCH_URL}> */}
          <FooterDiv
            style={{
              position: "fixed",
              bottom: "3rem",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            <H3 onClick={() => this.deleteOrg(name)}>
              Cancel and return to Search
            </H3>
          </FooterDiv>
          {/* </ProfileLink> */}
        </MainDiv>
      </AddWrapper>
    );
  }
}
