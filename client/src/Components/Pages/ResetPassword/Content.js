import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Route, Switch, Link } from "react-router-dom";

import { Modal, Spin, Icon } from "antd";

import {
  Description,
  ContentWrapper,
  Wrapper,
  Button
} from "./ResetPassword.style";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  GeneralErrorMessage
} from "../../Common/Formik/Formik.style";

import {
  LOGIN_URL,
  RESET_PASSWORD_URL,
  SET_PASSWORD_URL,
  EMAIL_SENT_URL
} from "./../../../constants/naviagationUrls";

import Logo from "../../Common/Logo";

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "white" }} spin />
);

export const ResetPassword = ({
  error,
  handleSubmitReset,
  history,
  loading
}) => {
  const resetSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
  });

  return (
    <>
      <ContentWrapper>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={resetSchema}
          onSubmit={handleSubmitReset}
        >
          {({ isSubmitting }) => (
            <Form>
              <Description>
                Enter your email and we’ll send you a link to reset your
                password
              </Description>
              <Label htmlFor="email">
                Email
                <StyledField type="email" name="email" id="email" />
                <FormikErrorMessage name="email" component="p" />
              </Label>

              {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={true}
                as="button"
              >
                {loading && (
                  <Spin indicator={antIcon} style={{ marginRight: ".5rem" }} />
                )}
                Send link to my email
              </Button>
            </Form>
          )}
        </Formik>
      </ContentWrapper>
    </>
  );
};

export const SetPassword = ({ error, handleSubmitSet, match, loading }) => {
  const setPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6)
      .required("Required"),
    rePassword: Yup.string()
      .required("Required")
      .equalTo(Yup.ref("password"))
  });

  const { token } = match.params;

  return (
    <>
      <Logo />
      <Description>Reset your password</Description>
      <Formik
        initialValues={{ password: "", rePassword: "" }}
        validationSchema={setPasswordSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmitSet(values, { setSubmitting }, token)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <Label htmlFor="password">
              New password
              <StyledField type="password" name="password" />
              <FormikErrorMessage name="password" component="p" id="password" />
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
            <Button type="submit" disabled={isSubmitting} as="button">
              {loading && (
                <Spin indicator={antIcon} style={{ marginRight: ".5rem" }} />
              )}
              Save Password
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const PasswordSent = ({ history }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Description>A password reset link was emailed to you</Description>
        <Button left type="submit" onClick={() => history.push("/")}>
          Got it
        </Button>
      </ContentWrapper>
    </Wrapper>
  );
};

export const PasswordSDone = ({ history }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Description>
          Great, you’ve set up a new password. Keep it safe!
        </Description>
        <Button
          left
          type="submit"
          onClick={() =>
            history.push({
              pathname: LOGIN_URL,
              state: { resetSuccess: true }
            })
          }
        >
          Will Do
        </Button>
      </ContentWrapper>
    </Wrapper>
  );
};
