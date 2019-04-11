import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  SelectWrapper,
  Error,
  RightIcon
} from "./UploadImage.style";
import card from "./../../../assets/card.svg";
import example from "./../../../assets/example.png";

const label = "Trade";
const placeholder = "Select your trade";

export default class UploadImage extends Component {
  state = {
    tradeId: "",
    trades: [],
    error: ""
  };

  componentDidMount() {
    axios.get("/api/trades").then(res => {
      const { data } = res;
      const trades = data.reduce((accu, current) => {
        accu.push({ value: current._id, label: current.title });
        return accu;
      }, []);
      this.setState({ trades });
    });
  }

  handleChange = event => {
    this.setState({ tradeId: event.target.value });
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

  handleSubmit = event => {
    event.preventDefault();
    const form = new FormData();
    if (!this.state.imageFile) {
      this.setState({ error: "Please upload image" });
    } else if (!this.state.tradeId) {
      this.setState({ error: "Please select your trade" });
    } else {
      Swal.fire({
        title: "Uploading!",
        onBeforeOpen: () => {
          Swal.showLoading();
          this.setState({ error: "" });

          form.append("verificationImage", this.state.imageFile);
          form.append("tradeId", this.state.tradeId);

          axios({
            method: "post",
            url: "/api/upload-verification-image",
            data: form,
            headers: {
              "content-type": `multipart/form-data; boundary=${form._boundary}`
            }
          })
            .then(res => {
              Swal.fire({
                type: "success",
                title: "Done!",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.props.history.push("/profile");
              });
            })
            .catch(err => {
              Swal.fire({
                type: "error",
                title: "Oops...",
                text: err.response.data.error
              });
            });
        }
      });
    }
  };

  render() {
    const { error, image } = this.state;
    return (
      <UploadImageWrapper>
        <ContentWrapper>
          <Heading>Verifying you are a worker</Heading>
          <CardIcon src={card} />
          <form onSubmit={this.handleSubmit}>
            <SelectWrapper>
              <Select
                placeholder={placeholder}
                label={label}
                options={this.state.trades}
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
            <Example src={image ? image : example} />
            <Button as="label" htmlFor="image-input">
              Upload photo for verification{" "}
              {image && <RightIcon className="fas fa-check" />}
            </Button>
            <ImageInput
              id="image-input"
              type="file"
              onChange={this.handleImageChange}
              accept="image/*"
            />
            <SubHeading>Protecting you from blacklisting</SubHeading>
            <Paragraph>
              We believe that every voice counts and should be protected by
              anonymity - everybody has a right to speak and be heard without
              fear of blacklisting. To protect you, we’ll randomly assign you an
              earwig ID, which is the only thing that will be shown beside your
              reviews and replies.
            </Paragraph>
            {error && <Error>{error}</Error>}
            <Button marginTop={true} type="submit" error={error}>
              Finish verification
            </Button>
            <Link>Cancel and return to your profile</Link>
          </form>
        </ContentWrapper>
      </UploadImageWrapper>
    );
  }
}
