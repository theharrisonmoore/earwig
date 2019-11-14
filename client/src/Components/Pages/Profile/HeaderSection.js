/* eslint-disable no-undef */
import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Icon as AntdIcon, Popover, Rate } from "antd";

import {
  USER_PROFILE_URL,
  PRE_REVIEW
} from "../../../constants/naviagationUrls";

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
  InactiveButton,
  OrgLink,
  ContractorDiv,
  ContractorText,
  ContractorListLink,
  PopOverWrapper
} from "./Profile.style";

import { colors } from "../../../theme";

import PopoverComponent from "../../Common/Popover";
import Button from "../../Common/Button";

const content = contractorAnswers => (
  <div style={{ maxHeight: "150px", overflow: "auto" }}>
    {contractorAnswers.map(item => (
      <Link to={`/profile/${item._id}`}>{item.name}</Link>
    ))}
  </div>
);

export default class HeaderSection extends Component {
  state = {
    shrink: false
  };

  headerRef = createRef();

  componentDidMount() {
    document.addEventListener("scroll", this.checkScroll);
    this.checkScroll();
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.checkScroll);
  }

  checkScroll = () => {
    if (
      document.body.scrollTop > 60 ||
      document.documentElement.scrollTop > 60
    ) {
      this.setState({ shrink: true });
    } else {
      this.setState({ shrink: false });
    }

    setTimeout(() => {
      const headerHeight = this.headerRef.current.clientHeight;
      if (
        document.body.scrollTop > 60 ||
        document.documentElement.scrollTop > 60
      ) {
        this.setState({ shrink: true, headerHeight });
      } else {
        this.setState({ shrink: false, headerHeight });
      }
    }, 400);
  };

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

    const { shrink, headerHeight } = this.state;
    return (
      <Header
        isTablet={isTablet}
        isMobile={isMobile}
        category={category}
        ref={this.headerRef}
        headerHeight={headerHeight}
      >
        <CompanyDetails isTablet={isTablet} isMobile={isMobile} level={level}>
          <CompanyDiv isMobile={isMobile}>
            <CompanyNameAndStars>
              <CompanyTitle>{name}</CompanyTitle>
              {level > 1 ? (
                <ButtonDiv
                  isTablet={isTablet}
                  isMobile={isMobile}
                  organization={category}
                  shrink={shrink}
                >
                  {category !== "company" && (
                    <>
                      <OrgLink
                        href={`tel:${phoneNumber}`}
                        hasDetails={phoneNumber}
                        shrink={shrink}
                      >
                        <OrgButton
                          category={category}
                          isMobile={isMobile}
                          hasDetails={phoneNumber}
                          shrink={shrink}
                        >
                          Call
                        </OrgButton>
                      </OrgLink>

                      <OrgLink
                        href={`mailto:${email}`}
                        hasDetails={email}
                        shrink={shrink}
                      >
                        <OrgButton
                          category={category}
                          isMobile={isMobile}
                          shrink={shrink}
                        >
                          Email
                        </OrgButton>
                      </OrgLink>
                    </>
                  )}

                  <OrgLink
                    href={`${websiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    hasDetails={websiteUrl}
                    shrink={shrink}
                  >
                    <OrgButton
                      category={category}
                      isMobile={isMobile}
                      shrink={shrink}
                    >
                      Website
                    </OrgButton>
                  </OrgLink>
                </ButtonDiv>
              ) : (
                <ButtonDiv
                  isTablet={isTablet}
                  isMobile={isMobile}
                  organization={category}
                  shrink={shrink}
                >
                  {category !== "company" && (
                    <>
                      <InactiveButton
                        category={category}
                        isMobile={isMobile}
                        hasDetails={phoneNumber}
                        shrink={shrink}
                      >
                        Call
                      </InactiveButton>
                      <InactiveButton
                        category={category}
                        isMobile={isMobile}
                        hasDetails={email}
                        shrink={shrink}
                      >
                        Email
                      </InactiveButton>
                    </>
                  )}

                  <InactiveButton
                    category={category}
                    isMobile={isMobile}
                    hasDetails={websiteUrl}
                    shrink={shrink}
                  >
                    Website
                  </InactiveButton>
                </ButtonDiv>
              )}
              <StarWrapper onClick={handleScroll} shrink={shrink}>
                <Rate
                  disabled
                  value={summary.avgRatings || summary.value || 0}
                  style={{
                    color: `${colors.stars}`,
                    fontSize: "0.75rem"
                  }}
                  className="last-reviewed-star-rate"
                />
                <Reviews>
                  {totalReviews} review{totalReviews !== 1 && "s"}
                </Reviews>
              </StarWrapper>
            </CompanyNameAndStars>
          </CompanyDiv>

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
                  title="Contractors List"
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
                      : PRE_REVIEW.replace(":orgId", orgId),
                  state: { name, category }
                }}
              >
                <Button
                  styleType="primary"
                  style={{
                    opacity: `${
                      reviewNotAllowed && reviewsLast30Days.length > 0 ? 0.5 : 1
                    }`
                  }}
                  text={`Review this ${category || "organisation"}`}
                  disabled={reviewNotAllowed && reviewsLast30Days.length > 0}
                  margin="0 auto 0.5rem auto"
                />
              </Link>
            </ActionButtonsDiv>

            {reviewNotAllowed && reviewsLast30Days.length > 0 && (
              <PopOverWrapper shrink={shrink}>
                <PopoverComponent
                  category={category}
                  popoverOptions={{
                    text: `It seems that you've already reviewed this organisation in the last 30 days. You can review each organisation once a month. Date of last review: ${moment(
                      reviewsLast30Days[0].date
                    ).format("DD.MM.YYYY")}`,
                    linkText: "Why can't I give a review?",
                    icon: "info",
                    margin: "0.5 auto",
                    color: `${colors.white}`
                  }}
                />
              </PopOverWrapper>
            )}
          </>
        )}
      </Header>
    );
  }
}
