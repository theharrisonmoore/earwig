import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const StyledFormik = styled(Formik).attrs()`
  display: flex;
  flex-direction: column;
`;

export const StyledForm = styled(Form).attrs()`
  display: flex;
  flex-direction: column;
`;

export const StyledErrorMessage = styled(ErrorMessage).attrs()``;

export const StyledField = styled(Field).attrs()`
  background: #ffffff;
  border: 1px solid #979797;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  display: block;
  width: 100%;
`;

export const Label = styled.label.attrs()`
  display: block;
  text-align: left;
`;
