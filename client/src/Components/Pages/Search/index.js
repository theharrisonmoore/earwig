import React, { Component } from "react";
import { SearchWrapper } from "./Search.style";
import axios from "axios";

export default class Search extends Component {
  state = {
    loaded: false,
    data: null
  };

  componentDidMount() {
    axios.get("/api/search").then(organizations => {
      this.setState({
        data: organizations.data,
        loaded: true
      });
    });
  }

  render() {
    console.log(this.state);
    const { loaded } = this.state;

    if (!loaded) return <p>loading...</p>;

    return <SearchWrapper />;
  }
}
