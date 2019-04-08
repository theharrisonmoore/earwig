// Render Prop
import React, { Component } from "react";
import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  Button,
  GeneralErrorMessage
} from "./../../Common/Formik/Formik.style";

import axios from "axios";

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
  state = {
    error: ""
  };

  handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    axios
      .post("/api/login", values)
      .then(({ data }) => {
        this.props.handleChangeState({ ...data, isLoggedIn: true });
        this.props.history.push(`/search`);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        setSubmitting(false);
      });
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
    }
    return errors;
  };

  render() {
    const { error } = this.state;

    return (
      <LoginWrapper>
        <img src={logo} alt="logo" />
        <Formik
          initialValues={{ email: "", password: "" }}
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
                Password
                <Field type="password" name="password" />
                <FormikErrorMessage
                  name="password"
                  component="div"
                  id="password"
                />
              </Label>
              <SmallLink to="/reset-password">Forget password?</SmallLink>
              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button type="submit" disabled={isSubmitting}>
                Log in
              </Button>
            </Form>
          )}
        </Formik>
        <p className="paragraph">
          Don’t have an account?
          <Link to="signup">Create an account</Link>
        </p>
        <Devider>
          <Circle>OR</Circle>
        </Devider>
        <Link to="/intro">Continue without an account</Link>
      </LoginWrapper>
    );
  }
}
