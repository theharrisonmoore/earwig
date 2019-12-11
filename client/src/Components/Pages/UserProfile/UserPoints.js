import React, { Component } from "react";

// common profile styles
import {
  BorderedSubSectionWrapper,
  SubSectionTitleParagraph,
} from "./UserProfile.style";

import PopoverComponent from "../../Common/Popover";

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
  ExtendedTracker,
} from "./UserPoints.style";

export default class UserPoints extends Component {
  render() {
    const { points } = this.props;
    if (!points) return <div>Error loading your points...</div>;
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
          <ZeroNum color={points === 0 && "white"}>0</ZeroNum>
          <Tracker>
            {points !== 50 && <ProgressNum progress={50}>50</ProgressNum>}
            <CompetitionContainer progress={50}>
              <p>Enter competition</p>
              <PopoverComponent
                popoverOptions={{
                  text: `Give reviews often on earwig to be eligible for perks and early access to new features. earwig is a young organisation and we’re still coming up with ideas about what you can win with your points. You’ve told us you’d like to win tools and training so we’re working on it. Keep going to enter our first competition.`,
                  linkText: "Learn more",
                  icon: "info",
                  margin: "-1rem 0 0 0.2rem",
                }}
              />
            </CompetitionContainer>
            {points !== 100 && <ProgressNum progress={100}>100</ProgressNum>}
            <YourProgressDiv progress={points}>
              You've earned <br /> {points} points
            </YourProgressDiv>
            <ProgressTriangle progress={points} />
          </Tracker>
        </ProgressSection>
        <ExtendedTracker></ExtendedTracker>
      </Wrapper>
    );
  }
}
