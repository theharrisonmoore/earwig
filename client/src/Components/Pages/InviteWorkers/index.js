import React, { Component } from "react";

import whatsAppIcon from "../../../assets/whatsapp-logo.svg";
import facebookMsgIcon from "../../../assets/messenger-logo.svg";
import emailIcon from "../../../assets/email-logo.svg";

import Icon from "../../Common/Icon/Icon";
import { organizations } from "../../../theme";
import { isMobileDevice } from "../../../helpers";

import {
  InviteWrapper,
  SocialIcons,
  FbShare,
  ShareParagraph,
  Head3,
  PromoParagraph,
  WhatsappShare,
  EmailShare
} from "./inviteWorkers.style";

export default class InviteWorkers extends Component {
  fbSendBrowser = referralLink => {
    if (isMobileDevice.any()) {
      window.open(
        "fb-messenger://share?link=" +
          encodeURIComponent(referralLink) +
          "&app_id=" +
          encodeURIComponent("1065819443628486")
      );
    } else {
      // eslint-disable-next-line no-undef
      FB.ui({
        method: "send",
        link: referralLink
      });
    }
  };
  render() {
    const { id: userId } = this.props;
    let referralLink = `https://${window.location.host}/signup/${userId}`;
    if (process.env.NODE_ENV === "development") {
      referralLink = `http://${window.location.host}/signup/${userId}`;
    }
    return (
      <InviteWrapper>
        <Icon
          icon="win"
          color={organizations.agency.primary}
          height="50"
          width="50"
          margin="1rem 0 0.5rem 0"
        />
        <Head3>Your network is powerful!</Head3>
        <PromoParagraph>
          The more workers use earwig, the more valuable it becomes for you and
          the worker community.
        </PromoParagraph>

        <ShareParagraph>Share your magic link via:</ShareParagraph>
        <SocialIcons>
          <EmailShare
            url={referralLink}
            subject={`Signup using my referal link`}
          >
            <img src={emailIcon} alt="" />
            Email
          </EmailShare>
          <WhatsappShare
            url={referralLink}
            title={`Signup using my referal link`}
            separator=": "
          >
            <img src={whatsAppIcon} alt="" />
            WhatsApp
          </WhatsappShare>

          <FbShare onClick={() => this.fbSendBrowser(referralLink)}>
            <img src={facebookMsgIcon} alt="" />
            Facebook
          </FbShare>
        </SocialIcons>
      </InviteWrapper>
    );
  }
}
