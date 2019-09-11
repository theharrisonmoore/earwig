/* eslint-disable no-undef */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Icon as AntdIcon, Popover, Rate } from "antd";

import { USER_PROFILE_URL } from "../../../constants/naviagationUrls";

import {
  Header,
  CompanyDetails,
  CompanyDiv,
  ButtonDiv,
  OrgButton,
  ActionButtonsDiv,
  CompanyNameAndStars,
  StarWrapper,
  CompanyTitle,
  Reviews,
  VerifyPromo,
  VerifyLink,
  InactiveButton,
  IconWrapper,
  OrgLink,
  ActionButton,
  ContractorDiv,
  ContractorText,
  ContractorListLink,
  NoReview
} from "./Profile.style";

import { organizations, colors } from "./../../../theme";

import Icon from "./../../Common/Icon/Icon";
import PopoverComponent from "./../../Common/Popover";

const content = contractorAnswers => (
  <div style={{ maxHeight: "150px", overflow: "auto" }}>
    {contractorAnswers.map(item => (
      <Link to={`/profile/${item._id}`}>{item.name}</Link>
    ))}
  </div>
);

export default class HeaderSection extends Component {
  render() {
    const {
      isTablet,
      isMobile,
      summary,
      level,
      handleScroll,
      contractorAnswers,
      reviewsLast30Days,
      orgId,
      awaitingReview
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
                <Rate
                  disabled
                  value={summary.avgRatings || summary.value || 0}
                  style={{
                    color: `${organizations[summary.category].primary}`,
                    fontSize: "0.75rem"
                  }}
                  className="last-reviewed-star-rate"
                />
                {totalReviews === 0 ? (
                  <NoReview>No reviews yet</NoReview>
                ) : (
                  <Reviews category={category}>
                    {totalReviews} review{totalReviews !== 1 && "s"}
                  </Reviews>
                )}
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
          {/* contractor section */}
          {category === "worksite" && (
            <ContractorDiv>
              <ContractorText>
                Main Contractor:{" "}
                <span className="contactor-name">
                  {contractorAnswers[0] && contractorAnswers[0].name ? (
                    <Link
                      to={`/profile/${contractorAnswers[0]._id}`}
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      {contractorAnswers[0] && contractorAnswers[0].name}
                    </Link>
                  ) : (
                    "No answers yet"
                  )}
                </span>
              </ContractorText>
              {contractorAnswers[0] && (
                <Popover
                  placement="bottom"
                  title={"Contractors List"}
                  content={content(contractorAnswers)}
                  trigger="click"
                >
                  <ContractorListLink>
                    More main contractors on this site
                  </ContractorListLink>
                  <AntdIcon style={{ color: "black" }} type="caret-down" />
                </Popover>
              )}
            </ContractorDiv>
          )}
        </CompanyDetails>
        {(level === 2 || level === 1) && (
          <>
            <ActionButtonsDiv>
              <Link
                to={{
                  pathname:
                    level === 1 && !awaitingReview
                      ? USER_PROFILE_URL
                      : `/organization/${orgId}/review`,
                  state: { name, category }
                }}
              >
                <ActionButton
                  color={organizations[category].primary}
                  disabled={reviewNotAllowed && reviewsLast30Days.length > 0}
                  isMobile={isMobile}
                  style={{
                    margin: "0 .5rem",
                    opacity: `${
                      reviewNotAllowed && reviewsLast30Days.length > 0 ? 0.5 : 1
                    }`
                  }}
                >
                  {!isMobile && (
                    <Icon
                      icon="starComment"
                      margin="0 1rem 0 0"
                      width="38"
                      height="38"
                      color={colors.white}
                    />
                  )}
                  Give a review
                </ActionButton>
              </Link>
              {/* <Link
                to={{
                  pathname:
                    level === 1 && !awaitingReview
                      ? USER_PROFILE_URL
                      : `/organization/${orgId}/review`,
                  state: { name, category }
                }}
              > */}
              <PopoverComponent
                category={category}
                popoverOptions={{
                  text: "This feature is coming soon. Stay tuned"
                }}
              >
                <ActionButton
                  color={organizations[category].primary}
                  isMobile={isMobile}
                  style={{ margin: "0 .5rem", opacity: "0.5" }}
                >
                  {!isMobile && (
                    <Icon
                      icon="raiseHand"
                      margin="0 1rem 0 0"
                      width="38"
                      height="38"
                      color={colors.white}
                    />
                  )}
                  Ask workers a question
                </ActionButton>
              </PopoverComponent>
              {/* </Link> */}
            </ActionButtonsDiv>

            {reviewNotAllowed && reviewsLast30Days.length > 0 && (
              <div style={{ textAlign: "center" }}>
                <PopoverComponent
                  category={category}
                  popoverOptions={{
                    text: `It seems that you've already reviewed this organisation in the last 30 days. You can review each organisation once a month. Date of last review: ${moment(
                      reviewsLast30Days[0].date
                    ).format("DD.MM.YYYY")}`,
                    linkText: "Why can't I give a review?"
                  }}
                />
              </div>
            )}
          </>
        )}
        {level === 1 && !awaitingReview && (
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
