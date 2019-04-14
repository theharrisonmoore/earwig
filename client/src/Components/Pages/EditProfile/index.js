import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";

import {
  EditWrapper,
  VerifiedWrapper,
  UnVerifiedWrapper,
  Section,
  Title,
  Row,
  EditButton,
  PasswordWrapper,
  LightLabel as Label,
  ImageInput,
  StyledButton as Button,
  StyledLink,
  StatusWrapper,
  Status,
  UnVerifiedTitle,
  Paragraph,
  UnVerifiedButton
} from "./EditProfile.style";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  GeneralErrorMessage
} from "./../../Common/Formik/Formik.style";

import cardImage from "./../../../assets/card-hand.svg";

const initalValues = {
  oldPassword: "",
  newPassword: "",
  reNewPassword: "",
  image: ""
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

  handleSubmit = (values, { setSubmitting }) => {
    // axios
    //   .post("/api/edit-profile", values)
    //   .then(({ data }) => {
    //     this.props.handleChangeState({ ...data, isLoggedIn: true });
    //     this.props.history.push(`/intro`);
    //   })
    //   .catch(err => {
    //     this.setState({ error: err.response.data.error });
    //     setSubmitting(false);
    //   });
    console.log(values);
    setSubmitting(false);
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

    const { userId, email, verified } = this.props;
    console.log(this.props);

    return (
      <EditWrapper>
        {verified ? (
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
                      <div className="row__image-container">
                        <img src={cardImage} alt="card icon" />
                        <Title>Verification photo</Title>
                      </div>
                      <Field
                        name="image"
                        render={({ field, form: { isSubmitting } }) => (
                          <ImageInput
                            {...field}
                            type="file"
                            placeholder="lastName"
                            accept="image/*"
                            id="image"
                          />
                        )}
                      />
                      <FormikErrorMessage name="image" component="p" />
                      <EditButton htmlFor="image" as="label">
                        Edit
                      </EditButton>
                    </Row>
                  </Section>
                  <Button type="submit" disabled={isSubmitting}>
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
            <StyledLink to="/profile">Cancel Changes</StyledLink>
          </VerifiedWrapper>
        ) : (
          <UnVerifiedWrapper>
            <StatusWrapper>
              <Status>Unverified</Status>
            </StatusWrapper>
            <UnVerifiedTitle>Your reviews and impact</UnVerifiedTitle>
            <Paragraph>
              If you want to search jobs, help other workers by giving reviews
              and comment on other reviews, you need to get verified as a
              genuine worker.
              <br />
              <br />
              This protects the worker community from fake reviews and spam by
              non-workers.
            </Paragraph>
            <UnVerifiedButton to="/upload-verification-photo">
              <img src={cardImage} alt="card icon" />
              <Title>Verification photo</Title>
            </UnVerifiedButton>
          </UnVerifiedWrapper>
        )}
      </EditWrapper>
    );
  }
}
