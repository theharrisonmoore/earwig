import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

import { API_GET_AUDIO_URL } from "./../../../../apiUrls";

import Loading from "./../../../Common/AntdComponents/Loading";
import { Slider } from "antd";

// STYLING
import { colors, organizations } from "./../../../../theme";

// if the browser doesn't support MediaRecorder
// use the polyfill
if (window.MediaRecorder == null) {
  // safari polyfill
  window.MediaRecorder = require("audio-recorder-polyfill");
}

const Player = styled.div`
  display: flex;
  width: 100%;
  min-width: 200px;
  align-items: center;

  .ant-slider-handle {
    border: ${props =>
      props.category
        ? `2px ${organizations[props.category].primary} solid`
        : `2px ${colors.profileFontColor} solid`};
  }

  .ant-slider-track {
    background-color: ${props =>
      props.category
        ? organizations[props.category].primary
        : colors.profileFontColor};
  }

  video,
  audio {
    display: none;
  }
`;

const PlayButton = styled.div`
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: ${({ category }) =>
    category
      ? `30px solid ${organizations[category].primary}`
      : `30px solid ${colors.profileFontColor}`};
  border-radius: 3px;
  margin-right: 1rem;
`;

const StopButton = styled.div`
  width: 40px;
  height: 35px;
  background-color: ${({ category }) =>
    category ? organizations[category].primary : colors.profileFontColor};
  border-radius: 3px;
  margin-right: 1rem;
`;

export default class VoiceReview extends Component {
  state = {
    audioFile: null,
    loading: false,
    playing: "stopped",
    duration: null,
    currentTime: 0,
    progress: 0
  };

  componentDidMount() {
    const { filename } = this.props;
    axios
      .post(API_GET_AUDIO_URL, { filename })
      .then(res => {
        // LOAD THE FILE
        this.setState({
          audioFile: res.data.audio
        });

        // TRACK THE SECONDS PLAYED
        this.player.addEventListener("timeupdate", e => {
          this.setState({
            currentTime: e.target.currentTime,
            progress: (e.target.currentTime / e.target.duration) * 100
          });
        });

        // SET THE DURATION OF THE TRACK
        this.player.onloadedmetadata = () => {
          this.setState({ duration: this.player.duration });
        };
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.playing !== prevState.playing) {
      if (this.state.playing === "stopped") {
        this.player.pause();
        // this.player.currentTime = 0;
      } else if (this.state.playing === "paused") {
        this.player.pause();
      } else {
        this.player.play();
      }
    }
  }

  togglePlay = () => {
    const { playing } = this.state;

    if (playing === "playing") {
      this.setState({ playing: "stopped" });
    } else {
      this.setState({ playing: "playing" });
    }
  };

  getTime = time => {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  };

  // function when user clicks slider
  handleSlide = value => {
    const { duration } = this.state;

    // set the new time
    const actualTime = (value / 100) * duration;

    // also pause the track if playing
    this.setState({
      currentTime: actualTime,
      playing: "paused",
      progress: value
    });
  };

  render() {
    const { audioFile, loading, playing, progress } = this.state;

    const { category } = this.props;

    if (loading) return <Loading />;

    return (
      <>
        <Player category={category}>
          {playing === "playing" ? (
            <StopButton onClick={this.togglePlay} category={category} />
          ) : (
            <PlayButton onClick={this.togglePlay} category={category} />
          )}
          <Slider
            value={progress}
            style={{ width: "100%" }}
            onChange={this.handleSlide}
            onAfterChange={this.handleAfterSlide}
          />
          <audio
            id="player"
            ref={ref => (this.player = ref)}
            src={audioFile}
            preload="metadata"
          />
        </Player>
      </>
    );
  }
}
