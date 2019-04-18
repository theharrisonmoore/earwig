import React, { Component } from "react";

import { StarRateCreator } from "./../../../helpers";
import GiveReview from "./../../Common/GiveReview";

import {
  Header,
  CompanyDetails,
  CompanyDiv,
  ButtonDiv,
  OrgButton,
  GiveReviewTitle,
  GiveReviewDiv,
  Icon,
  CompanyNameAndStars,
  StarWrapper,
  CompanyTitle,
  Reviews,
  VerifyPromo,
  VerifyLink
} from "./Profile.style";

export default class HeaderSection extends Component {
  render() {
    const { isTablet, isMobile, summary, level } = this.props;
    const {
      category,
      name,
      email,
      phoneNumber,
      totalReviews,
      websiteURL
    } = summary;

    return (
      <Header isTablet={isTablet} isMobile={isMobile}>
        <CompanyDetails isTablet={isTablet} isMobile={isMobile} level={level}>
          <CompanyDiv isMobile={isMobile}>
            <Icon
              src={`/icons/${category}-icon-desktop.svg`}
              margin="0 1rem 0 0"
            />
            <CompanyNameAndStars>
              <CompanyTitle>{name}</CompanyTitle>
              <StarWrapper>
                {StarRateCreator(summary)}
                <Reviews>{totalReviews} reviews</Reviews>
              </StarWrapper>
            </CompanyNameAndStars>
          </CompanyDiv>
          <ButtonDiv isTablet={isTablet} isMobile={isMobile}>
            <a href={`tel:${phoneNumber}`}>
              <OrgButton category={category} isMobile={isMobile}>
                Call
              </OrgButton>
            </a>
            <a href={`mailto:${email}`}>
              <OrgButton category={category} isMobile={isMobile}>
                Email
              </OrgButton>
            </a>
            <a href={`${websiteURL}`} target="_blank" rel="noopener noreferrer">
              <OrgButton category={category} isMobile={isMobile}>
                Website
              </OrgButton>
            </a>
          </ButtonDiv>
        </CompanyDetails>
        {level === 2 && (
          <GiveReviewDiv>
            <GiveReviewTitle>Give a review about {name}</GiveReviewTitle>
            <GiveReview
              category={category}
              isTablet={isTablet}
              isMobile={isMobile}
            />
          </GiveReviewDiv>
        )}
        {level === 1 && (
          <VerifyPromo>
            <p>
              Get verified as a worker to give reviews, comment on other reviews
              and search jobs
            </p>
            <VerifyLink to={"/verify"} category={category}>
              Get verified now >
            </VerifyLink>
          </VerifyPromo>
        )}
      </Header>
    );
  }
}
