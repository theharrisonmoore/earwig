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

import { LOGIN_URL } from "../../../constants/naviagationUrls";
import { API_SET_PASSWORD } from "./../../../apiUrls";

import { Wrapper } from "./SetPassword.style";

const setPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6)
    .required("Required"),
  rePassword: Yup.string()
    .required("Required")
    .equalTo(Yup.ref("password"))
});

export default class SetPassword extends Component {
  state = {
    error: ""
  };

  componentDidMount() {
    const { token } = this.props.match.params;

    if (!token) {
      this.props.history.goBack();
    }
  }

  handleSubmit = (values, { setSubmitting }) => {
    const { token } = this.props.match.params;

    axios
      .post(API_SET_PASSWORD, { ...values, token })
      .then(({ data }) => {
        Modal.success({
          title: "Done!",
          content: "You successfully updated your password",
          onOk: () => {
            this.props.history.push({
              pathname: LOGIN_URL,
              state: { resetSuccess: true }
            });
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
        <p className="paragraph">Resetting Password</p>
        <Formik
          initialValues={{ password: "", rePassword: "" }}
          validationSchema={setPasswordSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Label htmlFor="password">
                New password
                <StyledField type="password" name="password" />
                <FormikErrorMessage
                  name="password"
                  component="p"
                  id="password"
                />
              </Label>

              <Label htmlFor="rePassword">
                Confirm new password
                <StyledField type="password" name="rePassword" />
                <FormikErrorMessage
                  name="rePassword"
                  component="div"
                  id="rePassword"
                />
              </Label>

              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button type="submit" disabled={isSubmitting}>
                Save Password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
  }
}
