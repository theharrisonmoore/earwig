import React, { Component } from "react";
import * as Yup from "yup";

import {
  EditWrapper,
  Section,
  Title,
  Row,
  EditButton,
  PasswordWrapper,
  LightLabel as Label
} from "./EditProfile.style";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Button,
  GeneralErrorMessage
} from "./../../Common/Formik/Formik.style";

import cardImage from "./../../../assets/card-hand.svg";

const initalValues = { oldPassword: "", newPassword: "", reNewPassword: "" };

const editProfileSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(6)
    .required("Required"),
  reNewPassword: Yup.string()
    .required("Required")
    .equalTo(Yup.ref("password"))
});

export default class EditProfile extends Component {
  state = {
    displayPassword: false
  };

  togglePassword = () => {
    this.setState({ displayPassword: !this.state.displayPassword });
  };

  render() {
    return (
      <EditWrapper>
        <Section>
          <Title>Ramyshurafa@hotmail.com</Title>
        </Section>
        <Section>
          <Title>Ramyshurafa@hotmail.com</Title>
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
                  <Title title="Ramyshurafa@hotmail.com">
                    Ramyshurafa@hotmail.com
                  </Title>
                  <EditButton>Edit</EditButton>
                </Row>
              </Section>
              <Section>
                <Row>
                  <div className="row__image-container">
                    <img src={cardImage} alt="card icon" />
                    <Title title="Ramyshurafa@hotmail.com">
                      Ramyshurafa@hotmail.com
                    </Title>
                  </div>
                  <EditButton onClick={this.togglePassword}>Edit</EditButton>
                </Row>
                {/* old password */}
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
                      <FormikErrorMessage name="reNewPassword" component="p" />
                    </Label>
                  </PasswordWrapper>
                )}
              </Section>
              <Button type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </EditWrapper>
    );
  }
}
