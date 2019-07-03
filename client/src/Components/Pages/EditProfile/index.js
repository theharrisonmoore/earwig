import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import { NavLink } from "react-router-dom";

import {
  EditWrapper,
  VerifiedWrapper,
  Section,
  Title,
  Row,
  EditButton,
  DeleteButton,
  PasswordWrapper,
  LightLabel as Label,
  StyledButton as Button,
  StyledLink,
  Error
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
  imageFile: ""
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
    displayPassword: false
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
    if (this.state.displayPassword || this.state.imageFile) {
      if (this.state.displayPassword) {
        form.append("oldPassword", values.oldPassword);
        form.append("newPassword", values.newPassword);
        form.append("reNewPassword", values.reNewPassword);
      }
      if (this.state.imageFile) {
        form.append("verificationImage", this.state.imageFile);
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

  render() {
    const editProfileSchema = Yup.object().shape(
      this.state.displayPassword
        ? {
            oldPassword: Yup.string().required("Required"),
            newPassword: Yup.string()
              .min(6)
              .required("Required"),
            reNewPassword: Yup.string()
              .required("Required")
              .equalTo(Yup.ref("newPassword"))
          }
        : null
    );

    const { userId, email } = this.props;

    return (
      <EditWrapper>
        <VerifiedWrapper>
          <Section>
            <Title>ID: {userId}</Title>
          </Section>
          <Section>
            <Title title={email}>{email}</Title>
          </Section>
          <Formik
            initialValues={initalValues}
            validationSchema={editProfileSchema}
            onSubmit={this.handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Section>
                  <Row>
                    <Title>Password</Title>
                    <EditButton type="button" onClick={this.togglePassword}>
                      Edit
                    </EditButton>
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
                        <FormikErrorMessage name="oldPassword" component="p" />
                      </Label>

                      <Label htmlFor="newPassword">
                        New Password
                        <Field
                          type="password"
                          name="newPassword"
                          id="newPassword"
                        />
                        <FormikErrorMessage name="newPassword" component="p" />
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
                    <Title>Delete my earwig account</Title>
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
      </EditWrapper>
    );
  }
}
