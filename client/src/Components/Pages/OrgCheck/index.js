import React, { Component } from 'react'

// COMMON
import Icon from "./../../Common/Icon/Icon"
import CancelNavbar from "./../../Common/CancelNavbar"

// STYLING
import { Wrapper, QuestionWrapper, QuestionHeader, Question, InputWrapper, StatusButton } from "./OrgCheck.style.js"

export default class index extends Component {
  state = {
    agency: "",
    payroll: "",
    worksite: "",
    company: "",
    signUp: true,
    section: "agency"
  }

  sectionChange = (direction) => {
    const { section } = this.state
    let newSection 

    if (direction === "forward") {
      switch (section) {
        case "agency":
        newSection = "payroll";
        break;
        case "payroll":
        newSection = "worksite";
        break;
        case "worksite":
        newSection = "company";
        break;
        default:
        newSection = section;
      }
    } else {
      switch (section) {
        case "payroll":
        newSection = "agency";
        break;
        case "worksite":
        newSection = "payroll";
        break;
        case "company":
        newSection = "worksite";
        break;
        default:
        newSection = section;
      }
    }

    this.setState({ section: newSection })
  }

  render() {
    const { section } = this.state
    return (
      <Wrapper orgType={section}>

        <QuestionWrapper>
          <QuestionHeader>
            <Icon icon={section} color="white" width="76px" height="76px" margin="0 24px 0 0" alt="icon" />
            {["agency", "payroll"].includes(section) && <Question>Which {section} are you using right now?</Question>}
            {section === "worksite" && <Question>Which {section} are you working on right now?</Question>}
            {section === "company" && <Question>Which {section} are you working for right now?</Question>}
          </QuestionHeader>
          <InputWrapper type="text" placeholder={`Type the name of the ${section}`} />
          <StatusButton type="button" onClick={() =>this.sectionChange("forward")}>{section === "agency" ? `I'm not using an agency` : `I'm not using a ${section}` }</StatusButton>
         </QuestionWrapper>
      </Wrapper>
    )
  }
}
