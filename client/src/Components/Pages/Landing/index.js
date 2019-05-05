import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";

import {
  Wrapper,
  Logo,
  TopWrapper,
  Title,
  Paragraph,
  StyledLink as Link,
  SmallLink,
  FormWrapper,
  HalfDiv,
  Video,
  VideoWrapper,
  WhiteWrapper,
  SectionTitle,
  PromiseParagraph,
  Award,
  AwardDiv,
  AwardsWrapper,
  AwardTitle,
  LabelTitle
} from "./Landing.style";

import LogoImg from "./../../../assets/logo-white.png";

import { colors } from "./../../../theme";

import Icon from "./../../Common/Icon/Icon";

import {
  StyledFormik as Formik,
  StyledForm as Form,
  StyledField as Field,
  StyledFormikErrorMessage as FormikErrorMessage,
  Label,
  Button,
  GeneralErrorMessage,
  StyledField
} from "./../../Common/Formik/Formik.style";

import {
  ADMIN,
  SEARCH_URL,
  SIGNUP_URL,
  RESET_PASSWORD_URL
} from "./../../../constants/naviagationUrls";

const initalValues = { email: "", password: "" };

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

export default class index extends Component {
  state = {
    error: ""
  };

  handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("/api/login", values)
      .then(({ data }) => {
        this.props.handleChangeState({ ...data, isLoggedIn: true });
        const { isAdmin } = data;
        this.props.history.push(isAdmin ? ADMIN : SEARCH_URL);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        setSubmitting(false);
      });
  };

  render() {
    const { error } = this.state;

    const { isMobile, isTablet } = this.props;

    return (
      <Wrapper>
        <Logo src={LogoImg} alt="logo" isMobile={isMobile} />
        {isMobile || isTablet ? (
          <TopWrapper>
            <Title>Every voice counts</Title>
            <Paragraph>
              earwig is a reviews platform giving a voice to construction
              workers. They can show which agencies, payrolls, worksites, and
              companies to trust and why. Join the community of verified workers
              shaping construction and making work more secure.
            </Paragraph>
          </TopWrapper>
        ) : (
          <TopWrapper direction="row" isMobile={isMobile}>
            <HalfDiv>
              <Title>Every voice counts</Title>
              <Paragraph>
                earwig is a reviews platform giving a voice to construction
                workers. They can show which agencies, payrolls, worksites, and
                companies to trust and why. Join the community of verified
                workers shaping construction and making work more secure.
              </Paragraph>
            </HalfDiv>
            <HalfDiv>
              <VideoWrapper>
                <Video
                  src="https://www.youtube.com/embed/9eBzZOwaTpw?controls=0"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </VideoWrapper>
            </HalfDiv>
          </TopWrapper>
        )}
        <FormWrapper>
          <Formik
            initialValues={initalValues}
            validationSchema={loginSchema}
            onSubmit={this.handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Label htmlFor="email">
                  <LabelTitle>Email</LabelTitle>
                  <StyledField type="email" name="email" id="email" />
                  <FormikErrorMessage name="email" component="p" />
                </Label>
                <Label htmlFor="password">
                  <LabelTitle>Password</LabelTitle>
                  <Field type="password" name="password" />
                  <FormikErrorMessage
                    name="password"
                    component="p"
                    id="password"
                  />
                </Label>
                <SmallLink to={RESET_PASSWORD_URL} disabled>
                  Forget password?
                </SmallLink>
                {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  color={colors.white}
                  background={colors.dodgerBlue}
                  border="none"
                >
                  Log in
                </Button>
              </Form>
            )}
          </Formik>
        </FormWrapper>
        <p className="paragraph">
          Don’t have an account?
          <Link to={SIGNUP_URL}>Create an account</Link>
        </p>
        <Icon icon="orWhite" margin="2rem 0 2rem 0" width="280" height="58" />
        <Link to={SEARCH_URL}>Continue without an account</Link>
        {isMobile || isTablet ? (
          <VideoWrapper>
            <Video
              src="https://www.youtube.com/embed/9eBzZOwaTpw?controls=0"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </VideoWrapper>
        ) : (
          <></>
        )}
        <WhiteWrapper>
          <SectionTitle>earwig's promises</SectionTitle>
          <PromiseParagraph>
            You’ll only see verified worker-led information <br />
            Your reviews will always be seen by industry <br />
            You’ll always be protected by anonymity
          </PromiseParagraph>
        </WhiteWrapper>
        <AwardsWrapper>
          <SectionTitle color={colors.white}>earwig's awards</SectionTitle>
          <AwardDiv isMobile={isMobile}>
            <Award isMobile={isMobile}>
              <Icon
                icon="medalIcon1"
                color={colors.white}
                height="50"
                width="50"
                margin="1rem 0 0.5rem 0"
              />
              <AwardTitle>
                Our Place in the World: Future of Work 2017
              </AwardTitle>
            </Award>
            <Award isMobile={isMobile}>
              <Icon
                icon="trophyIcon1"
                color={colors.white}
                height="50"
                width="50"
                margin="1rem 0 0.5rem 0"
              />
              <AwardTitle>UnLtd Do It Award 2017</AwardTitle>
            </Award>
            <Award isMobile={isMobile}>
              <Icon
                icon="medalIcon2"
                color={colors.white}
                height="50"
                width="50"
                margin="1rem 0 0.5rem 0"
              />
              <AwardTitle>RSA Economic Security Accelerator 2019</AwardTitle>
            </Award>
            <Award isMobile={isMobile}>
              <Icon
                icon="trophyIcon2"
                color={colors.white}
                height="50"
                width="50"
                margin="1rem 0 0.5rem 0"
              />
              <AwardTitle>BGV Worker Tech for Good 2019</AwardTitle>
            </Award>
          </AwardDiv>
        </AwardsWrapper>
        <WhiteWrapper>
          <p>© earwig 2017-2019</p>
        </WhiteWrapper>
      </Wrapper>
    );
  }
}
