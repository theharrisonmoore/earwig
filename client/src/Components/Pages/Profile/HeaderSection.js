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
  CompanyNameAndStars,
  StarWrapper,
  CompanyTitle,
  Reviews,
  VerifyPromo,
  VerifyLink,
  InactiveButton,
  IconWrapper
} from "./Profile.style";

import { organizations } from "./../../../theme";

import Icon from "./../../Common/Icon/Icon";

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
            <IconWrapper>
              <Icon
                icon={category}
                margin="0 1rem 0 0"
                width="59"
                height="57"
                color={organizations[category].primary}
              />
            </IconWrapper>
            <CompanyNameAndStars>
              <CompanyTitle>{name}</CompanyTitle>
              <StarWrapper>
                {StarRateCreator(summary)}
                <Reviews>{totalReviews} reviews</Reviews>
              </StarWrapper>
            </CompanyNameAndStars>
          </CompanyDiv>
          {level > 1 ? (
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
              <a
                href={`${websiteURL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OrgButton category={category} isMobile={isMobile}>
                  Website
                </OrgButton>
              </a>
            </ButtonDiv>
          ) : (
            <ButtonDiv isTablet={isTablet} isMobile={isMobile}>
              <InactiveButton category={category} isMobile={isMobile}>
                Call
              </InactiveButton>
              <InactiveButton category={category} isMobile={isMobile}>
                Email
              </InactiveButton>
              <InactiveButton category={category} isMobile={isMobile}>
                Website
              </InactiveButton>
            </ButtonDiv>
          )}
        </CompanyDetails>
        {level === 2 && (
          <GiveReviewDiv>
            <GiveReviewTitle>Give a review about {name}</GiveReviewTitle>
            <GiveReview
              category={category}
              isTablet={isTablet}
              isMobile={isMobile}
              state={{ name, category }}
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
