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

import { isMobileDevice } from "../../../helpers";

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
  FbShare,
} from "./ThankYou.style";

import whatsAppIcon from "../../../assets/whatsapp-logo.svg";
import facebookMsgIcon from "../../../assets/messenger-logo.svg";
import emailIcon from "../../../assets/email-logo.svg";

export default class ThankYou extends Component {
  fbSendBrowser = referralLink => {
    if (isMobileDevice.any()) {
      window.open(
        `fb-messenger://share?link=${encodeURIComponent(
          referralLink
        )}&app_id=${encodeURIComponent("1065819443628486")}`
      );
    } else {
      // eslint-disable-next-line no-undef
      FB.ui({
        method: "send",
        link: referralLink,
      });
    }
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

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const img = require(`./../../../assets/thank-you-${orgType}.svg`);

    return (
      <ThankYouWrapper>
        <ContentWrapper>
          <Image src={img} />
          <Heading>You did it!</Heading>
          <BoldPargraph>
            Your review will be seen by everyone in the industry and other
            workers who rely on reviews like yours
          </BoldPargraph>

          <BoldPargraph>
            <strong>
              Don’t worry, only your earwig Username is visible beside your
              review
            </strong>
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

            <FbShare
              category={orgType}
              onClick={() => this.fbSendBrowser(orgURL)}
            >
              <img src={facebookMsgIcon} alt="" />
              Facebook
            </FbShare>
          </IconWrapper>
          <SharePromo orgType={orgType}>
            Click one of the icons above to share privately with your colleagues
          </SharePromo>
          <StyledLink to={`/profile/${state.orgId}`} orgType={orgType}>
            Go to the {orgType}&apos;s profile
          </StyledLink>
        </ContentWrapper>
      </ThankYouWrapper>
    );
  }
}
