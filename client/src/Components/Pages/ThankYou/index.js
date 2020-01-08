import React, { Component } from "react";
import { Divider } from "antd";

import { isMobileDevice } from "../../../helpers";
import SocialLinks from "../../Common/SocialLinks";

import {
  ThankYouWrapper,
  ContentWrapper,
  Image,
  Heading,
  Paragraph,
  List,
  SquareSection,
  PromoTitle,
  Thanks,
  LeftSide,
  RightSide,
} from "./ThankYou.style";

import Button from "../../Common/Button";

import { EDIT_ID_URL } from "../../../constants/naviagationUrls";

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
    const { isDesktop } = this.props;

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

    const title = `Check this out, I've just given a review about ${orgName} on earwig to help you and other workers.`;

    const body = `Check this out, I've just given a review about ${orgName} on earwig to help you and other workers. 
     Have a look and if it's helpful to you, give me a point by liking it. I can redeem points for tools and training. 
     You should get involved with earwig mate. It's like Trip Advisor for construction workers and it's giving us a voice to change the industry for the better.
     Never choose a bad job again!`;

    return (
      <ThankYouWrapper>
        {isDesktop ? (
          <ContentWrapper isDesktop>
            <LeftSide>
              <Image src={img} />
              <Heading>You did it!</Heading>
              <Paragraph>
                Your review will be published now! There may be a small delay if
                we’re verifying your account.
              </Paragraph>
              <Divider />
              <Paragraph>
                Each time you give a review, you:
                <List>
                  <li>Strengthen the worker community</li>

                  <li>Improve working conditions</li>

                  <li>Help workers choose great jobs</li>
                </List>
              </Paragraph>
              <Thanks>Thank you!</Thanks>
            </LeftSide>
            <RightSide>
              <SquareSection>
                <PromoTitle>Now tell your work mates!</PromoTitle>
                <Paragraph>
                  Share news of your review with the people you work with:
                </Paragraph>
                <SocialLinks
                  url={orgURL}
                  title={title}
                  body={body}
                  emailSubject={title}
                />
              </SquareSection>
              <Paragraph>
                Your reviews are seen by workers and everyone in the
                construction industry.
              </Paragraph>
              <Paragraph>
                <strong>Don’t worry</strong>, only your username is visible on
                earwig
              </Paragraph>
              <Button
                styleType="secondary"
                text="Change your username"
                onClick={() => this.props.history.push(EDIT_ID_URL)}
              />
            </RightSide>
          </ContentWrapper>
        ) : (
          <ContentWrapper>
            <Image src={img} />
            <Heading>You did it!</Heading>
            <Paragraph style={{ marginBottom: "1.5rem" }}>
              Your review will be published now! There may be a small delay if
              we’re verifying your account.
            </Paragraph>
            <SquareSection>
              <PromoTitle>Now tell your work mates!</PromoTitle>
              <Paragraph>
                Share news of your review with the people you work with:
              </Paragraph>
              <SocialLinks
                url={orgURL}
                title={title}
                body={body}
                emailSubject={title}
              />
            </SquareSection>
            <Paragraph>
              Your reviews are seen by workers and everyone in the construction
              industry.
            </Paragraph>
            <Paragraph>
              <strong>Don’t worry</strong>, only your username is visible on
              earwig
            </Paragraph>
            <Button
              styleType="secondary"
              text="Change your username"
              onClick={() => this.props.history.push(EDIT_ID_URL)}
            />
            <Divider />
            <Paragraph>
              Each time you give a review, you:
              <List>
                <li>Strengthen the worker community</li>

                <li>Improve working conditions</li>

                <li>Help workers choose great jobs</li>
              </List>
            </Paragraph>
            <Thanks>Thank you!</Thanks>
          </ContentWrapper>
        )}
      </ThankYouWrapper>
    );
  }
}
