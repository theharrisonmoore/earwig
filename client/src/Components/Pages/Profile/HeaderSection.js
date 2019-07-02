/* eslint-disable no-undef */
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
  IconWrapper,
  OrgLink
} from "./Profile.style";

import { organizations } from "./../../../theme";

import Icon from "./../../Common/Icon/Icon";

export default class HeaderSection extends Component {
  render() {
    const {
      isTablet,
      isMobile,
      summary,
      level,
      reviewsLast30Days,
      handleScroll,
      orgId
    } = this.props;
    const {
      category,
      name,
      email,
      phoneNumber,
      totalReviews,
      websiteUrl
    } = summary;
    // if there are reviews less dating before 1 month user not allowed
    const reviewNotAllowed = reviewsLast30Days.length > 0;

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
              <StarWrapper onClick={handleScroll}>
                {StarRateCreator(summary)}
                <Reviews>
                  {totalReviews === 0
                    ? "No reviews yet"
                    : `${totalReviews} reviews`}
                </Reviews>
              </StarWrapper>
            </CompanyNameAndStars>
          </CompanyDiv>
          {level > 1 ? (
            <ButtonDiv
              isTablet={isTablet}
              isMobile={isMobile}
              organization={category}
            >
              <OrgLink href={`tel:${phoneNumber}`} hasDetails={phoneNumber}>
                <OrgButton
                  category={category}
                  isMobile={isMobile}
                  hasDetails={phoneNumber}
                >
                  Call
                </OrgButton>
              </OrgLink>
              <OrgLink href={`mailto:${email}`} hasDetails={email}>
                <OrgButton category={category} isMobile={isMobile}>
                  Email
                </OrgButton>
              </OrgLink>
              <OrgLink
                href={`${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                hasDetails={websiteUrl}
              >
                <OrgButton category={category} isMobile={isMobile}>
                  Website
                </OrgButton>
              </OrgLink>
            </ButtonDiv>
          ) : (
            <ButtonDiv
              isTablet={isTablet}
              isMobile={isMobile}
              organization={category}
            >
              <InactiveButton
                category={category}
                isMobile={isMobile}
                hasDetails={phoneNumber}
              >
                Call
              </InactiveButton>
              <InactiveButton
                category={category}
                isMobile={isMobile}
                hasDetails={email}
              >
                Email
              </InactiveButton>
              <InactiveButton
                category={category}
                isMobile={isMobile}
                hasDetails={websiteUrl}
              >
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
              orgId={orgId}
              isTablet={isTablet}
              isMobile={isMobile}
              state={{ name, category, orgId: summary._id }}
              reviewNotAllowed={reviewNotAllowed}
              reviewsLast30Days={reviewsLast30Days}
            />
          </GiveReviewDiv>
        )}
        {level === 1 && (
          <VerifyPromo>
            <p>
              Get verified as a worker to give reviews, comment on other reviews
              and search jobs
            </p>
            <VerifyLink to={"/upload-verification-photo"} category={category}>
              Get verified now >
            </VerifyLink>
          </VerifyPromo>
        )}
      </Header>
    );
  }
}
