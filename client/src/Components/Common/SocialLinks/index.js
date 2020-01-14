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
  fbSendBrowser = url => {
    if (isMobileDevice.any() !== null) {
      console.log("reached messanger");
      window.open(
        `fb-messenger://share?link=${encodeURIComponent(
          url,
        )}&app_id=${encodeURIComponent("1065819443628486")}`,
      );
    } else {
      // eslint-disable-next-line no-undef
      FB.ui({
        method: "send",
        link: url,
      });
    }
  };

  render() {
    const { url, title, body, emailSubject } = this.props;

    return (
      <SocialIcons>
        <SocialButtonWrapper>
          <EmailShareButton
            style={buttonStyle}
            url={url}
            subject={emailSubject}
            body={body}
            separator=" "
          >
            <Icon icon="email" width="15" height="15" fill={colors.white} />
            Email
          </EmailShareButton>
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <WhatsappShareButton
            style={buttonStyle}
            url={url}
            title={title}
            separator=": "
          >
            <Icon icon="whatsapp" width="15" height="15" fill={colors.white} />
            WhatsApp
          </WhatsappShareButton>
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <button onclick={() => this.fbSendBrowser(url)}>
            shareMessenger
          </button>
          {/* <FacebookMessengerShareButton
            style={buttonStyle}
            url={url}
            appId="1065819443628486"
          >
            <Icon icon="messenger" width="15" height="15" fill={colors.white} />
            Messenger
          </FacebookMessengerShareButton> */}
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <LinkedinShareButton
            source={url}
            // url={url}
            style={buttonStyle}
            title={title}
            summary={title}
          >
            <Icon icon="linkedin" width="15" height="15" fill={colors.white} />
            Linkedin
          </LinkedinShareButton>
        </SocialButtonWrapper>

        <SocialButtonWrapper>
          <FacebookShareButton style={buttonStyle} url={url} quote={title}>
            <Icon icon="facebook" width="15" height="15" fill={colors.white} />
            Facebook
          </FacebookShareButton>
        </SocialButtonWrapper>
      </SocialIcons>
    );
  }
}
