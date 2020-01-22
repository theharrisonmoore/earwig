// Render Prop
import React, { Component } from "react";
import { Prompt, Link as ReactLink } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Modal, Divider } from "antd";

import { FBPixelTrack } from "../../../FBPixel";

import Logo from "../../Common/Logo";
import CancelLink from "../../Common/CancelLink";
import Icon from "../../Common/Icon/Icon";

import Button from "../../Common/Button";
import Link from "../../Common/Link";
import PopoverComponent from "../../Common/Popover";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  GeneralErrorMessage,
  CheckboxWrapper,
  Checkbox,
  CheckboxLabel,
  StyledField,
  AntCheckbox,
} from "../../Common/Formik/Formik.style";

import {
  SignupWrapper,
  ContentWrapper,
  PurpleDiv,
  OptionsWrapper,
  StyledInput,
  ButtonsWrapper,
  PopoverDiv,
  Paragraph,
  Example,
  ImageInput,
  ModalText,
  LogIn,
} from "./Signup.style";

import example from "../../../assets/example.jpg";

import { API_SIGN_UP } from "../../../apiUrls";

import {
  HOME_PAGE,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
  LOGIN_URL,
} from "../../../constants/naviagationUrls";
import { colors } from "../../../theme";

// create custom function
function equalTo(ref, msg) {
  return this.test({
    name: "equalTo",
    exclusive: false,
    message: msg || "Passwords do not match",
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
}

Yup.addMethod(Yup.string, "equalTo", equalTo);

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("You must add an email"),
  password: Yup.string()
    .min(6)
    .required("You must add a password"),
  checkbox: Yup.boolean()
    .required("You must agree to the earwig Terms of use")
    .oneOf([true], "You must agree to the earwig Terms of use"),
  isWorker: Yup.string()
    .required("You must select if you are a worker")
    .oneOf(["yes", "no"], "You must select if you are a worker"),
  orgType: Yup.string()
    .when("isWorker", {
      is: "yes",
      then: Yup.string().nullable(),
      otherwise: Yup.string().oneOf(
        ["agency", "payroll", "company", "mainCompany", "other", null],
        "invalid organisation type",
      ),
    })

    .nullable(),
  otherOrg: Yup.string(),

  verificationImage: Yup.mixed().test(
    "verificationImage",
    "You must upload a verification photo",
    function(verificationImage) {
      const isWorker = this.resolve(Yup.ref("isWorker"));

      if (isWorker === "yes" && !verificationImage) {
        return false;
      }
      return true;
    },
  ),
});

const initialValues = {
  email: "",
  password: "",
  checkbox: false,
  isWorker: null,
  orgType: null,
  otherOrg: "",

  verificationImage: undefined,
};

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  orgType,
  ...props
}) => {
  return (
    <OptionsWrapper
      className="test"
      option={props.option}
      orgType={props.category}
      options={props.count}
    >
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className="radio-button"
        {...props}
      />
      <StyledInput htmlFor={id} value={value} id={id} orgType={orgType}>
        {label}
      </StyledInput>
    </OptionsWrapper>
  );
};

const CustomCheckbox = ({ field, ...props }) => (
  <AntCheckbox type="checkbox" {...field} {...props} />
);

export default class Signup extends Component {
  state = {
    isWorker: null,
    orgType: "agency",
    error: "",
    isPopupVisible: false,
    data: null,
    isPasswordVisible: false,
    browserBackAttempt: true,
  };

  handleSubmit = (_values, { setSubmitting }) => {
    const { referral } = this.props.match.params;
    const values = { ..._values };
    const form = new FormData();
    const { isWorker } = this.state;

    if (referral) {
      values.referral = referral;
    }

    if (values.checkbox) {
      setSubmitting(true);

      Object.entries(values).forEach(pair => {
        if (pair[1]) {
          form.append(pair[0], pair[1]);
        }
      });

      this.setState({ error: "" }, () => {
        axios({
          method: "post",
          url: API_SIGN_UP,
          data: form,
          headers: {
            "content-type": `multipart/form-data; boundary=${form._boundary}`,
          },
        })
          .then(({ data }) => {
            FBPixelTrack("CompleteRegistration");

            if (isWorker === "yes") {
              this.setState({
                isPopupVisible: true,
                data,
                browserBackAttempt: false,
              });
            } else {
              this.props.handleChangeState({
                ...data,
                isLoggedIn: true,
                browserBackAttempt: false,
              });
              this.handleModalOk();
            }
          })
          .catch(err => {
            this.setState({ error: err.response.data.error });
            setSubmitting(false);
          });
      });
    } else {
      setSubmitting(true);
    }
  };

  handleIsworker = value => {
    this.setState({ isWorker: value });
  };

  handleOrgType = value => {
    this.setState({ orgType: value });
  };

  handleImageChange = event => {
    const verificationImage = event.target.files && event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      this.setState({
        verificationImage: dataURL,
      });
    };

    if (verificationImage) reader.readAsDataURL(verificationImage);
  };

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  getTooltipText = () => {
    return (
      <>
        <p style={{ textAlign: "center" }}>
          earwig is free for workers. All we ask is that you prove you are a
          genuine worker. This means all reviews are real and protects the
          worker community from fake reviews and spam by non-workers.
        </p>
        <p>Don't worry, you are always anonymous on earwig.</p>
      </>
    );
  };

  handleModalOk = () => {
    const { isWorker, data } = this.state;
    const {
      location: {
        state: {
          orgId,
          redirectToProfile,
          category,
          name,
          redirectToCreateProfile,
        } = {},
      } = {},
    } = this.props;

    this.props.handleChangeState({ ...data, isLoggedIn: true });
    if (redirectToProfile && orgId) {
      this.props.history.push({
        pathname: `/profile/${orgId}`,
      });
    } else if (
      redirectToCreateProfile &&
      isWorker === "yes" &&
      name &&
      category
    ) {
      this.props.history.push({
        pathname: `/add-profile-sign-up/${category}/${name}`,
      });
    } else if (isWorker === "yes") {
      this.props.history.push({
        pathname: HOME_PAGE,
        state: { isWorker },
      });
    } else {
      this.props.history.push(HOME_PAGE);
    }
  };

  render() {
    const {
      error,

      verificationImage,

      isPopupVisible,
      isWorker,
      isPasswordVisible,
      browserBackAttempt,
    } = this.state;

    const {
      location: {
        state: {
          orgId,
          redirectToProfile,
          category,
          name,
          redirectToCreateProfile,
        } = {},
      } = {},
      history,
    } = this.props;

    return (
      <SignupWrapper>
        <PurpleDiv width="50%" />
        <ContentWrapper>
          <CancelLink history={history} CancelText="Back" />
          <LogIn
            to={{
              pathname: LOGIN_URL,
              state: {
                orgId,
                redirectToProfile,
                category,
                name,
                redirectToCreateProfile,
              },
            }}
          >
            Already signed up? <span>Log in</span>
          </LogIn>
          <ReactLink to={HOME_PAGE}>
            <Logo />
          </ReactLink>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={this.handleSubmit}
          >
            {({ errors, isSubmitting, handleChange, setFieldValue }) => {
              return (
                <Form style={{ width: "100%" }}>
                  <Label htmlFor="email">
                    Email
                    <StyledField type="email" name="email" id="email" />
                    <FormikErrorMessage name="email" component="p" />
                  </Label>

                  <Label htmlFor="password">
                    Create a password
                    <Field
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                    />
                    <FormikErrorMessage
                      name="password"
                      component="p"
                      id="password"
                    />
                  </Label>

                  <CheckboxWrapper>
                    <Checkbox
                      id="passwordCheckbox"
                      type="checkbox"
                      name="passwordCheckbox"
                      value={this.state.isPasswordVisible}
                      component={CustomCheckbox}
                      onChange={this.togglePasswordVisibility}
                    />
                    <CheckboxLabel htmlFor="passwordCheckbox">
                      Show password
                    </CheckboxLabel>
                  </CheckboxWrapper>
                  <Label
                    style={{ marginTop: "1rem", marginBottom: "-0.02rem" }}
                    htmlFor="isWorker"
                  >
                    Are you are worker?
                  </Label>
                  <ButtonsWrapper style={{ display: "flex" }}>
                    <Field
                      component={RadioButton}
                      name="isWorker"
                      id="yes"
                      label="Yes"
                      onChange={e => {
                        this.handleIsworker("yes");
                        setFieldValue("orgType", null);
                        handleChange(e);
                      }}
                      option="yes"
                    />

                    <Field
                      component={RadioButton}
                      name="isWorker"
                      id="no"
                      label="No"
                      onChange={e => {
                        this.handleIsworker("no");
                        setFieldValue("orgType", null);
                        handleChange(e);
                      }}
                      option="no"
                    />
                  </ButtonsWrapper>

                  <FormikErrorMessage
                    name="isWorker"
                    component="div"
                    id="isWorker"
                  />

                  {/* start of orgs options */}
                  {isWorker && isWorker === "no" && (
                    <>
                      <Label htmlFor="orgType">Do you work for an:</Label>
                      <ButtonsWrapper style={{ display: "flex" }}>
                        <Field
                          component={RadioButton}
                          name="orgType"
                          orgType
                          id="agency"
                          label="Agency"
                          onChange={e => {
                            this.handleOrgType("agency");
                            handleChange(e);
                          }}
                          option="agency"
                        />

                        <Field
                          component={RadioButton}
                          name="orgType"
                          orgType
                          id="company"
                          label="Company"
                          onChange={e => {
                            this.handleOrgType("company");
                            handleChange(e);
                          }}
                          option="company"
                        />
                        <Field
                          component={RadioButton}
                          name="orgType"
                          orgType
                          id="payroll"
                          label="Payroll"
                          onChange={e => {
                            this.handleOrgType("payroll");
                            handleChange(e);
                          }}
                          option="payroll"
                        />
                        <Field
                          component={RadioButton}
                          name="orgType"
                          orgType
                          id="mainCompany"
                          label="Main company"
                          onChange={e => {
                            this.handleOrgType("mainCompany");
                            handleChange(e);
                          }}
                          option="mainCompany"
                        />
                        <Field
                          component={RadioButton}
                          name="orgType"
                          id="other"
                          label="Other"
                          onChange={e => {
                            this.handleOrgType("other");
                            handleChange(e);
                          }}
                          option="other"
                        />
                      </ButtonsWrapper>
                      <FormikErrorMessage
                        name="orgType"
                        component="div"
                        id="orgType"
                      />
                      {this.state.orgType === "other" && (
                        <>
                          <Field name="otherOrg" />
                          <FormikErrorMessage
                            name="otherOrg"
                            component="p"
                            id="otherOrg"
                          />
                        </>
                      )}
                    </>
                  )}
                  {isWorker && isWorker === "yes" && (
                    <>
                      <Label
                        style={{ marginTop: "1rem", marginBottom: "-0.3rem" }}
                      >
                        Please prove you are a worker{" "}
                      </Label>
                      <Paragraph>
                        Upload a photo of any of your trade cards, <br /> such
                        as your CSCS.
                      </Paragraph>
                      <PopoverDiv>
                        <PopoverComponent
                          popoverOptions={{
                            text: this.getTooltipText(),
                            linkText: "Learn more",
                            icon: "info",
                            margin: "0 0 0.5rem 0",
                          }}
                        />
                      </PopoverDiv>
                      <Field name="verificationImage">
                        {({ form }) => (
                          <>
                            <ImageInput
                              id="verificationImage"
                              type="file"
                              onChange={event => {
                                form.setFieldValue(
                                  "verificationImage",
                                  event.currentTarget.files[0],
                                );
                                this.handleImageChange(event);
                              }}
                              accept="image/*"
                            />
                            <Example src={verificationImage || example} />
                            <Button
                              as="label"
                              htmlFor="verificationImage"
                              styleType="primary"
                              text="Upload photo of trade card"
                              margin="1rem auto"
                            />
                          </>
                        )}
                      </Field>

                      <FormikErrorMessage
                        name="verificationImage"
                        component="span"
                        id="verificationImage"
                      />
                    </>
                  )}
                  {/* end of orgs options */}
                  {isWorker && (
                    <>
                      <Divider style={{ marginTop: "2rem" }} />

                      <CheckboxWrapper>
                        <Checkbox
                          id="checkbox"
                          type="checkbox"
                          name="checkbox"
                          component={CustomCheckbox}
                        />
                        <CheckboxLabel htmlFor="checkbox">
                          I agree to the earwig{" "}
                          <Link
                            target="_blank"
                            to={TERMS_OF_USE_URL}
                            text="Terms of Use"
                            type="plain"
                          />
                          . By clicking Done I acknowledge the earwig{" "}
                          <Link
                            target="_blank"
                            to={PRIVACY_URL}
                            text="Privacy Policy"
                            type="plain"
                          />
                          .
                        </CheckboxLabel>
                      </CheckboxWrapper>
                      <FormikErrorMessage name="checkbox" component="div" />
                      {/* server errors */}

                      {error && (
                        <GeneralErrorMessage>{error}</GeneralErrorMessage>
                      )}
                      {/* formik errors */}
                      {Object.values(errors).length > 0 &&
                        !(
                          Object.values(errors)[0] ===
                          "You must agree to the earwig Terms of use"
                        ) && (
                          <GeneralErrorMessage>
                            {Object.values(errors)[0]}
                          </GeneralErrorMessage>
                        )}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        styleType="primary"
                        text="Done"
                        margin="1rem auto 2rem auto"
                      />
                    </>
                  )}
                </Form>
              );
            }}
          </Formik>

          <Modal
            visible={isPopupVisible}
            footer={null}
            closable={false}
            afterClose={this.handleModalOk}
          >
            <ModalText>
              Thanks, we&apos;re checking your photo. Any reviews you give
              won&apos;t be shown on earwig until we&apos;ve checked your photo
            </ModalText>
            <Button
              styleType="primary"
              margin="1rem auto"
              text="Okay"
              onClick={this.handleModalOk}
            />
          </Modal>
        </ContentWrapper>
        <Prompt
          when={browserBackAttempt}
          message="Are you sure you want to leave this page? You will lose any unsaved data."
        />
      </SignupWrapper>
    );
  }
}
