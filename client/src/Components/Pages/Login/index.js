import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Alert } from "antd";
import Mixpanel from "mixpanel-browser";

import Logo from "../../Common/Logo";
import Button from "../../Common/Button";
import Link from "../../Common/Link";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  GeneralErrorMessage,
  StyledField,
} from "../../Common/Formik/Formik.style";

import {
  SIGNUP_URL,
  RESET_PASSWORD_URL,
  WELCOME_URL,
} from "../../../constants/naviagationUrls";

import {
  // StyledLink as Link,
  LoginWrapper,
  SmallLink,
  Devider,
} from "./Login.style";

// import { ORG_STATUS_URL_LOGIN } from "./../../../constants/naviagationUrls";

const initalValues = { email: "", password: "" };

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export default class Login extends Component {
  state = {
    error: "",
  };

  handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("/api/login", values)
      .then(({ data }) => {
        Mixpanel.identify(data.userId);
        Mixpanel.track("Successful login");
        Mixpanel.people.append({
          $userId: data.userId,
        });
        this.props.handleChangeState({ ...data, isLoggedIn: true });
        this.props.history.push(WELCOME_URL);
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
    const { history } = this.props;

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
              <Link
                to={RESET_PASSWORD_URL}
                type="primary"
                text="Forgot password?"
                align="right"
              />
              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                styleType="primary"
                margin="2rem auto 0 auto"
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>
        <Devider />
        <p className="paragraph">
          Not signed up?
          <Button
            styleType="secondary"
            onClick={() => history.push(SIGNUP_URL)}
          >
            Sign up free
          </Button>
        </p>
        <Link
          to={WELCOME_URL}
          type="primary"
          text="Continue without an account"
        />
      </LoginWrapper>
    );
  }
}
