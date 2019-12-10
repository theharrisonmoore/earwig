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
  YourProgressDiv,
  ProgressTriangle,
  ZeroNum,
  ProgressNum,
  CompetitionContainer,
  CompetitionDiv,
} from "./UserPoints.style";

export default class UserPoints extends Component {
  render() {
    return (
      <Wrapper>
        <BorderedSubSectionWrapper padding="1.5rem 0">
          <SubSectionTitleParagraph marginTop="2.5rem">
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
            <ProgressNum progress={50}>50</ProgressNum>
            <CompetitionContainer progress={50}>
              {/* <ProgressNum progress={50}>50</ProgressNum> */}
              <CompetitionDiv>
                <p>Enter competition</p>
                <p>Tooltip</p>
              </CompetitionDiv>
            </CompetitionContainer>
            <ProgressNum progress={100}>100</ProgressNum>
            <YourProgressDiv progress={30}>
              You've earned <br /> 30 points
            </YourProgressDiv>
            <ProgressTriangle progress={30} />
          </Tracker>
        </ProgressSection>
      </Wrapper>
    );
  }
}
