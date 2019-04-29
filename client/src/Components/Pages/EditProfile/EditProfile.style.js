import styled from "styled-components";
import { Link } from "react-router-dom";
import { Label, Button } from "./../../Common/Formik/Formik.style";

import Icon from "./../../Common/Icon/Icon";

import { colors, shadows, gradient, borders } from "./../../../theme";

export const EditIcon = styled(Icon)`
  margin-right: 0.5rem;
`;

export const EditWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 1.5rem;
  padding-top: 3rem;

  & > div:first-child {
    padding-top: 0;
  }
`;

export const VerifiedWrapper = styled.div``;
export const UnVerifiedWrapper = styled.div``;

export const Section = styled.div`
  width: 100%;
  padding: 2.75rem 0;
  text-align: left;
  border-bottom: ${borders.commentBox}};
`;

export const Title = styled.h2`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin: 0;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;

  .row__image-container {
    & > * {
      display: inline-block;
    }

    & > img {
      margin-right: 1rem;
    }
  }
`;

export const EditButton = styled.button`
  font-weight: 900;
  font-size: 1rem;
  color: ${colors.profileFontColor};
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-bottom: 0;
  text-decoration: underline;

  &:active,
  &:focus,
  &:hover {
    outline: none;
    color: ${colors.purpleLinks};
  }
`;

export const DeleteButton = styled(EditButton)`
  &:active,
  &:focus,
  &:hover {
    outline: none;
    color: ${colors.red};
  }
`;

export const PasswordWrapper = styled.div`
  padding-top: 2rem;
`;

export const LightLabel = styled(Label)`
  font-weight: 100;
  font-size: 1rem;
`;

export const StyledButton = styled(Button)`
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const StyledLink = styled(Link)`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin: 0;
  text-decoration: none;

  &:active,
  &:hover {
    text-decoration: none;
    color: ${colors.profileFontColor};
    outline: none;
  }
`;

export const StatusWrapper = styled.div`
  position: relative;

  &:after {
    display: block;
    content: "";
    position: absolute;
    width: calc(100% + 3rem);
    left: -1.5rem;
    box-shadow: ${shadows.sectionShadow};
    height: 100%;
    top: 0;
  }
`;

export const Status = styled.h3`
  font-weight: 900;
  font-size: 1rem;
  color: ${colors.gray};
  line-height: 7rem;
  text-align: left;
`;

export const UnVerifiedTitle = styled.h1`
  font-weight: 900;
  font-size: 1.375rem;
  color: ${colors.profileFontColor};
  margin-top: 2.5rem;
  display: inline-block;
  margin-bottom: 0;
  &:after {
    content: "";
    height: 1px;
    background: ${gradient.blackFade};
    width: 100%;
    display: block;
  }
`;

export const Paragraph = styled.p`
  font-weight: 500;
  font-size: 1rem;
  text-align: left;
  color: ${colors.gray};
  margin-top: 1rem;
`;

export const UnVerifiedButton = styled(Link)`
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  background-color: ${colors.white};
  font-size: 1.25rem;
  border: 1px solid ${colors.black};
  box-shadow: ${shadows.buttonShadow};
  outline: none;
  font-weight: 900;
  text-transform: capitalize;
  margin-bottom: 1.25rem;
  color: ${colors.profileFontColor};
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 20rem;
  margin: 1rem auto 3.5rem auto;

  &,
  &:active,
  &:focus {
    outline: none;
    text-decoration: none;
  }
`;

export const VerifiedLabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;
