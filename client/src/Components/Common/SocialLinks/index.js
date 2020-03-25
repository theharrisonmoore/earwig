import React, { Component } from "react";

import {
  EmailShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
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
  // fbSendBrowser = url => {
  //   if (isMobileDevice.any() !== null) {
  //     window.open(
  //       `https://web.facebook.com/dialog/send?app_id=${encodeURIComponent(
  //         "1065819443628486",
  //       )}&link=${encodeURIComponent(url)}&redirect_uri=${encodeURIComponent(
  //         url,
  //       )}`,
  //     );
  //   } else {
  //     // eslint-disable-next-line no-undef
  //     FB.ui(
  //       {
  //         method: "share",
  //         href: url,
  //         title: title,
  //         description: body,
  //       },
  //       function(response) {},
  //     );
  //   }
  // };

  render() {
    const { title, body, emailSubject, url } = this.props;

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

        {/* render share on messenger button only on desktop
        as this is not supported on mobile
        https://developers.facebook.com/docs/sharing/reference/send-dialog/?locale=en_US
        */}
        {isMobileDevice.any() === null && (
          <SocialButtonWrapper>
            <FacebookMessengerShareButton
              style={buttonStyle}
              url={url}
              title={title}
              appId="1065819443628486"
            >
              <Icon
                icon="messenger"
                width="15"
                height="15"
                fill={colors.white}
              />
              Messenger
            </FacebookMessengerShareButton>
          </SocialButtonWrapper>
        )}

        <SocialButtonWrapper>
          <LinkedinShareButton url={url} style={buttonStyle}>
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

        <SocialButtonWrapper>
          <TwitterShareButton style={buttonStyle} url={url} quote={title}>
            <Icon icon="twitter" width="15" height="15" fill={colors.white} />
            Twitter
          </TwitterShareButton>
        </SocialButtonWrapper>
      </SocialIcons>
    );
  }
}
