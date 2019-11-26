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
  EmailShare,
} from "./inviteWorkers.style";

export default class InviteWorkers extends Component {
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
    const { id: userId } = this.props;
    let referralLink = `https://${window.location.host}/signup/${userId}`;
    if (process.env.NODE_ENV === "development") {
      referralLink = `http://${window.location.host}/signup/${userId}`;
    }
    return (
      <InviteWrapper>
        <Icon icon="win" height="50" width="50" margin="1rem 0 0.5rem 0" />

        <Head3>Together we are powerful!</Head3>
        <PromoParagraph>
          The more workers use earwig, the more valuable it becomes for you and
          the worker community.
        </PromoParagraph>

        <ShareParagraph>Share your magic link via:</ShareParagraph>
        <SocialIcons>
          <EmailShare
            url={referralLink}
            subject="Mate, never choose a bad construction job again!"
            body={`Hi mate, have you heard about earwig? It’s the first construction worker voice platform that lets us give and get feedback about every agency, payroll company, worksite and employer in the industry so we can avoid bad jobs and choose the best. It was set-up by a sparky who’s used agencies for 7 years. I’ve joined up. You should too mate. It’s free and secure.
            >>> ${referralLink}
If the link isn’t working, copy and paste it into your browser.`}
          >
            <img src={emailIcon} alt="" />
            Email
          </EmailShare>
          <WhatsappShare
            url={referralLink}
            title="Mate, never choose a bad construction job again! Have you heard about earwig? It’s the first construction worker voice platform that lets us give and get feedback about every agency, payroll company, worksite and employer in the industry so we can avoid bad jobs and choose the best. It was set-up by a sparky who’s used agencies for 7 years. I’ve joined up. You should too mate. It’s free and secure."
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
        <PromoParagraph>
          You’ll earn 1 point for every worker who gets verified using your
          magic link. Your points are an important measure of how helpful you’ve
          been to other workers. We may give awards and run competitions from
          time to time.
        </PromoParagraph>
      </InviteWrapper>
    );
  }
}
