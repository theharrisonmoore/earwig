import React, { Component } from "react";

import QuestionOptions from "./Options";
import PopoverComponent from "./../../../Common/Popover";
import { QuestionWrapper, QText, HintText } from "./Question.style";

import UploadAudio from "./UploadAudio";

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
      next
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
      id
    } = this.props;

    const popoverOptions = {
      text:
        "We’re asking this because it will be useful to track over time how much agencies are paying workers",
      linkText: "Why are we asking this?"
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
          <UploadAudio
            recording={recording}
            stopRecord={stopRecord}
            startRecord={startRecord}
            handleRecord={handleRecord}
            id={id}
          />
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
