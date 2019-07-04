import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import { NavLink } from "react-router-dom";

import CancelNavbar from "./../../Common/CancelNavbar";

// nagivation routes
import {
  EDIT_TRADE_URL,
  EDIT_CITY_URL,
  EDIT_ID_URL,
  EDIT_PASSWORD_URL
} from "./../../../constants/naviagationUrls";

import {
  EditWrapper,
  BorderedWrapper,
  VerifiedWrapper,
  Section,
  TopSection,
  Title,
  Row,
  EditButton,
  DeleteButton,
  PasswordWrapper,
  LightLabel as Label,
  StyledButton as Button,
  StyledLink,
  Error,
  Option
} from "./EditProfile.style";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage
} from "./../../Common/Formik/Formik.style";

const initalValues = {
  oldPassword: "",
  newPassword: "",
  reNewPassword: "",
  verificationImage: "",
  imageFile: "",
  newUsername: ""
};

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

export default class EditProfile extends Component {
  state = {
    displayPassword: false,
    displayUsername: false
  };

  handleImageChange = event => {
    const image = event.target.files && event.target.files[0];
    var reader = new FileReader();

    reader.onload = () => {
      var dataURL = reader.result;
      this.setState({
        image: dataURL
      });
    };
    this.setState(
      {
        imageFile: image
      },
      () => {
        image && reader.readAsDataURL(image);
      }
    );
  };

  handleSubmit = (values, { setSubmitting }) => {
    const form = new FormData();

    // const arrays = Object.keys(values);
    if (
      this.state.displayPassword ||
      this.state.imageFile ||
      this.state.displayUsername
    ) {
      if (this.state.displayPassword) {
        form.append("oldPassword", values.oldPassword);
        form.append("newPassword", values.newPassword);
        form.append("reNewPassword", values.reNewPassword);
      }
      if (this.state.imageFile) {
        form.append("verificationImage", this.state.imageFile);
      }
      if (this.state.displayUsername) {
        form.append("newUsername", values.newUsername);
      }

      axios({
        method: "post",
        url: "/api/edit-profile",
        data: form,
        headers: {
          "content-type": `multipart/form-data; boundary=${form._boundary}`
        }
      })
        .then(({ data }) => {
          this.props.handleChangeState({ ...data, isLoggedIn: true });
          this.props.history.push("/my-profile");
        })
        .catch(err => {
          this.setState({ error: err.response.data.error });
          setSubmitting(false);
        });
      setSubmitting(false);
    } else {
      setSubmitting(false);
    }
  };

  togglePassword = () => {
    this.setState({ displayPassword: !this.state.displayPassword });
  };

  toggleUsername = () => {
    this.setState({ displayUsername: !this.state.displayUsername });
  };

  render() {
    let editProfileSchema;

    if (this.state.displayPassword && this.state.displayUsername) {
      editProfileSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Required"),
        newPassword: Yup.string()
          .min(6, "Password must be at least 6 characters long")
          .required("Required"),
        reNewPassword: Yup.string()
          .required("Required")
          .equalTo(Yup.ref("newPassword")),
        newUsername: Yup.string()
          .min(6, "Username must be between 6 and 15 characters long")
          .max(15, "Username must be between 6 and 15 characters long")
      });
    } else if (this.state.displayPassword) {
      editProfileSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Required"),
        newPassword: Yup.string()
          .min(6, "Password must be at least 6 characters long")
          .required("Required"),
        reNewPassword: Yup.string()
          .required("Required")
          .equalTo(Yup.ref("newPassword"))
      });
    } else if (this.state.displayUsername) {
      editProfileSchema = Yup.object().shape({
        newUsername: Yup.string()
          .min(6, "Username must be between 6 and 15 characters long")
          .max(15, "Username must be between 6 and 15 characters long")
      });
    } else {
      editProfileSchema = null;
    }

    const { userId, email, history } = this.props;

    return (
      <>
        <CancelNavbar
          history={history}
          CancelText="Back"
          title="Edit your profile"
        />
        <EditWrapper>
          <BorderedWrapper>
            <VerifiedWrapper>
              <Formik
                initialValues={initalValues}
                validationSchema={editProfileSchema}
                onSubmit={this.handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <TopSection>
                      <Row>
                        <Option>earwig ID: {userId}</Option>
                        <NavLink to={EDIT_ID_URL}>
                          <EditButton
                            type="button"
                            // onClick={this.toggleUsername}
                          >
                            Change
                          </EditButton>
                        </NavLink>
                      </Row>
                      {this.state.displayUsername && (
                        <PasswordWrapper>
                          <Label htmlFor="newUsername">
                            New Username
                            <Field
                              type="text"
                              name="newUsername"
                              id="newUsername"
                            />
                            <FormikErrorMessage
                              name="newUsername"
                              component="p"
                            />
                          </Label>
                        </PasswordWrapper>
                      )}
                    </TopSection>
                    <Section>
                      <Row>
                        <Option>Password</Option>
                        <NavLink to={EDIT_PASSWORD_URL}>
                          <EditButton
                            type="button"
                            // onClick={this.togglePassword}
                          >
                            Change
                          </EditButton>
                        </NavLink>
                      </Row>
                      {this.state.displayPassword && (
                        <PasswordWrapper>
                          <Label htmlFor="oldPassword">
                            Old Password
                            <Field
                              type="password"
                              name="oldPassword"
                              id="oldPassword"
                            />
                            <FormikErrorMessage
                              name="oldPassword"
                              component="p"
                            />
                          </Label>

                          <Label htmlFor="newPassword">
                            New Password
                            <Field
                              type="password"
                              name="newPassword"
                              id="newPassword"
                            />
                            <FormikErrorMessage
                              name="newPassword"
                              component="p"
                            />
                          </Label>

                          <Label htmlFor="reNewPassword">
                            Re-Enter New Password
                            <Field
                              type="password"
                              name="reNewPassword"
                              id="reNewPassword"
                            />
                            <FormikErrorMessage
                              name="reNewPassword"
                              component="p"
                            />
                          </Label>
                        </PasswordWrapper>
                      )}
                    </Section>
                    <Section>
                      <Row>
                        <Option>Trade</Option>
                        <NavLink to={EDIT_TRADE_URL}>
                          <EditButton type="button">Change</EditButton>
                        </NavLink>
                      </Row>
                    </Section>
                    <Section>
                      <Row>
                        <Option>Town or City</Option>
                        <NavLink to="/delete-profile">
                          <EditButton type="button">Change</EditButton>
                        </NavLink>
                      </Row>
                    </Section>
                    <Section>
                      <Row>
                        <Option>Delete my account</Option>
                        <NavLink to="/delete-profile">
                          <DeleteButton>Delete</DeleteButton>
                        </NavLink>
                      </Row>
                    </Section>
                    <div style={{ position: "relative" }}>
                      {/**
                       * @note not adding the new button here sincie this page need refactor and changing the style
                       */}
                      <Button type="submit" disabled={isSubmitting}>
                        Save Changes
                      </Button>
                      <Error>{this.state.error}</Error>
                    </div>
                  </Form>
                )}
              </Formik>
              <StyledLink to="/my-profile">Cancel Changes</StyledLink>
            </VerifiedWrapper>
          </BorderedWrapper>
        </EditWrapper>
      </>
    );
  }
}
