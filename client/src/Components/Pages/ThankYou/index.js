/** directions:
 * to redirect to to this page
 * add orgType in the Link state
 *  <Link
 *    to={{ pathname: "thank-you", state: { orgType: "worksite" } }}
 *  >
 *    TEST
 *  </Link>
 *
 * */

import React, { Component } from "react";

import { EmailIcon, WhatsappIcon, TelegramIcon } from "react-share";

import { organizations } from "./../../../theme";

import {
  ThankYouWrapper,
  ContentWrapper,
  Image,
  Heading,
  BoldPargraph,
  SubHeading,
  List,
  IconWrapper,
  SharePromo,
  StyledLink,
  EmailShare,
  WhatsappShare,
  TelegramShare
} from "./ThankYou.style";

export default class ThankYou extends Component {
  render() {
    const { state } = this.props.history.location;

    const orgType = state && this.props.history.location.state.orgType;
    if (!orgType) {
      return this.props.history.goBack();
    }

    const orgURL =
      state && state.orgId
        ? `${window.location.hostname}/profile/${state.orgId}`
        : `${window.location.hostname}`;

    const orgName = state && state.orgName ? state.orgName : "an organization";

    const img = require(`./../../../assets/thank-you-${orgType}.svg`);
    const otherOrgs = ["agency", "worksite", "payroll", "company"].filter(
      org => org !== orgType
    );

    return (
      <ThankYouWrapper>
        <ContentWrapper>
          <Image src={img} />
          <Heading>You did it!</Heading>
          <BoldPargraph>
            Your review will be seen by this {orgType} and other workers who
            rely on reviews like yours
          </BoldPargraph>
          <SubHeading>Each time you give a review, you</SubHeading>
          <List>
            <li>Create awareness</li>

            <li>Improve working conditions</li>

            <li>Help workers feel secure</li>
          </List>
          <IconWrapper>
            <EmailShare
              url={orgURL}
              subject={`I've reviewed ${orgName} on earwig`}
            >
              <EmailIcon
                size={40}
                round
                iconBgStyle={{ fill: organizations[orgType].primary }}
              />
            </EmailShare>
            <WhatsappShare
              url={orgURL}
              title={`I've reviewed ${orgName} on earwig`}
              separator=": "
            >
              <WhatsappIcon
                size={40}
                round
                iconBgStyle={{ fill: organizations[orgType].primary }}
              />
            </WhatsappShare>
            <TelegramShare
              url={orgURL}
              title={`I've reviewed ${orgName} on earwig`}
            >
              <TelegramIcon
                size={40}
                round
                iconBgStyle={{ fill: organizations[orgType].primary }}
              />
            </TelegramShare>
          </IconWrapper>
          <SharePromo orgType={orgType}>
            Click one of the icons above to share privately with your colleagues
          </SharePromo>
          <StyledLink to="search" orgType={orgType}>
            Now review an {otherOrgs[0]}, {otherOrgs[1]} or {otherOrgs[2]}
          </StyledLink>
        </ContentWrapper>
      </ThankYouWrapper>
    );
  }
}
