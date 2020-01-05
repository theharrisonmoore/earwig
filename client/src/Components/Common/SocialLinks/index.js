import React, { Component } from "react";

import {
  EmailShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share";

import Icon from "../Icon/Icon";
import { isMobileDevice } from "../../../helpers";

import { SocialIcons, SocialButtonWrapper } from "./SocialLinks.style";

import { colors } from "../../../theme";

const buttonStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default class SocialLinks extends Component {
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
      <SocialIcons>
        <SocialButtonWrapper>
          <EmailShareButton
            style={buttonStyle}
            url={referralLink}
            subject="Mate, never choose a bad construction job again!"
            body={`Hi mate, have you heard about earwig? It’s the first construction worker voice platform that lets us give and get feedback about every agency, payroll company, worksite and employer in the industry so we can avoid bad jobs and choose the best. It was set-up by a sparky who’s used agencies for 7 years. I’ve joined up. You should too mate. It’s free and secure.
              >>> ${referralLink}
              If the link isn’t working, copy and paste it into your browser.`}
          >
            <Icon icon="email" width="15" height="15" fill={colors.white} />
            Email
          </EmailShareButton>
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <WhatsappShareButton
            style={buttonStyle}
            url={referralLink}
            title="Mate, never choose a bad construction job again! Have you heard about earwig? It’s the first construction worker voice platform that lets us give and get feedback about every agency, payroll company, worksite and employer in the industry so we can avoid bad jobs and choose the best. It was set-up by a sparky who’s used agencies for 7 years. I’ve joined up. You should too mate. It’s free and secure."
            separator=": "
          >
            <Icon icon="whatsapp" width="15" height="15" fill={colors.white} />
            WhatsApp
          </WhatsappShareButton>
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <FacebookMessengerShareButton
            style={buttonStyle}
            url={referralLink}
            appId="1065819443628486"
          >
            <Icon icon="messenger" width="15" height="15" fill={colors.white} />
            Messenger
          </FacebookMessengerShareButton>
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <LinkedinShareButton url={referralLink} style={buttonStyle}>
            <Icon icon="linkedin" width="15" height="15" fill={colors.white} />
            Linkedin
          </LinkedinShareButton>
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <FacebookShareButton
            style={buttonStyle}
            url={referralLink}
            title="Mate, never choose a bad construction job again! Have you heard about earwig? It’s the first construction worker voice platform that lets us give and get feedback about every agency, payroll company, worksite and employer in the industry so we can avoid bad jobs and choose the best. It was set-up by a sparky who’s used agencies for 7 years. I’ve joined up. You should too mate. It’s free and secure."
          >
            <Icon icon="facebook" width="15" height="15" fill={colors.white} />
            Facebook
          </FacebookShareButton>
        </SocialButtonWrapper>
      </SocialIcons>
    );
  }
}
