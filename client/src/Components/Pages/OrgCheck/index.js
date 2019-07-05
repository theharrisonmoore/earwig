import React, { Component } from 'react'
import axios from "axios";

// COMMON
import Icon from "./../../Common/Icon/Icon"
import CancelNavbar from "./../../Common/CancelNavbar"
import Loading from "./../../Common/AntdComponents/Loading";

// STYLING
import { Wrapper, QuestionWrapper, QuestionHeader, Question, InputWrapper, StatusButton } from "./OrgCheck.style.js"

// API ROUTES
import { API_SEARCH_URL } from "../../../apiUrls";

import AutosuggestComponent from "../../Pages/Search/AutoSuggest";

export const axiosCall = async () => {
  const response = await axios.get(API_SEARCH_URL);
  return response;
};

export default class index extends Component {
  state = {
    fields: {},
    signUp: true,
    section: "agency",
    data: null, 
    isLoaded: false,
  }

  componentDidMount() {
    axiosCall().then(organizations => {
      this.setState({
        data: organizations.data,
        isLoaded: true
      });
    }).catch(err => {
      this.setState({ isLoaded: true })
      console.log(err)
    });
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

  storeOrg = value => {
    const { section, fields } = this.state;
    fields[section] = value
    this.setState({fields})
    this.sectionChange("forward")
  }

  render() {
    const { section, isLoaded, data, fields } = this.state

    if (!isLoaded) return <Loading />;
    return (
      <Wrapper orgType={section}>
        <QuestionWrapper>
          <QuestionHeader>
            <Icon icon={section} color="white" width="76px" height="76px" margin="0 24px 0 0" alt="icon" />
            {["agency", "payroll"].includes(section) && <Question>Which {section} are you using right now?</Question>}
            {section === "worksite" && <Question>Which {section} are you working on right now?</Question>}
            {section === "company" && <Question>Which {section} are you working for right now?</Question>}
          </QuestionHeader>
          <AutosuggestComponent
              iconTop="24px"
              height="4.5rem"
              bool={() => true}
              width="300px"
              data={data[0].searchData.filter(item => item.category === section)}
              placeholderText={`Type the name of the ${section}`}
              isButton
              storeOrg={this.storeOrg}
              noIcon
            />
          <StatusButton type="button" onClick={() =>this.storeOrg("None")}>{section === "agency" ? `I'm not using an agency` : `I'm not using a ${section}` }</StatusButton>
         </QuestionWrapper>
      </Wrapper>
    )
  }
}
