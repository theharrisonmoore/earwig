import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { colors, shadows } from "./../../../theme";

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
  font-size: 1rem;
  text-align: left;
`;

export const GeneralErrorMessage = styled.p.attrs()`
  color: ${colors.red};
  font-weight: 100;
  font-size: 1rem;
  text-align: left;
`;

export const StyledField = styled(Field).attrs()`
  background: ${colors.white};
  border: 1px solid ${colors.inputBorder};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.75rem 1rem;
  display: block;
  width: 100%;
  border: 1px solid ${colors.inputBorder};
  outline: none;
`;

export const Label = styled.label.attrs()`
  display: block;
  text-align: left;
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  border-radius: 5px;
  padding: 0.75rem 1rem;
  background-color: ${colors.white};
  font-size: 2rem;
  border: 1px solid ${colors.black};
  box-shadow: ${shadows.buttonShadow};
  outline: none;
  font-weight: 900;
  text-decoration: captalized;
  margin-bottom: 2rem;
`;
