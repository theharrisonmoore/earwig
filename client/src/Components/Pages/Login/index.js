import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";

import Logo from "./../../Common/Logo";
import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  Button,
  GeneralErrorMessage
} from "./../../Common/Formik/Formik.style";

import {
  ADMIN,
  SEARCH_URL,
  SIGNUP_URL,
  RESET_PASSWORD_URL
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
        const { isAdmin } = data;
        this.props.history.push(isAdmin ? ADMIN : SEARCH_URL);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        setSubmitting(false);
      });
  };

  render() {
    const { error } = this.state;

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
              <SmallLink to={RESET_PASSWORD_URL}>Forget password?</SmallLink>
              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button type="submit" disabled={isSubmitting}>
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
        <Link to={SEARCH_URL}>Continue without an account</Link>
      </LoginWrapper>
    );
  }
}
