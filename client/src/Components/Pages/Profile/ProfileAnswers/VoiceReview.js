import React, { Component } from "react";
import axios from "axios";
// import styled from "styled-components";
import { Howl } from "howler";

import { API_GET_AUDIO_URL } from "./../../../../apiUrls";

import Loading from "./../../../Common/AntdComponents/Loading";
// import { Slider } from "antd";

// STYLING
// import { colors, organizations } from "./../../../../theme";

// const Player = styled.div`
//   display: flex;
//   width: 100%;
//   min-width: 200px;
//   align-items: center;
//   min-width: 252px;
//   max-width: 350px;
//   width: 100%;
//   position: relative;

//   .ant-slider-handle {
//     border: ${props =>
//       props.category
//         ? `2px ${organizations[props.category].primary} solid`
//         : `2px ${colors.profileFontColor} solid`};
//   }
//   .ant-slider-track {
//     background-color: ${props =>
//       props.category
//         ? organizations[props.category].primary
//         : colors.profileFontColor};
//   }
// `;

// const PlayButton = styled.div`
//   width: 0;
//   height: 0;
//   border-top: 20px solid transparent;
//   border-bottom: 20px solid transparent;
//   border-left: ${({ category }) =>
//     category
//       ? `30px solid ${organizations[category].primary}`
//       : `30px solid ${colors.profileFontColor}`};
//   border-radius: 3px;
//   margin-right: 1rem;
// `;

// const StopButton = styled.div`
//   width: 40px;
//   height: 35px;
//   background-color: ${({ category }) =>
//     category ? organizations[category].primary : colors.profileFontColor};
//   border-radius: 3px;
//   margin-right: 1rem;
// `;

export default class VoiceReview extends Component {
  state = {
    loading: false,
    playing: "stopped",
    duration: null,
    currentTime: 0,
    progress: 0,
    loaded: false
  };

  componentDidMount() {
    const { filename } = this.props;
    axios
      .post(API_GET_AUDIO_URL, { filename })
      .then(res => {
        this.setState({ soundFile: res.data.audio });
      })
      .catch(err => console.log(err));
  }

  loadSound = () => {
    const { soundFile } = this.state;
    this.sound = new Howl({
      src: [soundFile]
    });

    this.getDuration(soundFile, duration => {
      if (!Number.isNaN(duration)) {
        this.setState({ duration });
      }
    });

    this.sound.on("play", this.step);
    this.sound.on("load", () => {
      this.setState({ loaded: true });
      this.sound.play();
    });
  };

  step = () => {
    // Determine our current seek position.
    var seek = this.sound.seek() || 0;
    // If the sound is still playing, continue stepping.
    if (this.sound.playing()) {
      this.setState({ progress: Math.round(seek) }, () =>
        setTimeout(() => {
          requestAnimationFrame(this.step);
        }, 1000)
      );
    }
  };

  componentWillUnmount() {
    this.sound && this.sound.off("play");
    this.sound && this.sound.off("load");
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaded } = this.state;
    if (this.state.playing !== prevState.playing) {
      if (this.state.playing === "stopped") {
        this.sound.pause();
      } else if (this.state.playing === "paused") {
        this.sound.pause();
      } else {
        if (!loaded) {
          this.loadSound();
        }
        this.sound.play();
      }
    }
  }

  // get audio duration
  // https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
  getDuration = function(url, next) {
    var _player = new Audio(url);
    _player.addEventListener(
      "durationchange",
      function(e) {
        if (this.duration !== Infinity) {
          var duration = this.duration;
          _player.remove();
          next(duration);
        }
      },
      false
    );
    _player.load();
    _player.currentTime = 24 * 60 * 60;
    _player.volume = 0;
    _player.play();
  };

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
      // playing: "paused",
      progress: value
    });

    this.sound.seek(value);
  };

  getSeconds = time =>
    `0${new Date(Math.round(time * 1000)).getSeconds()}`.slice(-2);

  getMinutes = time =>
    `0${new Date(Math.round(time * 1000)).getMinutes()}`.slice(-2);

  formatter = value => `${this.getMinutes(value)}:${this.getSeconds(value)}`;

  render() {
    const {
      loading,
      // playing,
      // progress,
      // duration,
      // loaded,
      soundFile
    } = this.state;

    // const durationSeconds = this.getSeconds(duration);
    // const durationMinutes = this.getMinutes(duration);
    // const { category } = this.props;

    if (loading) return <Loading />;
    if (!soundFile) return <div>No voice review</div>;
    return (
      <div style={{ minWidth: "350px" }}>
        <audio
          style={{ minWidth: "350px" }}
          controls
          src={soundFile}
          type={this.state.mimeType}
          // duration={this.state.duration}
        />
        {/* <Player category={category}>
          {playing === "playing" ? (
            <StopButton onClick={this.togglePlay} category={category} />
          ) : (
            <PlayButton onClick={this.togglePlay} category={category} />
          )}
          {!Number.isNaN(duration) && (
            <Slider
              value={progress}
              style={{ width: "100%" }}
              onChange={this.handleSlide}
              onAfterChange={this.handleAfterSlide}
              max={duration}
              tipFormatter={this.formatter}
              tooltipVisible={this.sound && this.sound.playing()}
            />
          )}
          {loaded && !Number.isNaN(duration) && (
            <div style={{ position: "absolute", right: "0", bottom: "-11px" }}>
              {durationMinutes}:{durationSeconds}
            </div>
          )}
        </Player> */}
      </div>
    );
  }
}
