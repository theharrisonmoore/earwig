import React, { Component } from "react";
import axios from "axios";

import Loading from "./../../Common/AntdComponents/Loading";

import { API_SEARCH_URL } from "../../../apiUrls";

import AutosuggestComponent from "./AutoSuggest";

// UI helper functions
import { SVGCreator, StarRateCreator, SortArrayNewest } from "../../../helpers";

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
  FlexContainer
} from "./Search.style";

import { organizationIcons, organizations } from "./../../../theme";

import Icon from "./../../Common/Icon/Icon";

// gets all organisations from db
export const axiosCall = async () => {
  const response = await axios.get(API_SEARCH_URL);
  return response;
};

export default class Search extends Component {
  state = {
    isLoading: false,
    data: null,
    showOtherSections: true
  };

  componentDidMount() {
    axiosCall().then(organizations => {
      this.setState({
        data: organizations.data,
        isLoading: true
      });
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // renders last viewed organization section
  renderLastViewed = (org, key) => (
    <ProfileLink key={key} to={`/profile/${org._id}`}>
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
            <h3 style={{ color: organizations[org.category].primary }}>
              {org.name}
            </h3>
            <ReviewDetailsDiv>
              {StarRateCreator(org)}
              <p>{org.totalReviews} reviews</p>
            </ReviewDetailsDiv>
          </OrganisationDetailsDiv>
          <ArrowDiv>
            {SVGCreator(`${organizationIcons[org.category].arrow}`)}
          </ArrowDiv>
        </InnerDivLastReviews>
      </ReviewsFrame>
    </ProfileLink>
  );

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
    const { isLoading, data, showOtherSections } = this.state;
    const { isMobile, isTablet } = this.props;
    if (!isLoading) return <Loading />;

    return (
      <SearchWrapper data-testid="searchwrapper">
        <HeadlineDiv>
          {isMobile ? (
            <h2>
              Welcome to earwig. <br /> Try searching for…
            </h2>
          ) : (
            <h2>Welcome to earwig. Try searching for…</h2>
          )}
        </HeadlineDiv>
        {showOtherSections && (
          <FlexContainer>
            <SearchLegendDiv>
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
        )}
        <FlexContainer ref={this.setSearchBoxRef}>
          <AutosuggestComponent
            iconTop="27px"
            bool={() => true}
            height="4.5rem"
            width="80%"
            data={data}
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
              {data
                .sort(SortArrayNewest)
                .map((org, index) =>
                  index < 5 ? this.renderLastViewed(org, index) : ""
                )}
            </ReviewsContainer>
          </FlexContainer>
        )}
      </SearchWrapper>
    );
  }
}
