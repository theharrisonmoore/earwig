// Render Prop
import React, { Component } from "react";
import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledErrorMessage as ErrorMessage,
  Label,
  Button
} from "./../../Common/Formik/Formik.style";

import {
  StyledLink as Link,
  LoginWrapper,
  SmallLink,
  Devider,
  Circle
} from "./Login.style";

import logo from "./../../../assets/logo.svg";

import { StyledField } from "./../../Common/Formik/Formik.style";
export default class Login extends Component {
  render() {
    return (
      <LoginWrapper>
        <img src={logo} />
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Label htmlFor="email">
                Email
                <StyledField type="email" name="email" id="email" />
                <ErrorMessage name="email" component="div" />
              </Label>
              <Label htmlFor="password">
                Password
                <Field type="password" name="password" />
                <ErrorMessage name="email" component="div" id="password" />
              </Label>
              <ErrorMessage name="password" component="div" />
              <SmallLink to="/reset-password">Forget password?</SmallLink>
              <Button type="submit" disabled={isSubmitting}>
                Log in
              </Button>
            </Form>
          )}
        </Formik>
        <p className="paragraph">
          Don’t have an account?
          <Link to="signup" purple>
            Create an account
          </Link>
        </p>
        <Devider>
          <Circle>OR</Circle>
        </Devider>
        <Link to="signup" purple>
          Create an account
        </Link>
      </LoginWrapper>
    );
  }
}
