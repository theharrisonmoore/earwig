// Render Prop
import React, { Component } from "react";
import * as Yup from "yup";

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

import { StyledLink as Link, SignupWrapper, LinkSpan } from "./Signup.style";

import logo from "./../../../assets/logo.svg";

import { StyledField } from "../../Common/Formik/Formik.style";

// create custom function
function equalTo(ref, msg) {
  return this.test({
    name: "equalTo",
    exclusive: false,
    message: msg || "Not match",
    params: {
      reference: ref.path
    },
    test: function(value) {
      return value === this.resolve(ref);
    }
  });
}

Yup.addMethod(Yup.string, "equalTo", equalTo);

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(6)
    .required("Required"),
  rePassword: Yup.string()
    .required("Required")
    .equalTo(Yup.ref("password")),
  checkbox: Yup.boolean()
    .required("Required")
    .oneOf([true], "Must Accept Terms and Conditions")
});

const initialValues = {
  email: "",
  password: "",
  rePassword: "",
  checkbox: false
};

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
          this.props.history.push(`/intro`);
        })
        .catch(err => {
          this.setState({ error: err.response.data.error });
          setSubmitting(false);
        });
    } else {
      setSubmitting(true);
    }
  };

  render() {
    const { error } = this.state;

    return (
      <SignupWrapper>
        <img src={logo} alt="logo" />
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
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
                New password
                <Field type="password" name="password" />
                <FormikErrorMessage
                  name="password"
                  component="p"
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
                  I agree to the earwig{" "}
                  <LinkSpan to="T&C">Terms of Use.</LinkSpan>
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
