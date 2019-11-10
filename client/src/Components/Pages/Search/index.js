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
export const axiosCall = async category => {
  const response = await axios.get(
    API_SEARCH_URL.replace(":category", category)
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
  };

  componentDidMount() {
    const { match } = this.props;
    const { category = "agency" } = match.params;

    this.fetchOrgs(category);

    // axios
    //   .get(API_GET_LAST_30D_ORGANISATIONS_IDS)
    //   .then(({ data: { orgsIds } }) => {
    //     this.setState({ orgsIds });
    //   })
    //   .catch(err => {
    //     const error =
    //       err.response && err.response.data && err.response.data.error;
    //     message.error(error || "Something went wrong");
    //   });
  }

  componentDidUpdate(prevProps, prevState) {
    const { category = "agency" } = this.props.match.params;
    const { loading } = this.state;
    if (prevState.category !== category && !loading) {
      this.fetchOrgs(category);
    }
  }

  fetchOrgs = (category = "agency") => {
    const { searchData } = this.state;
    if (!searchData[category].length) {
      this.setState({ loading: true }, () => {
        axiosCall(category)
          .then(({ data: [{ searchData: newData }] }) => {
            const sortedOrgs = sortAndCategorizeOrgs(newData);

            this.setState(prevState => {
              return {
                searchData: { ...prevState.searchData, [category]: newData },
                category,
                sortedOrgs: { ...prevState.sortedOrgs, [category]: sortedOrgs },
              };
            });
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      });
    }
  };

  render() {
    const { searchData, sortedOrgs, loading } = this.state;
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
          />

          <OrganisationsList
            sortedOrgs={sortedOrgs[category]}
            loading={loading}
          />
        </SearchWrapper>
      </Layout>
    );
  }
}
