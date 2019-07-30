import React, { Component } from "react";
import axios from "axios";
import { Skeleton, Rate } from "antd";

import { API_SEARCH_URL } from "../../../apiUrls";
import AutosuggestComponent from "./AutoSuggest";

// styles
import {
  HeadlineDiv,
  RowDiv,
  ItemDiv,
  SearchLegendDiv,
  SymbolDiv,
  OrganisationDetailsDiv,
  ReviewDetailsDiv,
  InnerDivLastReviews,
  ArrowDiv,
  SearchWrapper,
  LegendTitle,
  ReviewsFrame,
  ProfileLink,
  ReviewsContainer,
  FlexContainer,
  HeaderParagraph
} from "./Search.style";

import { organizations } from "./../../../theme";
import Icon from "./../../Common/Icon/Icon";

import agencyArrow from "../../../assets/agency-arrow.svg";
import payrollArrow from "../../../assets/payroll-arrow.svg";
import worksiteArrow from "../../../assets/worksite-arrow.svg";
import companyArrow from "../../../assets/company-arrow.svg";

const orgArrowIcon = {
  agency: agencyArrow,
  payroll: payrollArrow,
  worksite: worksiteArrow,
  company: companyArrow
};

// gets all organisations from db
export const axiosCall = async () => {
  const response = await axios.get(API_SEARCH_URL);
  return response;
};

export default class Search extends Component {
  state = {
    isLoading: false,
    data: null,
    showOtherSections: true,
    target: "profile"
  };

  componentDidMount() {
    const { target } = this.props.match.params;

    axiosCall().then(organizations => {
      this.setState({
        data: organizations.data,
        isLoading: true,
        target: target || "profile"
      });
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    const { target } = this.props.match.params;
    if (prevState.target !== target) {
      this.setState({
        target: target
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // renders last viewed organization section
  renderLastViewed = (org, key, target) => {
    const url =
      target !== "review"
        ? `/profile/${org._id}`
        : `/organization/${org._id}/review`;
    return (
      <ProfileLink key={key} to={url}>
        <ReviewsFrame orgType={org.category}>
          <InnerDivLastReviews orgType={org.category}>
            <SymbolDiv>
              <Icon
                icon={org.category}
                height="1.5rem"
                width="1.5rem"
                margin="0 1rem 0 0"
              />
            </SymbolDiv>
            <OrganisationDetailsDiv>
              <h3
                style={{
                  color: organizations[org.category].primary,
                  textTransform: "capitalize"
                }}
              >
                {org.name}
              </h3>
              <ReviewDetailsDiv>
                <Rate
                  disabled
                  value={org.avgRatings || org.value}
                  style={{
                    color: `${organizations[org.category].primary}`,
                    fontSize: "0.75rem"
                  }}
                  className="last-reviewed-star-rate"
                />
                <p>{org.totalReviews} reviews</p>
              </ReviewDetailsDiv>
            </OrganisationDetailsDiv>
            <ArrowDiv>
              <img src={orgArrowIcon[org.category]} alt="" />
            </ArrowDiv>
          </InnerDivLastReviews>
        </ReviewsFrame>
      </ProfileLink>
    );
  };

  // functions to detect if user clicks outside search box
  // if clicked inside => don't show other sections
  setSearchBoxRef = node => {
    this.searchBoxRef = node;
  };
  handleClickOutside = event => {
    if (this.searchBoxRef && !this.searchBoxRef.contains(event.target)) {
      this.setState({ showOtherSections: true, boxClicked: false });
    } else {
      this.setState({ showOtherSections: false });
    }
  };

  render() {
    const { isLoading, data, showOtherSections, target } = this.state;
    const { isMobile, isTablet } = this.props;

    return (
      <SearchWrapper data-testid="searchwrapper" isMobile={isMobile}>
        <HeadlineDiv>
          {isMobile ? (
            target !== "review" ? (
              <HeaderParagraph>
                See what workers are saying about agencies, payrolls, worksites,
                and companies
              </HeaderParagraph>
            ) : (
              <HeaderParagraph>
                Which agency, payroll, worksite, or company do you want to give
                a review of?
              </HeaderParagraph>
            )
          ) : target !== "review" ? (
            <HeaderParagraph>
              See what workers are saying about agencies, payrolls, worksites,
              and companies
            </HeaderParagraph>
          ) : (
            <HeaderParagraph>
              Which agency, payroll, worksite, or company do you want to give a
              review of?
            </HeaderParagraph>
          )}
        </HeadlineDiv>
        {/* {showOtherSections && (
          <FlexContainer>
            <SearchLegendDiv isMobile={isMobile}>
              <RowDiv>
                <ItemDiv notMobile={!isMobile} left>
                  <div>
                    <Icon
                      icon="agency"
                      color={organizations.agency.primary}
                      width="2rem"
                      height="2rem"
                      margin="0 1rem 0 0"
                    />
                  </div>
                  <LegendTitle orgType="agency">Agencies</LegendTitle>
                </ItemDiv>
                <ItemDiv notMobile={!isMobile}>
                  <div>
                    <Icon
                      icon="payroll"
                      color={organizations.payroll.primary}
                      width="2rem"
                      height="2rem"
                      margin="0 1rem 0 0"
                    />
                  </div>
                  <LegendTitle orgType="payroll">Payrolls</LegendTitle>
                </ItemDiv>
              </RowDiv>
              <RowDiv>
                <ItemDiv notMobile={!isMobile} left>
                  <div>
                    <Icon
                      icon="worksite"
                      color={organizations.worksite.primary}
                      width="2rem"
                      height="2rem"
                      margin="0 1rem 0 0"
                    />
                  </div>
                  <LegendTitle orgType="worksite">Worksites</LegendTitle>
                </ItemDiv>
                <ItemDiv notMobile={!isMobile}>
                  <div>
                    <Icon
                      icon="company"
                      color={organizations.company.primary}
                      width="2rem"
                      height="2rem"
                      margin="0 1rem 0 0"
                    />
                  </div>
                  <LegendTitle orgType="company">Companies</LegendTitle>
                </ItemDiv>
              </RowDiv>
            </SearchLegendDiv>
          </FlexContainer>
        )} */}
        <FlexContainer ref={this.setSearchBoxRef}>
          <AutosuggestComponent
            iconTop="20px"
            bool={() => true}
            height="4.5rem"
            width="80%"
            data={data && data[0].searchData}
            placeholderText="Start typing..."
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </FlexContainer>
        {showOtherSections && (
          <FlexContainer>
            <HeadlineDiv>
              <p>Most recent reviews:</p>
            </HeadlineDiv>
            <ReviewsContainer>
              <Skeleton loading={!isLoading}>
                {data &&
                  data[0].lastReviwed.map(org =>
                    this.renderLastViewed(org.lastReviwed, org._id, target)
                  )}
              </Skeleton>
            </ReviewsContainer>
          </FlexContainer>
        )}
      </SearchWrapper>
    );
  }
}
