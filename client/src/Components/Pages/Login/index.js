import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Alert } from "antd";

import Logo from "./../../Common/Logo";
import Button from "./../../Common/Button";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  GeneralErrorMessage
} from "./../../Common/Formik/Formik.style";

import {
  SIGNUP_URL,
  RESET_PASSWORD_URL,
  WELCOME_URL,
  ORG_STATUS_URL_LOGIN
} from "./../../../constants/naviagationUrls";

import {
  StyledLink as Link,
  LoginWrapper,
  SmallLink,
  Devider,
  Circle
} from "./Login.style";

import { StyledField } from "./../../Common/Formik/Formik.style";

const initalValues = { email: "", password: "" };

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

export default class Login extends Component {
  state = {
    error: ""
  };

  handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("/api/login", values)
      .then(({ data }) => {
        this.props.handleChangeState({ ...data, isLoggedIn: true });
        this.props.history.push(ORG_STATUS_URL_LOGIN);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        setSubmitting(false);
      });
  };

  render() {
    const { error } = this.state;
    const resetSuccess =
      this.props.location.state && this.props.location.state.resetSuccess;

    return (
      <LoginWrapper>
        <Logo />
        <Formik
          initialValues={initalValues}
          validationSchema={loginSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {resetSuccess && (
                <Alert
                  message="Your password has been changed"
                  type="success"
                  style={{ marginBottom: "20px" }}
                />
              )}
              <Label htmlFor="email">
                Email
                <StyledField type="email" name="email" id="email" />
                <FormikErrorMessage name="email" component="p" />
              </Label>
              <Label htmlFor="password">
                Password
                <Field type="password" name="password" />
                <FormikErrorMessage
                  name="password"
                  component="p"
                  id="password"
                />
              </Label>
              <SmallLink to={RESET_PASSWORD_URL}>Forgot password?</SmallLink>
              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>
        <p className="paragraph">
          Don’t have an account?
          <Link to={SIGNUP_URL}>Create an account</Link>
        </p>
        <Devider>
          <Circle>OR</Circle>
        </Devider>
        <Link to={WELCOME_URL}>Continue without an account</Link>
      </LoginWrapper>
    );
  }
}
