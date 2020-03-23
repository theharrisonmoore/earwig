/* eslint-disable no-param-reassign */
import React, { Component } from "react";
import axios from "axios";
import { message, Skeleton, Popover } from "antd";

import HeaderSection from "./HeaderSection";
import OverviewSection from "./OverviewSection";
import DetailedSection from "./DetailedSection";

// import Loading from "./../../Common/AntdComponents/Loading";

import Layout from "../../Common/Layout";
import { Wrapper } from "./Profile.style";

import { getContractorsFromReviews } from "./utils";

export default class Profile extends Component {
  state = {
    summary: [],
    reviewDetails: [],
    loaded: false,
    organizationID: "",
    overallReplies: [],
    activeOverallId: "",
    contractorAnswers: [],
    reviewsLast30Days: [],
    FilteredReviewMonths: [],
    activeTab: "overview",
    updatedUsers: {},
    counters: {
      overallReview: {},
      voiceReview: {},
      comment: {},
    },
  };

  updateUserPoints = ({ userId, points, helpedUsers }) => {
    this.setState(prevState => ({
      updatedUsers: {
        ...prevState.updatedUsers,
        [userId]: {
          helpedUsers,
          points,
        },
      },
    }));
  };

  getUserVotesOnProfile = () => {
    const { id, match } = this.props;
    const { profileID } = match.params;
    axios
      .get(`/api/users/${id}/profile/${profileID}/votes`)
      .then(({ data }) => {
        const newCounters = data.reduce(
          (prev, currReview) => {
            if (currReview.target === "voiceReview") {
              prev.voiceReview[currReview.review] = {
                counter: currReview.points,
                sentNumber: currReview.points,
                byUser: false,
              };
            } else if (currReview.target === "overallReview") {
              prev.overallReview[currReview.review] = {
                counter: currReview.points,
                sentNumber: currReview.points,
                byUser: false,
              };
            } else if (currReview.target === "comment") {
              prev.comment[currReview.comment] = {
                counter: currReview.points,
                sentNumber: currReview.points,
                byUser: false,
              };
            }
            return prev;
          },
          { overallReview: {}, voiceReview: {}, comment: {} },
        );
        this.setState({
          counters: newCounters,
        });
      });
  };

  setCounters = (counters, cb) => {
    this.setState({ counters }, cb);
  };

  myDivToFocus = React.createRef();

  setActiveTab = e => {
    const { tab } = e.target.dataset;
    const { level } = this.props;
    // if level 0 then show pop up instead
    if (level === 0) {
      return null;
    }
    this.setState({ activeTab: tab });
  };

  handleScroll = () => {
    if (this.myDivToFocus.current) {
      this.myDivToFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  fetchData = () => {
    const organizationID = window.location.href.split("/")[4];

    axios
      .get(`/api/profile/${organizationID}`)
      .then(res => {
        const { summary, reviewDetails, reviewsLast30Days } = res.data;

        const { reviews } = summary[0];

        // filter the reviews on user state
        const FilteredReviewMonths = reviews;
        // COMMENTED_VERIFICATION_CHECK
        // const FilteredReviewMonths = reviews.filter(review => {
        // return review.user && review.user.verified;
        // });

        let contractorAnswers = [];
        if (
          summary[0] &&
          summary[0].category === "worksite" &&
          reviewDetails.length
        ) {
          contractorAnswers = getContractorsFromReviews(reviewDetails);
        }

        this.setState({
          summary: summary[0],
          reviewDetails,
          loaded: true,
          organizationID,
          contractorAnswers,
          reviewsLast30Days,
          FilteredReviewMonths,
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  updateLastViewed = () => {
    const rawOrgId = window.location.href.split("/")[4];

    // remove FB tag if added
    const organizationID = rawOrgId.split("?")[0];

    axios.post("/api/update-last-viewed", { id: organizationID }).catch(err => {
      const error =
        err.response && err.response.data && err.response.data.error;
      // eslint-disable-next-line no-console
      return console.error("error", error || "Something went wrong");
    });
  };

  componentDidMount() {
    this.fetchData();
    this.updateLastViewed();
    this.getUserVotesOnProfile();

    const { history } = this.props;
    const { location } = history;

    if (location && location.state && location.state.activeTab) {
      this.setState({ activeTab: location.state.activeTab });
    }
  }

  componentDidUpdate(prevProps) {
    const { profileID: prevProfileID } = prevProps.match.params;
    const { profileID: currentProfileID } = this.props.match.params;
    if (prevProfileID !== currentProfileID) {
      this.fetchData();
      this.getUserVotesOnProfile();
    }
  }

  fetchOverallReplies = (id, target) => {
    if (id && target) {
      axios
        .get(`/api/reviews/${target}/replies/${id}`)
        .then(({ data }) => {
          this.setState({ overallReplies: data, activeOverallId: id });
        })
        .catch(err => {
          const error =
            err.response && err.response.data && err.response.data.error;
          message.error(error || "Something went wrong");
        });
    } else {
      this.setState({ overallReplies: [], activeOverallId: "" });
    }
  };

  render() {
    const {
      summary,
      reviewDetails,
      loaded,
      reviewsLast30Days,
      contractorAnswers,
      FilteredReviewMonths,
      organizationID,
      activeTab,
      activeOverallId,
      overallReplies,
      updatedUsers,
      counters,
    } = this.state;

    const {
      isTablet,
      isMobile,
      verified,
      isAdmin,
      id,
      userId,
      awaitingReview,
      history,
      level,
    } = this.props;

    // if (!loaded) return <Loading />;

    return (
      <Layout type="center">
        <Wrapper isMobile={isMobile} showTabs={level > 0}>
          <Skeleton loading={!loaded}>
            <HeaderSection
              isTablet={isTablet}
              isMobile={isMobile}
              level={level}
              reviewsLast30Days={reviewsLast30Days}
              handleScroll={this.handleScroll}
              orgId={organizationID}
              contractorAnswers={contractorAnswers}
              awaitingReview={awaitingReview}
              FilteredReviewMonths={FilteredReviewMonths}
              activeTab={activeTab}
              setActiveTab={this.setActiveTab}
              summary={summary}
            />
          </Skeleton>
          {activeTab === "overview" ? (
            <OverviewSection
              isMobile={isMobile}
              isTablet={isTablet}
              summary={summary}
              contractorAnswers={contractorAnswers}
              activeOverallId={activeOverallId}
              overallReplies={overallReplies}
              fetchOverallReplies={this.fetchOverallReplies}
              verified={verified}
              level={level}
              isAdmin={isAdmin}
              organizationID={organizationID}
              id={id}
              awaitingReview={awaitingReview}
              FilteredReviewMonths={FilteredReviewMonths}
              history={history}
              loaded={loaded}
              updateUserPoints={this.updateUserPoints}
              updatedUsers={updatedUsers}
              counters={counters}
              setCounters={this.setCounters}
              activeTab={activeTab}
            />
          ) : (
            <DetailedSection
              level={level}
              isMobile={isMobile}
              isTablet={isTablet}
              reviewDetails={reviewDetails}
              summary={summary}
              id={id}
              userId={userId}
              updateUserPoints={this.updateUserPoints}
              updatedUsers={updatedUsers}
              counters={counters}
              setCounters={this.setCounters}
              activeTab={activeTab}
            />
          )}
        </Wrapper>
      </Layout>
    );
  }
}
