import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import OrganisationsList from "./OrganisationsList";

import { sortAndCategorizeOrgs } from "../../../helpers";

import Layout from "../../Common/Layout";

import { API_SEARCH_URL } from "../../../apiUrls";

// styles
import { SearchWrapper } from "./Search.style";

// gets all organisations from db
export const axiosCall = async (category) => {
  const response = await axios.get(
    API_SEARCH_URL.replace(":category", category),
  );
  return response;
};

export default class Search extends Component {
  state = {
    searchData: {
      worksite: [],
      payroll: [],
      company: [],
      agency: [],
    },
    category: "agency",
    sortedOrgs: {
      worksite: [],
      payroll: [],
      company: [],
      agency: [],
    },
    recentReviewsDump: {
      worksite: [],
      payroll: [],
      company: [],
      agency: [],
    },
    recentReviews: {
      worksite: [],
      payroll: [],
      company: [],
      agency: [],
    },

    activeTab: "recent",
  };

  componentDidMount() {
    const { match } = this.props;
    const { category = "agency" } = match.params;

    this.fetchOrgs(category);
  }

  componentDidUpdate(prevProps, prevState) {
    const { category = "agency" } = this.props.match.params;
    const { loading } = this.state;
    if (prevState.category !== category && !loading) {
      this.setState({ activeTab: "all" }, () => {
        this.fetchOrgs(category);
      });
    }
  }

  fetchOrgs = (category = "agency") => {
    const { searchData } = this.state;
    this.setState({ loading: true, category }, () => {
      if (!searchData[category].length) {
        axiosCall(category)
          .then(({ data: [{ searchData: newData, lastReviewed }] }) => {
            const sortedOrgs = sortAndCategorizeOrgs(newData);
            const lastReviewedOrgs = lastReviewed.map(
              (org) => org.lastReviewed,
            );

            this.setState((prevState) => {
              return {
                searchData: { ...prevState.searchData, [category]: newData },
                category,
                sortedOrgs: {
                  ...prevState.sortedOrgs,
                  [category]: sortedOrgs,
                },
                recentReviewsDump: {
                  ...prevState.lastReviewedOrgs,
                  [category]: lastReviewedOrgs,
                },
              };
            });
          })
          .finally(() => {
            this.filterRecentReviews();
            this.setState({ loading: false });
          });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  setActiveTab = (e) => {
    const { tab } = e.target.dataset;
    this.setState({ activeTab: tab });
  };

  filterRecentReviews = () => {
    const { category, recentReviews, recentReviewsDump } = this.state;

    if (recentReviewsDump[category] && recentReviewsDump[category].length) {
      this.setState({
        recentReviews: {
          ...recentReviews,
          [category]: recentReviewsDump[category],
        },
      });
    }
  };

  render() {
    const { searchData, loading, activeTab, recentReviews } = this.state;

    const { isMobile, isTablet, match } = this.props;
    const { category = "agency" } = match.params;
    return (
      <Layout type="center">
        <SearchWrapper data-testid="searchwrapper" isMobile={isMobile}>
          <Header
            isMobile={isMobile}
            isTablet={isTablet}
            data={searchData[category]}
            category={category}
            activeTab={activeTab}
            setActiveTab={this.setActiveTab}
          />

          <OrganisationsList
            sortedOrgs={recentReviews[category]}
            loading={loading}
            category={category}
            recentReviews
          />
        </SearchWrapper>
      </Layout>
    );
  }
}
