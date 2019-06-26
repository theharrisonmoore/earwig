import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";

import { Modal } from "antd";

import Logo from "../../Common/Logo";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  Button,
  GeneralErrorMessage
} from "../../Common/Formik/Formik.style";

import { API_RESET_PASSWORD } from "./../../../apiUrls";

import { Wrapper } from "./ResetPassword.style";

const resetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

export default class ResetPassword extends Component {
  state = {
    error: ""
  };

  handleSubmit = (values, { setSubmitting }) => {
    axios
      .post(API_RESET_PASSWORD, values)
      .then(({ data }) => {
        Modal.success({
          title: "Done!",
          content: "Instructions to reset your password have been sent to the email address provided",
          onOk: () => {
            this.props.history.push("/");
          }
        });
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        setSubmitting(false);
      });
  };

  render() {
    const { error } = this.state;

    return (
      <Wrapper>
        <Logo />
        <Formik
          initialValues={{ email: "" }}
          validationSchema={resetSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Label htmlFor="email">
                Enter Your Email
                <StyledField type="email" name="email" id="email" />
                <FormikErrorMessage name="email" component="p" />
              </Label>

              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button type="submit" disabled={isSubmitting}>
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
  }
}
