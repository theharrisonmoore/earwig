import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { message, Skeleton } from "antd";

import DetailedAnswers from "./DetailedAnswers";
import SignUpSection from "./SignUpSection";
import Level0Promo from "./Level0Promo";

// import MonthlyReviews from "./ProfileAnswers/MonthlyReviews";
import CommentsBox from "./ProfileAnswers/CommentsBox";
import HeaderSection from "./HeaderSection";
import OverallReview from "./OverallReview";
// import Loading from "./../../Common/AntdComponents/Loading";

import Layout from "../../Common/Layout";

import { Wrapper, ReviewDiv } from "./Profile.style";
import OrganisationDetails from "./OrganisationDetails";

export default class Profile extends Component {
  state = {
    summary: [],
    reviewDetails: [],
    loaded: false,
    commentsOpen: false,
    commentsQuestion: null,
    comments: null,
    commentsLoaded: false,
    level: 0,
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
        const { summary, reviewDetails, level, reviewsLast30Days } = res.data;

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
          const [worksiteQuestionsGroup] = reviewDetails.filter(
            group => group._id === "Working on the site"
          );
          const [contractorQuestion] = worksiteQuestionsGroup.questions.filter(
            question => question.text === "Who was the main contractor on site?"
          );
          // question => question.text === "Who is the main contractor on site?"
          const orderedAnswers = contractorQuestion.answers.sort(
            (a, b) =>
              moment(a.updatedAt).valueOf() - moment(b.updatedAt).valueOf()
          );
          contractorAnswers = orderedAnswers.map(item => item.answer);
        }

        this.setState({
          summary: summary[0],
          reviewDetails,
          level,
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

  getCarCost = () => {
    const { reviewDetails } = this.state;

    // get the car parking cost question
    const carSection = reviewDetails
      .filter(section => section._id === null)
      .map(item =>
        item.questions.filter(
          question => question.text === "How much did car parking cost per day?"
        )
      );

    if (!carSection || carSection.length < 1) return "N/A";

    // work out the average cost from the answers
    const costsArr = carSection[0][0].answers.map(answer => answer.answer);

    const average =
      costsArr.reduce((accum, curr) => {
        return accum + curr;
      }, 0) / costsArr.length;

    if (average > 0) {
      if (Number.isInteger(average)) {
        return average;
      }
      return average.toFixed(2);
    }
    return "Free";
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

  reviewsByMonth = () => {
    const { FilteredReviewMonths } = this.state;

    const reviewMonths = FilteredReviewMonths.map(review => {
      return moment(review.createdAt).format("MMM");
    });

    const reviewMonthsCount = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    if (FilteredReviewMonths.length === 0) return reviewMonthsCount;

    reviewMonths.forEach(month => {
      reviewMonthsCount[month] += 1;
    });

    return reviewMonthsCount;
  };

  render() {
    const {
      summary,
      reviewDetails,
      loaded,
      commentsOpen,
      commentsQuestion,
      comments,
      commentsLoaded,
      level,
      reviewsLast30Days,
      contractorAnswers,
      FilteredReviewMonths,
      organizationID,
    } = this.state;

    const {
      isTablet,
      isMobile,
      verified,
      isAdmin,
      id,
      awaitingReview,
      history,
      location,
    } = this.props;

    // if (!loaded) return <Loading />;

    const { category, name, phoneNumber, email, websiteUrl } =
      summary && summary;
    return (
      <Layout type="center">
        <Wrapper isMobile={isMobile}>
          <Skeleton loading={!loaded}>
            <HeaderSection
              isTablet={isTablet}
              isMobile={isMobile}
              summary={summary}
              level={level}
              location={location}
              reviewsLast30Days={reviewsLast30Days}
              handleScroll={this.handleScroll}
              orgId={organizationID}
              contractorAnswers={contractorAnswers}
              awaitingReview={awaitingReview}
              FilteredReviewMonths={FilteredReviewMonths}
              setActiveTab={this.setActiveTab}
            />
          </Skeleton>
          {/* ORGANISATION INFORMATION AND CONTACT DETAILS */}

          <OrganisationDetails
            isMobile={isMobile}
            isTablet={isTablet}
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            websiteUrl={websiteUrl}
            summary={summary}
            category={category}
          />
          {/* BASIC VIEW FOR LOGGED OUT USERS */}
          <Skeleton loading={!loaded}>
            {level < 1 && (
              <Level0Promo
                isMobile={isMobile}
                isTablet={isTablet}
                category={category}
                summary={summary}
                loaded={loaded}
                location={location}
              />
            )}

            {level > 0 && (
              <DetailedAnswers
                isTablet={isTablet}
                isMobile={isMobile}
                reviewDetails={reviewDetails}
                category={category}
                summary={summary}
                toggleComments={this.toggleComments}
                getCarCost={this.getCarCost}
              />
            )}

            {/* OVERALL RATINGS SECTION */}
            {/* HIDDEN DIV TO SCROLL SECTION INTO VIEW */}
            <div ref={this.myDivToFocus} />
            <OverallReview
              summary={summary}
              isTablet={isTablet}
              isMobile={isMobile}
              category={category}
              activeOverallId={this.state.activeOverallId}
              overallReplies={this.state.overallReplies}
              fetchOverallReplies={this.fetchOverallReplies}
              verified={verified}
              level={level}
              isAdmin={isAdmin}
              orgId={organizationID}
              id={id}
              awaitingReview={awaitingReview}
              FilteredReviewMonths={FilteredReviewMonths}
              history={history}
              location={location}
              loaded={loaded}
            />
            {level < 1 && (
              <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
                <SignUpSection category={category} location={location} />
              </ReviewDiv>
            )}
            {/* COMMENTS BOX */}
            {commentsOpen && (
              <CommentsBox
                organization={summary}
                question={commentsQuestion}
                comments={comments}
                commentsLoaded={commentsLoaded}
                toggleComments={this.toggleComments}
                isMobile={isMobile}
                fetchComments={this.fetchComments}
                category={category}
                verified={verified}
                isAdmin={isAdmin}
              />
            )}
          </Skeleton>
        </Wrapper>
      </Layout>
    );
  }
}
