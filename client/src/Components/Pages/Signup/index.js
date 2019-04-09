// Render Prop
import React, { Component } from "react";
import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  Button,
  GeneralErrorMessage,
  CheckboxWrapper,
  Checkbox,
  CheckboxLabel
} from "../../Common/Formik/Formik.style";

import axios from "axios";

import { StyledLink as Link, SignupWrapper } from "./Signup.style";

import logo from "./../../../assets/logo.svg";

import { StyledField } from "../../Common/Formik/Formik.style";

export default class Signup extends Component {
  state = {
    error: "",
    errors: {}
  };

  handleSubmit = (values, { setSubmitting }) => {
    if (values.checkbox) {
      setSubmitting(true);

      axios
        .post("/api/signup", values)
        .then(({ data }) => {
          this.props.handleChangeState({ ...data, isLoggedIn: true });
          this.props.history.push(`/search`);
        })
        .catch(err => {
          this.setState({ error: err.response.data.error });
          setSubmitting(false);
        });
    } else {
      setSubmitting(true);
    }
  };

  validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Password not match";
    }
    if (!values.checkbox) {
      errors.checkbox = "You should agree Earwig terms of user";
    }
    this.setState({ errors });
    return errors;
  };

  render() {
    const { error } = this.state;

    return (
      <SignupWrapper>
        <img src={logo} alt="logo" />
        <Formik
          initialValues={{
            email: "",
            password: "",
            rePassword: "",
            checkbox: false
          }}
          validate={this.validate}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Label htmlFor="email">
                Email
                <StyledField type="email" name="email" id="email" />
                <FormikErrorMessage name="email" component="div" />
              </Label>

              <Label htmlFor="password">
                New password
                <Field type="password" name="password" />
                <FormikErrorMessage
                  name="password"
                  component="div"
                  id="password"
                />
              </Label>

              <Label htmlFor="rePassword">
                Confirm new password
                <Field type="password" name="rePassword" />
                <FormikErrorMessage
                  name="rePassword"
                  component="div"
                  id="rePassword"
                />
              </Label>

              <CheckboxWrapper>
                <Checkbox id="checkbox" type="checkbox" name="checkbox" />
                <CheckboxLabel htmlFor="checkbox">
                  I agree to the earwig Terms of Use.
                </CheckboxLabel>
                <FormikErrorMessage name="checkbox" component="div" />
              </CheckboxWrapper>

              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button type="submit" disabled={isSubmitting}>
                Finish account setup
              </Button>
            </Form>
          )}
        </Formik>
        <Link to="intro">Continue without an account</Link>
      </SignupWrapper>
    );
  }
}
