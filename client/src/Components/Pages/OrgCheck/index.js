import React, { Component } from "react";
import axios from "axios";

// COMMON
import Icon from "./../../Common/Icon/Icon";
import CancelNavbar from "./../../Common/CancelNavbar";
import Loading from "./../../Common/AntdComponents/Loading";
import Button from "./../../Common/Button";

// STYLING
import {
  Wrapper,
  QuestionWrapper,
  QuestionHeader,
  Question,
  StatusButton,
  ConfirmWrapper,
  PurpleDiv,
  ContentWrapper,
  Row,
  OrgText,
  ConfirmQuestion,
  StyledLink
} from "./OrgCheck.style.js";

import { organizations, colors } from "./../../../theme";

// API ROUTES
import {
  API_SEARCH_URL,
  API_SET_ORGS,
  API_GET_USER_ORGS
} from "../../../apiUrls";

// NAV ROUTES
import { WELCOME_URL } from "../../../constants/naviagationUrls";

import AutosuggestComponent from "../../Pages/Search/AutoSuggest";

export const axiosCall = async () => {
  const response = await axios.get(API_SEARCH_URL);
  return response;
};

export default class index extends Component {
  state = {
    fields: {
      agency: "None",
      payroll: "None",
      worksite: "None",
      company: "None"
    },
    signUp: true,
    section: "agency",
    data: null,
    isLoaded: false,
    loggingIn: false,
    updating: true
  };

  componentDidMount() {
    axiosCall()
      .then(organizations => {
        this.setState({
          data: organizations.data,
          isLoaded: true
        });
      })
      .catch(err => {
        this.setState({ isLoaded: true });
        console.log(err);
      });

    // check is logging in on signing up
    const { loggingIn } = this.props;

    if (loggingIn) {
      axios
        .get(API_GET_USER_ORGS)
        .then(({ data }) => {
          const { fields } = this.state;

          const fieldArr = Object.entries(data);
          fieldArr.map(org => (fields[org[0]] = org[1]));
          this.setState({
            fields,
            loggingIn,
            section: "confirm",
            updating: false
          });
        })
        .catch(err => console.log(err));
    }
  }

  sectionChange = direction => {
    const { section } = this.state;
    let newSection;

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

    this.setState({ section: newSection });
  };

  setSectionAsAgency = () => {
    this.setState({ section: "agency", updating: true });
  };

  storeOrg = value => {
    const { section, fields } = this.state;
    fields[section] = value;
    this.setState({ fields });
    this.sectionChange("forward");
  };

  setCurrentOrgs = () => {
    const { fields } = this.state;
    const { history } = this.props;

    // set up object to send to server
    const currentOrgs = {
      currentAgency: fields.agency,
      currentPayroll: fields.payroll,
      currentWorksite: fields.worksite,
      currentCompany: fields.company
    };

    const answers = Object.entries(currentOrgs);

    answers.map(
      answer => answer[1] === "None" && delete currentOrgs[answer[0]]
    );

    axios
      .post(API_SET_ORGS, currentOrgs)
      .then(() => history.push(WELCOME_URL))
      .catch(err => console.log(err));
  };

  nothingToChange = () => {
    const { history } = this.props;
    history.push(WELCOME_URL);
  };

  decideColor = () => {
    const { section } = this.state;
    let color;

    switch (section) {
      case "payroll":
        color = organizations.agency.primary;
        break;
      case "worksite":
        color = organizations.payroll.primary;
        break;
      case "company":
        color = organizations.worksite.primary;
        break;
      case "confirm":
        color = organizations.company.primary;
        break;
      default:
        color = colors.profileFontColor;
    }

    return color;
  };

  render() {
    const { section, isLoaded, data, fields, updating } = this.state;
    const { history } = this.props;

    if (!isLoaded) return <Loading />;
    return (
      <>
        {section !== "agency" && (
          <CancelNavbar
            cancelColor={this.decideColor}
            CancelText={!updating ? " " : "Back"}
            customAction={() => this.sectionChange("back")}
            history={history}
          />
        )}
        {section !== "confirm" ? (
          <Wrapper orgType={section}>
            <QuestionWrapper>
              <QuestionHeader>
                <Icon
                  icon={section}
                  color="white"
                  width="76px"
                  height="76px"
                  margin="0 24px 0 0"
                  alt="icon"
                />
                {["agency", "payroll"].includes(section) && (
                  <Question>Which {section} are you using right now?</Question>
                )}
                {section === "worksite" && (
                  <Question>
                    Which {section} are you working on right now?
                  </Question>
                )}
                {section === "company" && (
                  <Question>
                    Which {section} are you working for right now?
                  </Question>
                )}
              </QuestionHeader>
              <AutosuggestComponent
                iconTop="24px"
                height="4.5rem"
                bool={() => true}
                width="300px"
                data={data[0].searchData.filter(
                  item => item.category === section
                )}
                placeholderText={`Type the name of the ${section}`}
                isButton
                storeOrg={this.storeOrg}
                noIcon
              />
              <StatusButton type="button" onClick={() => this.storeOrg("None")}>
                {section === "agency"
                  ? `I'm not using an agency`
                  : `I'm not using a ${section}`}
              </StatusButton>
            </QuestionWrapper>
            )
          </Wrapper>
        ) : (
          <ConfirmWrapper>
            <PurpleDiv />
            <ContentWrapper>
              <ConfirmQuestion confirm>
                {!updating ? "Still working here?" : "Is this correct?"}
              </ConfirmQuestion>
              <Row orgType="agency">
                <Icon
                  icon="agency"
                  width="1.25rem"
                  height="1.25rem"
                  margin="0 1rem 0 0"
                />
                {fields.agency === "None" ? (
                  <OrgText noOrg>You're not using an agency</OrgText>
                ) : (
                  <OrgText>{fields.agency.name}</OrgText>
                )}
              </Row>
              <Row orgType="payroll">
                <Icon
                  icon="payroll"
                  width="1.25rem"
                  height="1.25rem"
                  margin="0 1rem 0 0"
                />
                {fields.payroll === "None" ? (
                  <OrgText noOrg>You're not using a payroll</OrgText>
                ) : (
                  <OrgText>{fields.payroll.name}</OrgText>
                )}
              </Row>
              <Row orgType="worksite">
                <Icon
                  icon="worksite"
                  width="1.25rem"
                  height="1.25rem"
                  margin="0 1rem 0 0"
                />
                {fields.worksite === "None" ? (
                  <OrgText noOrg>You're not using a worksite</OrgText>
                ) : (
                  <OrgText>{fields.worksite.name}</OrgText>
                )}
              </Row>
              <Row orgType="company">
                <Icon
                  icon="company"
                  width="1.25rem"
                  height="1.25rem"
                  margin="0 1rem 0 0"
                />
                {fields.company === "None" ? (
                  <OrgText noOrg>You're not using a company</OrgText>
                ) : (
                  <OrgText>{fields.company.name}</OrgText>
                )}
              </Row>
              <Button
                left
                onClick={updating ? this.setCurrentOrgs : this.nothingToChange}
              >
                Yep, that's correct
              </Button>
              {!updating && (
                <StyledLink onClick={this.setSectionAsAgency}>
                  No, I need to change something
                </StyledLink>
              )}
            </ContentWrapper>
          </ConfirmWrapper>
        )}
      </>
    );
  }
}
