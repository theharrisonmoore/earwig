import React, { Component } from "react";
import axios from "axios";

import Select from "./../../Common/Select";
import {
  UploadImageWrapper,
  ContentWrapper,
  Heading,
  SubHeading,
  CardIcon,
  ImageInput,
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

export default class UploadImage extends Component {
  state = {
    tradeId: ""
  };
  handleChange = event => {
    this.setState({ tradeId: event.target.value });
    console.log(this.state);
  };

  handleImageChange = event => {
    const image = event.target.files && event.target.files[0];
    var reader = new FileReader();

    reader.onload = () => {
      var dataURL = reader.result;
      this.setState({
        image: dataURL
      });
    };

    this.setState(
      {
        imageFile: image
      },
      () => {
        reader.readAsDataURL(image);
      }
    );
  };

  handleSubmit = () => {
    const form = new FormData();
    form.append("avatar", this.state.imageFile);

    axios({
      method: "post",
      url: "/api/upload-verification-image",
      data: form,
      headers: {
        "content-type": `multipart/form-data; boundary=${form._boundary}`
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
          <Button as="label" htmlFor="image-input">
            Upload photo for verification
          </Button>
          <ImageInput
            id="image-input"
            type="file"
            onChange={this.handleImageChange}
          />
          {this.state.image && <img src={this.state.image} alt="user avatar" />}
          <SubHeading>Protecting you from blacklisting</SubHeading>
          <Paragraph>
            We believe that every voice counts and should be protected by
            anonymity - everybody has a right to speak and be heard without fear
            of blacklisting. To protect you, we’ll randomly assign you an earwig
            ID, which is the only thing that will be shown beside your reviews
            and replies.
          </Paragraph>
          <Button marginTop={true} onClick={this.handleSubmit}>
            Finish verification
          </Button>
          <Link>Cancel and return to your profile</Link>
        </ContentWrapper>
      </UploadImageWrapper>
    );
  }
}
