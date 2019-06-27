import React, { Component } from "react";
import { Rate } from "antd";

import { organizations } from "./../../../theme";

import {
  Wrapper,
  SectionTitle,
  QuestionWrapper,
  QuestionTitle,
  CategoryTitle,
  LightTitle
} from "./ReviewSection.style";



import YesNoAnswer from "./ProfileAnswers/YesNoAnswer.js";
import ListAnswer from "./ProfileAnswers/ListAnswer.js";
import PieAnswer from "./ProfileAnswers/PieAnswer.js";
import ScatterAnswer from "./ProfileAnswers/ScatterAnswer";
import SiteItemAnswer from "./ProfileAnswers/SiteItemAnswer";
import CanteenItemAnswer from "./ProfileAnswers/CanteenItemAnswer";
import BarChartAnswer from "./ProfileAnswers/BarChartAnswer";
import PayrollAnswer from "./ProfileAnswers/PayrollAnswer";
import ImageSlider from "./ProfileAnswers/ImageSlider";

export default class ReviewSection extends Component {
  onlyNeutralAnswers = answers => {
    const yesOrNo = answers.filter(
      answer => answer.answer === "Yes" || answer.answer === "No"
    );
    return yesOrNo.length === 0;
  };

  render() {
    const {
      sectionDetails,
      category,
      toggleComments,
      summary,
      isMobile,
      carParkingPrice
    } = this.props;

    const { _id: sectionTitle, questions } = sectionDetails;

    let canteenQuestions =
      questions &&
      questions.filter(question =>
        ["canteenItem", "canteenSubItem"].includes(
          question.profileType
        )
      );

    if (!canteenQuestions || canteenQuestions.length < 1)
      canteenQuestions = false;

    // if (canteenQuestions && canteenQuestions.length === 1) {
    //   const onlyNeutral = this.onlyNeutralAnswers(canteenQuestions[0].answers);
    //   canteenQuestions = !onlyNeutral;
    // }

    let payrollQuestions =
      questions &&
      questions.filter(question =>
        ["payrollList", "payrollSubList"].includes(
          question.profileType
        )
      );

    if (!payrollQuestions || payrollQuestions.length < 1)
      payrollQuestions = false;

    return (
      // Question - Title, AggregatedAnswer, Comment Box
      <Wrapper>
        <SectionTitle>{sectionTitle}</SectionTitle>
        {sectionTitle === "Key ratings" && (
          <QuestionWrapper>
            <QuestionTitle>
              <CategoryTitle>{category}</CategoryTitle> overall rating
            </QuestionTitle>
            <>
              <Rate
                disabled
                tooltips={["Bad", "Poor", "Average", "Great", "Excellent"]}
                value={summary.avgRatings || summary.value}
                style={{
                  color: `${organizations[summary.category].primary}`,
                  fontSize: `${isMobile ? "2rem" : "3rem"}`
                }}
              />
              <div style={{ dispay: "inline-block" }}>
                {["Bad", "Poor", "Average", "Great", "Excellent"].map(
                  (option, index) => (
                    <span
                      key={index}
                      style={{
                        color: `${
                          index === Math.floor(summary.avgRatings) - 1
                            ? organizations[summary.category].primary
                            : "#e8e8e8"
                        }`,
                        fontWeight: `${
                          index === Math.floor(summary.avgRatings) - 1
                            ? "900"
                            : "500"
                        }`,
                        fontSize: `${isMobile ? "0.6rem" : "0.7rem"}`,
                        width: `${isMobile ? "32px" : "48px"}`,
                        display: "inline-block",
                        textAlign: "center",
                        marginRight: "8px"
                      }}
                    >
                      {option}
                    </span>
                  )
                )}
              </div>
            </>
          </QuestionWrapper>
        )}

        {questions &&
          questions.map(
            (question, index) =>
              [
                "yesno",
                "pieChart",
                "dotChart",
                "barChart",
                "siteItem",
                "canteenItem",
                "payrollList",
                "list"
              ].includes(question.profileType) && (
                <div key={index}>
                  {question.profileType === "yesno" && (
                    <QuestionWrapper
                      key={index}
                      // hide={this.onlyNeutralAnswers(question.answers)}
                    >
                      <QuestionTitle>
                        {question.profileText}
                      </QuestionTitle>
                      {this.onlyNeutralAnswers(question.answers) === false ? <YesNoAnswer
                        category={category}
                        question={question}
                        toggleComments={toggleComments}
                        isMobile={isMobile}
                      /> : <LightTitle><p>No answers yet</p></LightTitle>}

                    </QuestionWrapper>
                  )}
                  {question.profileType === "pieChart" && (
                    <QuestionWrapper key={index}>
                      <QuestionTitle>
                        {question.profileText}
                      </QuestionTitle>
                      {question.answers.length > 0 ? <PieAnswer
                        category={category}
                        question={question}
                        toggleComments={toggleComments}
                        isMobile={isMobile}
                      /> : <LightTitle><p>No answers yet</p></LightTitle>}
                    </QuestionWrapper>
                  )}
                  {question.profileType === "dotChart" && (
                    <QuestionWrapper key={index}>
                      <QuestionTitle>
                        {question.profileText}
                      </QuestionTitle>
                      {question.answers.length > 0 ? <ScatterAnswer
                        category={category}
                        question={question}
                        toggleComments={toggleComments}
                        isMobile={isMobile}
                      /> : <LightTitle><p>No answers yet</p></LightTitle>}
                    </QuestionWrapper>
                  )}
                  {question.profileType === "barChart" && (
                    <QuestionWrapper key={index}>
                      <QuestionTitle>
                        {question.profileText}
                      </QuestionTitle>
                      {question.answers.length > 0 ? <BarChartAnswer category={category} question={question} /> : <LightTitle><p>No answers yet</p></LightTitle>}
                    </QuestionWrapper>
                  )}
                  {question.profileType === "siteItem" && (
                    <QuestionWrapper
                      key={index}
                      hide={this.onlyNeutralAnswers(question.answers)}
                    >
                      {question.answers.length > 0 ? <SiteItemAnswer
                        category={category}
                        question={question}
                        toggleComments={toggleComments}
                        profileType={question.profileType}
                        isMobile={isMobile}
                        carParkingPrice={carParkingPrice}
                      /> : <LightTitle><p>No answers yet</p></LightTitle>}
                    </QuestionWrapper>
                  )}
                  {question.profileType === "canteenItem" && (
                    <div key={index}>
                      {/* CANTEEN SECTION */}
                      {canteenQuestions && (
                        <>
                        {question.answers.length > 0 && <QuestionWrapper>
                          {/* {console.log(canteenQuestions)} */}
                           <CanteenItemAnswer
                            questions={canteenQuestions}
                            toggleComments={toggleComments}
                            isMobile={isMobile}
                          />
                          </QuestionWrapper>
                          }
                        </>


                      )}
                    </div>
                  )}
                  {question.profileType === "payrollList" && (
                    <div key={index}>
                      {/* PAYROLL LIST */}
                      {payrollQuestions && (
                        <QuestionWrapper >
                          <QuestionTitle>
                            Pays using the following payrolls
                          </QuestionTitle>
                          {question.answers.length > 0 ? <PayrollAnswer
                            questions={payrollQuestions}
                            toggleComments={toggleComments}
                            isMobile={isMobile}
                          /> : <LightTitle><p>No answers yet</p></LightTitle>}
                        </QuestionWrapper>
                      )}
                    </div>
                  )}
                  {question.profileType === "list" && (
                    <QuestionWrapper key={index}>
                      <QuestionTitle>
                        {question.profileText}
                      </QuestionTitle>
                      {question.answers.length > 0 ? <ListAnswer
                        category={category}
                        question={question}
                        toggleComments={toggleComments}
                        isMobile={isMobile}
                      /> : <LightTitle><p>No answers yet</p></LightTitle>}
                    </QuestionWrapper>
                  )}
                </div>
              )
          )}

        {/* site images */}
        {questions &&
          questions
            .filter(question => question.type === "image")
            .map((question, index) => {
              return (
                <QuestionWrapper key={question._id}>
                  <QuestionTitle>{question.profileText}</QuestionTitle>
                  {question.answers.length > 0 ? <ImageSlider
                    category={category}
                    question={question}
                    organization={summary}
                  /> : <LightTitle><p>No images yet</p></LightTitle>}
                </QuestionWrapper>
              );
            })}
      </Wrapper>
    );
  }
}
