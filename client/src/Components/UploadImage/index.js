import React, { Component } from "react";

import Select from "./../../Common/Select";
import {
  UploadImageWrapper,
  ContentWrapper,
  Heading,
  SubHeading,
  CardIcon,
  Label,
  Paragraph,
  Example,
  Button,
  Link,
  SelectWrapper
} from "./UploadImage.style";
import card from "./../../assets/card.svg";
import example from "./../../assets/example.png";
const options = [
  {
    value: 10,
    label: "ten"
  },
  {
    value: 20,
    label: "ten *2 "
  }
];
const label = "Trade";
const placeholder = "Select your trade";

export default class extends Component {
  state = {
    tradeId: ""
  };
  handleChange = event => {
    this.setState({ tradeId: event.target.value });
    console.log(this.state);
  };
  render() {
    return (
      <UploadImageWrapper>
        <ContentWrapper>
          <Heading>Verifying you are a worker</Heading>
          <CardIcon src={card} />
          <SelectWrapper>
            <Select
              placeholder={placeholder}
              label={label}
              options={options}
              handleChange={this.handleChange}
              value={this.state.tradeId}
            />
          </SelectWrapper>
          <SubHeading>Photo</SubHeading>
          <Paragraph>
            Please upload a photo of your face holding your trade ID like the
            example below. Please no glare or blur!
            <br />
            <br />
            Once we’ve verified you, we’ll delete your photo to protect your
            identity.
          </Paragraph>
          <Example src={example} />
          <Button>Upload photo for verification</Button>
          <SubHeading>Protecting you from blacklisting</SubHeading>
          <Paragraph>
            We believe that every voice counts and should be protected by
            anonymity - everybody has a right to speak and be heard without fear
            of blacklisting. To protect you, we’ll randomly assign you an earwig
            ID, which is the only thing that will be shown beside your reviews
            and replies.
          </Paragraph>
          <Button marginTop={true}>Finish verification</Button>
          <Link>Cancel and return to your profile</Link>
        </ContentWrapper>
      </UploadImageWrapper>
    );
  }
}
