import React, { Component } from 'react'
import axios from "axios";

// COMMON
import Icon from "./../../Common/Icon/Icon"
import CancelNavbar from "./../../Common/CancelNavbar"
import Loading from "./../../Common/AntdComponents/Loading";
import Button from "./../../Common/Button";

// STYLING
import { Wrapper, QuestionWrapper, QuestionHeader, Question, InputWrapper, StatusButton, ConfirmWrapper, PurpleDiv, ContentWrapper, Row, OrgText, ConfirmQuestion } from "./OrgCheck.style.js"

import { organizations } from "./../../../theme"

// API ROUTES
import { API_SEARCH_URL, API_SET_ORGS } from "../../../apiUrls";

// NAV ROUTES
import { WELCOME_URL } from "../../../constants/naviagationUrls"

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
        case "company":
        newSection = "confirm";
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
        case "confirm":
        newSection = "company";
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

  setCurrentOrgs = () => {
    const { fields } = this.state;
    const { history } = this.props;

    // set up object to send to server
    const currentOrgs = { currentAgency: fields.agency, currentPayroll: fields.payroll, currentWorksite: fields.worksite, currentCompany: fields.company }

    const answers = Object.entries(currentOrgs)

    answers.map(answer => answer[1] === "None" && delete currentOrgs[answer[0]])

    axios.post(API_SET_ORGS, currentOrgs).then(() => history.push(WELCOME_URL)).catch(err => console.log(err))
  }

  render() {
    const { section, isLoaded, data, fields } = this.state
    const { history } = this.props;

    if (!isLoaded) return <Loading />;
    return (
      <>
        {section !== "agency" && <CancelNavbar CancelText="Back" customAction={() => this.sectionChange("back")} history={history} />}
       {section != "confirm" ? (<Wrapper orgType={section}>
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
         </QuestionWrapper>)
      </Wrapper> ): (
        <ConfirmWrapper>
          <PurpleDiv />
          <ContentWrapper>
            <ConfirmQuestion confirm>Is this correct?</ConfirmQuestion>
            <Row orgType="agency">
              <Icon icon="agency" width="1.25rem" height="1.25rem" margin="0 1rem 0 0"/>
              {fields.agency === "None" ? (
                <OrgText noOrg>You're not using an agency</OrgText>
              ) : (
                <OrgText>{fields.agency.name}</OrgText>
              )}
            </Row>
            <Row orgType="payroll">
              <Icon icon="payroll" width="1.25rem" height="1.25rem" margin="0 1rem 0 0"/>
              {fields.payroll === "None" ? (
                <OrgText noOrg>You're not using a payroll</OrgText>
              ) : (
                <OrgText>{fields.payroll.name}</OrgText>
              )}
            </Row>
            <Row orgType="worksite">
              <Icon icon="worksite" width="1.25rem" height="1.25rem" margin="0 1rem 0 0"/>
              {fields.worksite === "None" ? (
                <OrgText noOrg>You're not using a worksite</OrgText>
              ) : (
                <OrgText>{fields.worksite.name}</OrgText>
              )}
            </Row>
            <Row orgType="company">
              <Icon icon="company" width="1.25rem" height="1.25rem" margin="0 1rem 0 0"/>
              {fields.company === "None" ? (
                <OrgText noOrg>You're not using a company</OrgText>
              ) : (
                <OrgText>{fields.company.name}</OrgText>
              )}
            </Row>
            <Button left onClick={this.setCurrentOrgs}>Yep, that's correct</Button>
          </ContentWrapper>
        </ConfirmWrapper>
         )}
      </>
    )
  }
}
