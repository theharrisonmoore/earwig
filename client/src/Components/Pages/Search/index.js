import React, { Component } from "react";
import axios from "axios";
import { Skeleton, Rate, message } from "antd";

import Header from "./Header";

import {
  API_SEARCH_URL,
  API_GET_LAST_30D_ORGANISATIONS_IDS,
} from "../../../apiUrls";

import AutosuggestComponent from "./AutoSuggest";
import PopOverWrapper from "./PopOverWrapper";

// styles
import {
  HeadlineDiv,
  SymbolDiv,
  OrganisationDetailsDiv,
  ReviewDetailsDiv,
  InnerDivLastReviews,
  ArrowDiv,
  SearchWrapper,
  ReviewsFrame,
  ProfileLink,
  ReviewsContainer,
  FlexContainer,
  HeaderParagraph,
} from "./Search.style";

import { organizations } from "../../../theme";
import Icon from "../../Common/Icon/Icon";

import agencyArrow from "../../../assets/agency-arrow.svg";
import payrollArrow from "../../../assets/payroll-arrow.svg";
import worksiteArrow from "../../../assets/worksite-arrow.svg";
import companyArrow from "../../../assets/company-arrow.svg";

const orgArrowIcon = {
  agency: agencyArrow,
  payroll: payrollArrow,
  worksite: worksiteArrow,
  company: companyArrow,
};

// gets all organisations from db
export const axiosCall = async () => {
  const response = await axios.get(API_SEARCH_URL);
  return response;
};

export default class Search extends Component {
  state = {
    isLoading: false,
    searchData: null,
    showOtherSections: true,
    category: "agency",
  };

  componentDidMount() {
    const { isLoggedIn, match } = this.props;
    const { category } = match.params;

    axiosCall().then(({ data: [{ searchData }] }) => {
      this.setState({
        searchData,
        isLoading: true,
        category,
      });

      // ---------------------   keeeeeep this -------------------
      // if (target === "review" && isLoggedIn) {
      //   axios
      //     .get(API_GET_LAST_30D_ORGANISATIONS_IDS)
      //     .then(({ data: { orgsIds } }) => {
      //       this.setState({ orgsIds });
      //     })
      //     .catch(err => {
      //       const error =
      //         err.response && err.response.data && err.response.data.error;
      //       message.error(error || "Something went wrong");
      //     });
      // }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.props.match.params;
    if (prevState.category !== category) {
      this.setState({
        category,
      });
    }
  }

  // renders last viewed organization section
  // renderLastViewed = (org, key, target) => {
  //   const { orgsIds } = this.state;

  //   const url =
  //     target !== "review"
  //       ? `/profile/${org._id}`
  //       : `/organization/${org._id}/review`;

  //   const disabled =
  //     target === "review" && orgsIds && orgsIds.includes(org._id);

  //   return (
  //     <PopOverWrapper disabled>
  //       <ProfileLink
  //         key={key}
  //         to={disabled ? "#" : url}
  //         as={disabled ? "div" : undefined}
  //       >
  //         <ReviewsFrame orgType={org.category}>
  //           <InnerDivLastReviews orgType={org.category}>
  //             <SymbolDiv>
  //               <Icon
  //                 icon={org.category}
  //                 height="1.5rem"
  //                 width="1.5rem"
  //                 margin="0 1rem 0 0"
  //               />
  //             </SymbolDiv>
  //             <OrganisationDetailsDiv>
  //               <h3
  //                 style={{
  //                   color: organizations[org.category].primary,
  //                   textTransform: "capitalize",
  //                 }}
  //               >
  //                 {org.name}
  //               </h3>
  //               <ReviewDetailsDiv>
  //                 <Rate
  //                   disabled
  //                   value={org.avgRatings || org.value}
  //                   style={{
  //                     color: `${organizations[org.category].primary}`,
  //                     fontSize: "0.75rem",
  //                   }}
  //                   className="last-reviewed-star-rate"
  //                 />
  //                 <p>{org.totalReviews} reviews</p>
  //               </ReviewDetailsDiv>
  //             </OrganisationDetailsDiv>
  //             <ArrowDiv>
  //               <img src={orgArrowIcon[org.category]} alt="" />
  //             </ArrowDiv>
  //           </InnerDivLastReviews>
  //         </ReviewsFrame>
  //       </ProfileLink>
  //     </PopOverWrapper>
  //   );
  // };

  // functions to detect if user clicks outside search box
  // if clicked inside => don't show other sections

  render() {
    const {
      isLoading,
      searchData,
      showOtherSections,
      category,
      orgsIds,
    } = this.state;
    const { isMobile, isTablet } = this.props;

    return (
      <SearchWrapper data-testid="searchwrapper" isMobile={isMobile}>
        <Header
          orgsIds={orgsIds}
          isMobile={isMobile}
          isTablet={isTablet}
          data={searchData}
          category={category}
        />
        {/* <HeadlineDiv>
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
        </HeadlineDiv> */}

        {/* <FlexContainer ref={this.setSearchBoxRef}>
          <AutosuggestComponent
            iconTop="20px"
            bool={() => true}
            height="4.5rem"
            width="80%"
            data={data && data[0].searchData}
            placeholderText="Start typing..."
            isMobile={isMobile}
            isTablet={isTablet}
            handleCancelIconClick={this.handleCancelIconClick}
            orgsIds={orgsIds}
            showOtherSections={showOtherSections}
          />
        </FlexContainer> */}

        {/* {showOtherSections && (
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
        )} */}
      </SearchWrapper>
    );
  }
}
