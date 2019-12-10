import React, { Component } from "react";

// common profile styles
import {
  BorderedSubSectionWrapper,
  SubSectionTitleParagraph,
} from "./UserProfile.style";

// individual styles
import {
  Wrapper,
  ProgressSection,
  Tracker,
  ProgressInTracker,
  ZeroNum,
  ProgressNum,
} from "./UserPoints.style";

export default class UserPoints extends Component {
  render() {
    return (
      <Wrapper>
        <BorderedSubSectionWrapper>
          <SubSectionTitleParagraph>
            You earn points when workers like your reviews. Make your reviews
            helpful to earn more points. You also earn points when workers
            sign-up using your magic referral links.
            <br />
            Build your network to earn more points.
          </SubSectionTitleParagraph>
        </BorderedSubSectionWrapper>
        <ProgressSection>
          <ZeroNum>0</ZeroNum>
          <Tracker>
            {/* <ProgressNum progress={50}>50</ProgressNum> */}
            <ProgressNum progress={50}>50</ProgressNum>
            <ProgressNum progress={100}>100</ProgressNum>
            {/* <ProgressInTracker progress={25} /> */}
          </Tracker>
        </ProgressSection>
      </Wrapper>
    );
  }
}
