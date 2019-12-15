import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

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
  state = {
    category: null,
    name: null,
  };

  async componentDidMount() {
    const { match, location } = this.props;
    const { state: locationState = {} } = location;
    const { name, category } = locationState;
    const { orgId } = match.params;

    // TODO if one of these are missed should send a request to backend to load info
    if (!name || !category) {
      axios
        .get(`/api/organizations/${orgId}`)
        .then(({ data: { organisation } }) => {
          const { category: _category, name: _name } = organisation;
          this.setState({ category: _category, name: _name });
        })
        .catch(err => {
          const error =
            err.response && err.response.data && err.response.data.error;
          message.error(error || "Something went wrong");
        });
    } else {
      this.setState({ category, name });
    }
  }

  render() {
    const { match, history, location } = this.props;
    const { state: locationState = {} } = location;
    const { name: _name, category: _category } = locationState;
    const { category = _category, name = _name } = this.state;

    const { orgId } = match.params;

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
