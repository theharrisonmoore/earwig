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
  FBMsgShare
} from "./ThankYou.style";

import whatsAppIcon from "../../../assets/whatsapp-logo.svg";
import facebookMsgIcon from "../../../assets/messenger-logo.svg";
import emailIcon from "../../../assets/email-logo.svg";

export default class ThankYou extends Component {
  facebookMsgShare = referralLink => {
    window.open(
      "fb-messenger://share?link=" +
        encodeURIComponent(referralLink) +
        "&app_id=" +
        encodeURIComponent("earwig-work-2019")
    );
  };
  render() {
    const { state } = this.props.history.location;

    const { orgType } = state && state;

    if (!orgType) {
      return this.props.history.goBack();
    }

    const orgURL =
      state && state.orgId
        ? `${window.location.hostname}/profile/${state.orgId}`
        : `${window.location.hostname}`;

    const orgName = state && state.orgName ? state.orgName : "an organization";

    const img = require(`./../../../assets/thank-you-${orgType}.svg`);

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
              category={orgType}
            >
              <img src={emailIcon} alt="" />
              Email
            </EmailShare>
            <WhatsappShare
              url={orgURL}
              title={`I've reviewed ${orgName} on earwig`}
              separator=": "
              category={orgType}
            >
              <img src={whatsAppIcon} alt="" />
              WhatsApp
            </WhatsappShare>

            <FBMsgShare
              category={orgType}
              onClick={() => this.facebookMsgShare(orgURL)}
            >
              <img src={facebookMsgIcon} alt="" />
              Facebook
            </FBMsgShare>
          </IconWrapper>
          <SharePromo orgType={orgType}>
            Click one of the icons above to share privately with your colleagues
          </SharePromo>
          <StyledLink
            to={`/profile/${this.props.history.location.state.ID}`}
            orgType={orgType}
          >
            Go to the {orgType}'s profile
          </StyledLink>
        </ContentWrapper>
      </ThankYouWrapper>
    );
  }
}
