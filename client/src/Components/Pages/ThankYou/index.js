/**
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
  Icon,
  Button,
  StyledLink
} from "./ThankYou.style";

export default class ThankYou extends Component {
  render() {
    const orgType =
      this.props.history.location.state &&
      this.props.history.location.state.orgType;
    if (!orgType) {
      return this.props.history.goBack();
    }
    const img = require(`./../../../assets/thank-you-${orgType}.svg`);

    return (
      <ThankYouWrapper>
        <ContentWrapper>
          <Image src={img} />
          <Heading>Thank ThankYou</Heading>
          <BoldPargraph>
            Your review will be seen by this company and other workers who rely
            on reviews like yours
          </BoldPargraph>
          <SubHeading>Each time you give a review, you</SubHeading>
          <List>
            <li>Create awareness</li>

            <li>Improve working conditions</li>

            <li>Help workers feel secure</li>
          </List>
          <IconWrapper>
            <Icon className="fab fa-twitter-square" color="1c9cec" />
            <Icon className="fab fa-linkedin" color="0f72a3" />
            <Icon className="fab fa-facebook-square" color="3a5695" />
            <Icon className="fas fa-share-alt" color="00c0ff" />
            <Icon className="fab fa-whatsapp" color="4dc959" />
            <Icon className="fab fa-instagram" color="d13e72" />
          </IconWrapper>
          <Button orgType={orgType}>Share this news on social</Button>
          <StyledLink to="search" orgType={orgType}>
            Now review an agency, payroll or worksite
          </StyledLink>
        </ContentWrapper>
      </ThankYouWrapper>
    );
  }
}
