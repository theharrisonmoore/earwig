import React, { Component } from "react";

import QuestionOptions from "./Options";
import PopoverComponent from "../../../Common/Popover";
import { QuestionWrapper, QText, HintText } from "./Question.style";

import { isIphone } from "../../../../helpers/index";

import UploadAudio2 from "./NewUploadAudio";

import UploadAudio3 from "./UploadAudio3";

class Question extends Component {
  render() {
    if (!this.props) {
      return null;
    }

    const {
      text,
      hintText,
      options,
      number,
      type,
      category,
      name,
      label,
      hasComment,
      next,
    } = this.props.question;

    const {
      questions,
      values,
      errors,
      setFieldValue,
      dropdownOptions,
      showNextQestion,
      groupId,
      handleChange,
      handleSliderChange,
      recording,
      startRecord,
      stopRecord,
      handleRecord,
      handleAddNewOrgChange,
      id,
      voiceReviewUrl,
    } = this.props;

    const popoverOptions = {
      text:
        "We’re asking this because it will be useful to track over time how much agencies are paying workers",
      linkText: "Why are we asking this?",
    };

    return (
      <QuestionWrapper>
        <QText>{text}</QText>
        <HintText>{hintText}</HintText>
        {text === "What hourly rate were you paid?" && (
          <PopoverComponent
            category={category}
            popoverOptions={popoverOptions}
          />
        )}
        {type === "voiceReview" && (
          <div>
            {isIphone() ? (
              <UploadAudio3
                recording={recording}
                stopRecord={stopRecord}
                startRecord={startRecord}
                handleRecord={handleRecord}
                id={id}
                voiceReviewUrl={voiceReviewUrl}
              />
            ) : (
              <UploadAudio2
                recording={recording}
                stopRecord={stopRecord}
                startRecord={startRecord}
                handleRecord={handleRecord}
                id={id}
                voiceReviewUrl={voiceReviewUrl}
              />
            )}
          </div>
        )}
        <QuestionOptions
          type={type}
          options={options}
          groupId={groupId}
          showNextQestion={showNextQestion}
          next={next}
          number={number}
          category={category}
          name={name}
          questions={questions}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
          dropdownOptions={dropdownOptions}
          label={label}
          hasComment={hasComment}
          handleChange={handleChange}
          handleSliderChange={handleSliderChange}
          question={this.props.question}
          state={this.props.state}
          runValidation={this.props.runValidation}
          handleReviewChange={this.props.handleReviewChange}
          handleAddNewOrgChange={handleAddNewOrgChange}
        />
      </QuestionWrapper>
    );
  }
}

export default Question;
