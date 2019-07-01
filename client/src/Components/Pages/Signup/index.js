// Render Prop
import React, { Component } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Checkbox as AntCheckbox, Modal, Alert, Input, Icon } from "antd";

import Logo from "./../../Common/Logo";
import Select from "./../../Common/Select";

import { TERMS_OF_USE_URL } from "./../../../constants/naviagationUrls";
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
  CheckboxLabel,
  StyledField
} from "../../Common/Formik/Formik.style";

import {
  StyledLink as Link,
  SignupWrapper,
  LinkSpan,
  ContentWrapper,
  BlankDiv,
  OptionsWrapper,
  StyledInput,
  ButtonsWrapper,
  SelectWrapper,
  SubHeading,
  Paragraph,
  Example,
  ImageInput
} from "./Signup.style";

import example from "./../../../assets/example.png";

import { API_SIGN_UP } from "./../../../apiUrls";

const { API_TRADE_URL } = require("../../../apiUrls");

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
    .oneOf([true], "Must accept Terms and Conditions"),
  isWorker: Yup.string()
    .required("Required")
    .oneOf(["yes", "no"], "Must select an option"),
  orgType: Yup.string()
    .required("Required")
    .oneOf(
      ["agency", "payroll", "company", "mainContractor", "other"],
      "Invalid organisation type"
    ),
  otherOrg: Yup.string().test(
    "otherOrg",
    "Enter the organisation you are working for",
    function(otherOrg) {
      const orgType = this.resolve(Yup.ref("orgType"));
      if (orgType === "other" && !otherOrg) {
        return false;
      }
      return true;
    }
  ),
  trade: Yup.string().test("trade", "Required", function(trade) {
    const isWorker = this.resolve(Yup.ref("isWorker"));
    if (isWorker === "yes" && !trade) {
      return false;
    }
    return true;
  }),
  city: Yup.string().test("city", "Required", function(city) {
    const isWorker = this.resolve(Yup.ref("isWorker"));

    if (isWorker === "yes" && !city) {
      return false;
    }
    return true;
  }),
  verificationImage: Yup.mixed().test("verificationImage", "Required", function(
    verificationImage
  ) {
    const isWorker = this.resolve(Yup.ref("isWorker"));

    if (isWorker === "yes" && !verificationImage) {
      return false;
    }
    return true;
  })
});

const initialValues = {
  email: "",
  password: "",
  rePassword: "",
  checkbox: false,
  isWorker: "yes",
  orgType: "agency",
  otherOrg: "",
  trade: "",
  city: "",
  verificationImage: undefined
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
        className={"radio-button"}
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
    isWorker: "yes",
    orgType: "agency",
    ismodalVisible: false,
    error: "",
    errors: {}
  };

  handleSubmit = (values, { setSubmitting }) => {
    const { referral } = this.props.match.params;
    const form = new FormData();

    let { from } = this.props.location.state || {
      from: { pathname: "/intro" }
    };

    if (referral) {
      values.referral = referral;
    }

    if (values.checkbox) {
      setSubmitting(true);

      Object.entries(values).forEach(pair => {
        pair[1] && form.append(pair[0], pair[1]);
      });

      this.setState({ error: "" }, () => {
        axios({
          method: "post",
          url: API_SIGN_UP,
          data: form,
          headers: {
            "content-type": `multipart/form-data; boundary=${form._boundary}`
          }
        })
          .then(({ data }) => {
            this.props.handleChangeState({ ...data, isLoggedIn: true });
            this.props.history.push(from.pathname);
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
    this.setState({ tradeId: value });
  };

  showModal = () => {
    this.setState({
      ismodalVisible: true
    });
  };

  handleOk = () => {
    if (this.state.newTrade && this.state.newTrade.length >= 3) {
      this.setState(
        {
          confirmLoading: true
        },
        () => {
          axios
            .post(API_TRADE_URL, { trade: this.state.newTrade })
            .then(res => {
              const { data } = res;

              this.setState({
                trades: [{ value: data._id, label: data.title }],
                tradeId: data._id,
                disableSelect: true
              });

              this.setState(
                {
                  newTradeSuccess: true
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      newTradeSuccess: false,
                      ismodalVisible: false,
                      confirmLoading: false
                    });
                  }, 1000);
                }
              );
            })
            .catch(err => {
              this.setState(
                {
                  newTradeSuccess: false,
                  newTradeError: err.response.data.error
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      ismodalVisible: false,
                      confirmLoading: false
                    });
                  }, 1000);
                }
              );
            });
        }
      );
    } else if (this.state.newTrade.length < 3) {
      this.setState({
        newTradeError: "Trade must be at least 3 characters long"
      });
    }
  };

  handleCancel = () => {
    this.setState({
      ismodalVisible: false,
      newTradeSuccess: false,
      newTradeError: ""
    });
  };

  addNewTradeHandler = event => {
    const { value } = event.target;
    this.setState({ newTrade: value, newTradeError: "" });
  };

  handleImageChange = event => {
    const verificationImage = event.target.files && event.target.files[0];
    var reader = new FileReader();

    reader.onload = () => {
      var dataURL = reader.result;
      this.setState({
        verificationImage: dataURL
      });
    };

    verificationImage && reader.readAsDataURL(verificationImage);
  };

  render() {
    const {
      error,
      ismodalVisible,
      confirmLoading,
      verificationImage
    } = this.state;

    return (
      <SignupWrapper>
        <BlankDiv />
        <ContentWrapper>
          <Logo />
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={this.handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form style={{ width: "100%" }}>
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
                    option={"yes"}
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
                    option={"no"}
                  />
                </ButtonsWrapper>

                <FormikErrorMessage
                  name="isWorker"
                  component="div"
                  id="isWorker"
                />

                {/* start of orgs options */}
                {this.state.isWorker === "no" && (
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
                        option={"agency"}
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
                        option={"company"}
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
                {this.state.isWorker === "yes" && (
                  <>
                    <SelectWrapper>
                      <Label htmlFor="trade">
                        Trade
                        {/* <Select
                          placeholder={"Select your trade"}
                          options={this.state.trades}
                          handleChange={this.handleChange}
                          value={this.state.tradeId}
                          disabled={this.state.disableSelect}
                          isCreateNew
                          showSearch
                          addHandler={this.showModal}
                        /> */}
                        <Field name="trade">
                          {({ field, form, onChange }) => (
                            <>
                              <Select
                                id="trade"
                                name="trade"
                                placeholder={"Select your trade"}
                                options={this.state.trades}
                                handleChange={value => {
                                  form.setFieldValue("trade", value);
                                  this.handleChange(value);
                                }}
                                value={this.state.tradeId}
                                disabled={this.state.disableSelect}
                                isCreateNew
                                showSearch
                                addHandler={this.showModal}
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
                              onOk={this.handleOk}
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
                              />
                            </Modal>
                          </div>
                        </div>
                      </Label>
                    </SelectWrapper>

                    <Label htmlFor="city">
                      Your town or city
                      <Field type="city" name="city" />
                      <FormikErrorMessage name="city" component="p" id="city" />
                    </Label>

                    <SubHeading>Verification Photo</SubHeading>
                    <Paragraph>
                      Please upload a photo of your face holding your trade ID
                      like the example below. Please no glare or blur!
                      <br />
                      <br />
                      Once we’ve verified you, we’ll delete your photo to
                      protect your anonymity.
                    </Paragraph>

                    <Field name="verificationImage">
                      {({ field, form, onChange }) => (
                        <>
                          <Example
                            src={
                              verificationImage ? verificationImage : example
                            }
                          />
                          <Button as="label" htmlFor="verificationImage">
                            Upload photo for verification{" "}
                            {verificationImage && (
                              <Icon
                                type="check"
                                style={{ color: "green", fontSize: "23px" }}
                              />
                            )}
                          </Button>
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
                      To protect your identity, we’ll randomly assign you an
                      earwig ID, which is the only thing shown beside your
                      reviews and activity.
                    </Paragraph>
                  </>
                )}
                {/* end of orgs options */}
                <CheckboxWrapper>
                  <Checkbox
                    id="checkbox"
                    type="checkbox"
                    name="checkbox"
                    component={CustomCheckbox}
                  />
                  <CheckboxLabel htmlFor="checkbox">
                    I agree to the earwig{" "}
                    <LinkSpan target="_blank" to={TERMS_OF_USE_URL}>
                      Terms of Use.
                    </LinkSpan>
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
          <Link to="/intro">Continue without an account</Link>
        </ContentWrapper>
      </SignupWrapper>
    );
  }
}
