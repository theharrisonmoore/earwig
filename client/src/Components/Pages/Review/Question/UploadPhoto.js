import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import uploadIcon from "../../../../assets/upload-worksite-icon.svg";
import { API_UPLOAD_WORKSITE_IMAGE_URL } from "../../../../apiUrls";

import {
  ImageUploader,
  Label,
  UploadIcon,
  Thumbnail,
  IconWrapper,
  ThumbnailWrapper
} from "./UploadPhoto.style";

export default class UploadImage extends Component {
  state = {
    image: ""
  };

  handleImageChange = event => {
    const image = event.target.files && event.target.files[0];
    const reader = new FileReader();
    Swal.fire({
      title: "Uploading!",
      onBeforeOpen: () => {
        Swal.showLoading();
        reader.onload = () => {
          const form = new FormData();
          var dataURL = reader.result;
          this.setState({
            image: dataURL
          });
          form.append("worksiteImage", image);
          axios({
            method: "post",
            url: API_UPLOAD_WORKSITE_IMAGE_URL,
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
                this.props.setFieldValue("worksiteImage", res.data.image);
              });
            })
            .catch(err => {
              Swal.fire({
                type: "error",
                title: "Oops...",
                text: err.response.data.error
              });
            });
        };
      }
    });
    reader.readAsDataURL(image);
  };

  render() {
    const { image } = this.state;
    return (
      <ImageUploader>
        <input
          style={{ display: "none" }}
          type="file"
          name="image"
          id="siteImage"
          onChange={this.handleImageChange}
        />
        <IconWrapper>
          <Label htmlFor="siteImage">
            <UploadIcon src={uploadIcon} alt="" />
          </Label>
        </IconWrapper>
        <ThumbnailWrapper>
          <Thumbnail src={image} alt="" />
        </ThumbnailWrapper>
      </ImageUploader>
    );
  }
}
