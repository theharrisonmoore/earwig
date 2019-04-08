// Render Prop
import React, { Component } from "react";
import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledErrorMessage as ErrorMessage,
  Label
} from "./../../Common/Formik/Formik.style";

import { StyledLink as Link } from "./Login.style";

import logo from "./../../../assets/logo.svg";

import { StyledField } from "./../../Common/Formik/Formik.style";
export default class Login extends Component {
  render() {
    return (
      <div>
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
              <Link to="/reset-password">Forget password?</Link>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
