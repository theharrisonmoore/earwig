import React, { Component } from "react";

import {
  Wrapper,
  BorderedSubSectionWrapper,
  SubSectionTitleParagraph,
} from "./UserProfile.style";

export default class UserPoints extends Component {
  render() {
    return (
      <Wrapper>
        <BorderedSubSectionWrapper>
          <SubSectionTitleParagraph>
            You can edit your reviews within four weeks, unless workers have
            found them helpful and given you points, or unless the agency,
            payroll or company has replied.
            <br />
            <br /> You can delete your reviews at any time.
          </SubSectionTitleParagraph>
        </BorderedSubSectionWrapper>
      </Wrapper>
    );
  }
}
