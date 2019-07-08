import React, { Component } from "react";
import axios from "axios";

import { API_GET_AUDIO_URL } from "./../../../../apiUrls";

import Loading from "./../../../Common/AntdComponents/Loading";

export default class VoiceReview extends Component {
  state = {
    audioFile: null,
    loading: false
  };

  componentDidMount() {
    const { filename } = this.props;
    axios
      .post(API_GET_AUDIO_URL, { filename })
      .then(res => {
        console.log("AUDIO", res);
        this.setState({ audioFile: res.data.audio });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { audioFile, loading } = this.state;

    if (loading) return <Loading />;

    return <audio id="player" controls src={audioFile} />;
  }
}
