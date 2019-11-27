import React, { Component } from "react";
import { Link } from "react-router-dom";

import Layout from "../../Common/Layout";
import Button from "../../Common/Button";

import {
  Wrapper,
  Body,
  Header,
  Title,
  SubTitile,
  Content,
} from "./PreReview.style";

export default class PreReview extends Component {
  render() {
    const { match, location, history } = this.props;
    const { state: locationState } = location;
    const { name, category } = locationState;
    const { orgId } = match.params;

    // TODO if one of these are missed should send a request to backend to load info
    if (!name || !category || !orgId) {
      history.goBack();
      return null;
    }

    return (
      <Layout type="center" maxWidth="57rem">
        <Wrapper>
          <Body>
            <Header category={category}>
              <Title>
                You’re about to give a review about the {category}
                <br />
                {name}
              </Title>
              <SubTitile>
                Make it as detailed as possible to help workers and they’ll give
                you points you can redeem for rewards.
              </SubTitile>
            </Header>
          </Body>
          <Content>
            <Link to={`/organization/${orgId}/review`}>
              <Button styleType="primary" text="Start your review" />
            </Link>

            <Button
              styleType="secondary"
              text="Cancel"
              onClick={history.goBack}
            />
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
