import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Checkbox as CheckboxComponent } from "antd";

import { colors, shadows, borders } from "../../../theme";

export const StyledFormik = styled(Formik).attrs()`
  display: flex;
  flex-direction: column;
`;

export const StyledForm = styled(Form).attrs()`
  display: flex;
  flex-direction: column;
`;

export const StyledFormikErrorMessage = styled(ErrorMessage).attrs()`
  color: ${colors.red};
  font-weight: 100;
  font-size: 15px;
  text-align: left;
  margin-bottom: 0rem;
`;

export const GeneralErrorMessage = styled.p.attrs()`
  color: ${colors.red};
  font-weight: 100;
  font-size: 15px;
  text-align: left;
  padding: 1rem 0;
`;

export const StyledField = styled(Field).attrs()`
  background: ${colors.white};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  display: block;
  width: 100%;
  border: 1px solid ${colors.inputBorder};
  outline: none;
`;

export const Label = styled.label.attrs()`
  display: block;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 900;
  margin-bottom: 1.25rem;
  color: ${colors.mineShaft2};
`;

export const Button = styled.button`
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  background-color: ${colors.white};
  font-size: 1.25rem;
  border: ${props => props.border || borders.buttonBox};
  box-shadow: ${shadows.buttonShadow};
  outline: none;
  font-weight: 900;
  text-transform: capitalize;
  margin-bottom: 1.25rem;
  color: ${props => props.color || colors.profileFontColor};
  background: ${props => props.background || "none"};
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const CheckboxWrapper = styled.div.attrs({
  className: "custom-control custom-checkbox",
})`
  text-align: left;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  padding-top: 0;
`;

export const Checkbox = styled(Field).attrs({
  className: "custom-control-input",
})``;

export const CheckboxLabel = styled.label.attrs({
  className: "custom-control-label",
})`
  font-size: 15px;
  color: ${colors.profileFontColor};
  padding-left: 0.75rem;
  cursor: pointer;

  .ant-checkbox-inner {
    margin: 1rem 0;
  }

  &:after,
  &:before {
    padding-right: 0.5rem;
    height: 2rem;
    width: 2rem;
  }
`;

export const AntCheckbox = styled(CheckboxComponent)`
  .ant-checkbox-inner {
    border: 2px ${colors.profileFontColor} solid;
    height: 24px;
    width: 24px;
    border-radius: 4px;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${colors.primary};
    border: 2px ${colors.primary} solid;

    :after {
      left: 25%;
    }
`;
