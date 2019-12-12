// Render Prop
import React, { Component } from "react";
import { Prompt } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Modal, Alert, Input, Divider } from "antd";

import Logo from "../../Common/Logo";
import CancelLink from "../../Common/CancelLink";

import Select from "../../Common/Select";
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
  SelectWrapper,
  SubHeading,
  Paragraph,
  Example,
  ImageInput,
  ModalText,
  LogIn,
} from "./Signup.style";

import example from "../../../assets/example.png";

import { API_SIGN_UP } from "../../../apiUrls";

import {
  WELCOME_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
  LOGIN_URL,
  INTRO_URL,
} from "../../../constants/naviagationUrls";

const { API_TRADE_URL } = require("../../../apiUrls");

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
    .required("You must select an organisation type")
    .oneOf(
      ["agency", "payroll", "company", "mainContractor", "other"],
      "Invalid organisation type"
    ),
  otherOrg: Yup.string(),
  trade: Yup.string().test("trade", "You must choose your trade", function(
    trade
  ) {
    const isWorker = this.resolve(Yup.ref("isWorker"));
    if (isWorker === "yes" && !trade) {
      return false;
    }
    return true;
  }),
  verificationImage: Yup.mixed().test(
    "verificationImage",
    "You must upload a verification photo",
    function(verificationImage) {
      const isWorker = this.resolve(Yup.ref("isWorker"));

      if (isWorker === "yes" && !verificationImage) {
        return false;
      }
      return true;
    }
  ),
});

const initialValues = {
  email: "",
  password: "",
  checkbox: false,
  isWorker: null,
  orgType: "agency",
  otherOrg: "",
  trade: "",
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
    ismodalVisible: false,
    newTrade: "",
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
              this.props.history.push(WELCOME_URL);
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

  componentDidMount() {
    axios.get(API_TRADE_URL).then(res => {
      const { data } = res;
      const trades = data.reduce((accu, current) => {
        accu.push({ value: current._id, label: current.title });
        return accu;
      }, []);
      this.setState({ trades });
    });
  }

  handleChange = value => {
    this.setState({ trade: value });
  };

  showModal = e => {
    const { searchTerm } = e.target.dataset;
    this.setState({
      ismodalVisible: true,
      newTrade: searchTerm,
    });
  };

  handleOk = setFieldValue => {
    if (this.state.newTrade && this.state.newTrade.length >= 3) {
      this.setState(
        {
          confirmLoading: true,
        },
        () => {
          axios
            .post(API_TRADE_URL, { trade: this.state.newTrade })
            .then(res => {
              const { data } = res;

              this.setState({
                trades: [{ value: data._id, label: data.title }],
                trade: data._id,
                disableSelect: true,
              });
              setFieldValue("trade", data._id);

              this.setState(
                {
                  newTradeSuccess: true,
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      newTradeSuccess: false,
                      ismodalVisible: false,
                      confirmLoading: false,
                    });
                  }, 1000);
                }
              );
            })
            .catch(err => {
              this.setState(
                {
                  newTradeSuccess: false,
                  newTradeError: err.response.data.error,
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      ismodalVisible: false,
                      confirmLoading: false,
                    });
                  }, 1000);
                }
              );
            });
        }
      );
    } else if (this.state.newTrade.length < 3) {
      this.setState({
        newTradeError: "Trade must be at least 3 characters long",
      });
    }
  };

  handleCancel = () => {
    this.setState({
      ismodalVisible: false,
      newTradeSuccess: false,
      newTradeError: "",
    });
  };

  addNewTradeHandler = event => {
    const { value } = event.target;
    this.setState({ newTrade: value, newTradeError: "" });
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
        <p>
          earwig is free for workers. All we ask is that you get verified as a
          genuine worker. This means all reviews are credible and protects the
          worker community from fake reviews and spam by non-workers.
        </p>
        <p>
          You can hold up any card or ticket that shows you are a worker, eg
          CSCS card.
        </p>
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
    } else if (redirectToCreateProfile && isWorker && name && category) {
      this.props.history.push({
        pathname: `/add-profile-sign-up/${category}/${name}`,
      });
    } else {
      this.props.history.push({
        pathname: INTRO_URL,
        state: { isWorker },
      });
    }
  };

  render() {
    const {
      error,
      ismodalVisible,
      confirmLoading,
      verificationImage,
      newTrade,
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
          <Logo />
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
                  <Label htmlFor="isWorker">Are you are worker?</Label>
                  <ButtonsWrapper style={{ display: "flex" }}>
                    <Field
                      component={RadioButton}
                      name="isWorker"
                      id="yes"
                      label="Yes"
                      onChange={e => {
                        this.handleIsworker("yes");
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
                          id="mainContractor"
                          label="Main contractor"
                          onChange={e => {
                            this.handleOrgType("mainContractor");
                            handleChange(e);
                          }}
                          option="mainContractor"
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
                      <SelectWrapper>
                        <Label htmlFor="trade">
                          Trade
                          <Field name="trade">
                            {({ form }) => (
                              <>
                                <Select
                                  id="trade"
                                  name="trade"
                                  placeholder="Choose your trade"
                                  options={this.state.trades}
                                  handleChange={value => {
                                    form.setFieldValue("trade", value);
                                    this.handleChange(value);
                                  }}
                                  value={this.state.trade}
                                  disabled={this.state.disableSelect}
                                  isCreateNew
                                  showSearch
                                  addHandler={this.showModal}
                                  // onBlur={this.showModal}
                                  ismodalVisible={ismodalVisible}
                                />
                              </>
                            )}
                          </Field>
                          <FormikErrorMessage
                            name="trade"
                            component="div"
                            id="trade"
                          />
                          <div>
                            <div>
                              <Modal
                                title="Add new trade"
                                visible={ismodalVisible}
                                onOk={() => this.handleOk(setFieldValue)}
                                confirmLoading={confirmLoading}
                                onCancel={this.handleCancel}
                              >
                                {this.state.newTradeError && (
                                  <>
                                    <Alert
                                      message={this.state.newTradeError}
                                      type="error"
                                      showIcon
                                    />
                                    <br />
                                  </>
                                )}
                                {this.state.newTradeSuccess && (
                                  <>
                                    <Alert
                                      message="Trade added successfully"
                                      type="success"
                                      showIcon
                                    />
                                    <br />
                                  </>
                                )}
                                <Input
                                  autoFocus
                                  placeholder="Add your trade..."
                                  allowClear
                                  onChange={this.addNewTradeHandler}
                                  value={newTrade}
                                />
                              </Modal>
                            </div>
                          </div>
                        </Label>
                      </SelectWrapper>

                      <SubHeading>Upload a verification photo</SubHeading>
                      <Paragraph>
                        Please upload a photo of your face holding your trade ID
                        like the example below. Once we’ve verified you, we’ll
                        delete the photo to protect your anonymity.
                      </Paragraph>
                      <PopoverComponent
                        popoverOptions={{
                          text: this.getTooltipText(),
                          linkText: "Learn more",
                          icon: "info",
                          margin: "0 0 0.5rem 0",
                        }}
                      />

                      <Field name="verificationImage">
                        {({ form }) => (
                          <>
                            <Button
                              as="label"
                              htmlFor="verificationImage"
                              styleType="secondary"
                              text="Upload photo"
                              margin="1rem auto"
                            />
                            <ImageInput
                              id="verificationImage"
                              type="file"
                              onChange={event => {
                                form.setFieldValue(
                                  "verificationImage",
                                  event.currentTarget.files[0]
                                );
                                this.handleImageChange(event);
                              }}
                              accept="image/*"
                            />
                            <Example src={verificationImage || example} />
                          </>
                        )}
                      </Field>

                      <FormikErrorMessage
                        name="verificationImage"
                        component="span"
                        id="verificationImage"
                      />
                      <SubHeading>Protecting you from blacklisting</SubHeading>
                      <Paragraph>
                        To hide your identity, we’ll randomly assign you a
                        username, which is the only thing shown on earwig.
                      </Paragraph>
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
