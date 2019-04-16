import styled from "styled-components";

export const ImageUploader = styled.div``;

export const Label = styled.label`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: 1px solid grey;
  display: inline-block;
  position: relative;
`;

export const IconWrapper = styled.div`
  display: inline-block;
  width: 35%;
  vertical-align: middle;
`;
export const ThumbnailWrapper = styled.div`
  vertical-align: middle;
  display: inline-block;
  width: 65%;
`;

export const UploadIcon = styled.img`
  color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Thumbnail = styled.img`
  width: 100%;
`;
