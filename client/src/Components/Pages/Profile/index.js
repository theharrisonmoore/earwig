import React, { Component } from "react";
import axios from "axios";
import { message, Skeleton } from "antd";

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
    commentsOpen: false,
    commentsQuestion: null,
    comments: null,
    commentsLoaded: false,
    organizationID: "",
    overallReplies: [],
    activeOverallId: "",
    contractorAnswers: [],
    reviewsLast30Days: [],
    FilteredReviewMonths: [],
    activeTab: "overview",
  };

  myDivToFocus = React.createRef();

  setActiveTab = e => {
    const { tab } = e.target.dataset;
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
        const FilteredReviewMonths = reviews.filter(review => {
          return review.user && review.user.verified;
        });

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
    const organizationID = window.location.href.split("/")[4];

    axios.post("/api/update-last-viewed", { id: organizationID }).catch(err => {
      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || "Something went wrong");
    });
  };

  componentDidMount() {
    this.fetchData();
    this.updateLastViewed();
  }

  componentDidUpdate(prevProps) {
    const { profileID: prevProfileID } = prevProps.match.params;
    const { profileID: currentProfileID } = this.props.match.params;
    if (prevProfileID !== currentProfileID) {
      this.fetchData();
    }
  }

  // comments are disabled (will keep this until the testing finish)
  toggleComments = question => {
    const { commentsOpen } = this.state;
    // reset loading state and toggle comments box
    this.setState({ commentsLoaded: false, commentsOpen: !commentsOpen });
    this.fetchComments(question);
  };

  fetchComments = question => {
    const { summary } = this.state;
    const { _id: organizationID } = summary;
    const { _id: questionID } = question;

    // fetch comments
    axios
      .post("/api/comments", { organizationID, questionID })
      .then(res => {
        this.setState({
          comments: res.data,
          commentsLoaded: true,
          commentsQuestion: question,
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

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
    } = this.state;

    const {
      isTablet,
      isMobile,
      verified,
      isAdmin,
      id,
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
              summary={summary}
              level={level}
              reviewsLast30Days={reviewsLast30Days}
              handleScroll={this.handleScroll}
              orgId={organizationID}
              contractorAnswers={contractorAnswers}
              awaitingReview={awaitingReview}
              FilteredReviewMonths={FilteredReviewMonths}
              activeTab={activeTab}
              setActiveTab={this.setActiveTab}
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
            />
          ) : (
            <DetailedSection
              level={level}
              isMobile={isMobile}
              isTablet={isTablet}
              reviewDetails={reviewDetails}
              summary={summary}
            />
          )}
        </Wrapper>
      </Layout>
    );
  }
}
