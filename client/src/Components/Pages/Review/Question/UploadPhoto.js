import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import piexif from "piexifjs";

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
    image: "",
    exifData: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { image } = this.state;
    const { image: prevImage } = prevState;

    if (image !== prevImage) {
      window.onload = this.getExif();
    }
  }

  getExif = () => {
    const image = document.getElementById("loadedImg");
    const exifObj = piexif.load(image.src);
    const exifData = {};
    for (var ifd in exifObj) {
      if (ifd == "thumbnail") {
        continue;
      }
      for (var tag in exifObj[ifd]) {
        exifData[piexif.TAGS[ifd][tag]["name"]] = exifObj[ifd][tag];
      }
    }
    this.setState({ exifData });
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
                this.props.handleSliderChange(
                  res.data.image,
                  this.props.number
                );
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
    const { image, exifData } = this.state;
    return (
      <ImageUploader>
        <input
          style={{ display: "none" }}
          type="file"
          name="image"
          id="siteImage"
          accept="image/*"
          onChange={this.handleImageChange}
        />
        <IconWrapper>
          <Label htmlFor="siteImage">
            <UploadIcon src={uploadIcon} alt="" />
          </Label>
        </IconWrapper>
        <ThumbnailWrapper>
          <Thumbnail
            src={image}
            alt=""
            id="loadedImg"
            orientation={exifData && exifData.Orientation}
          />
        </ThumbnailWrapper>
      </ImageUploader>
    );
  }
}
