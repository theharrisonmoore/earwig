import React from "react";
// import Recorder from "recorder-js";

import Recorder from "./recorder";

// let startBtn = document.querySelector(".js-start");
// let stopBtn = document.querySelector(".js-stop");
// let codeBtn = document.querySelector(".js-code");
// let pre = document.querySelector("pre");

class NewAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [], src: "" };
    this.recorder = null;
    this.context = null;

    window.URL = window.URL || window.webkitURL;

    /**
     * Detecte the correct AudioContext for the browser
     * */

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
  }

  onFail = e => {
    alert("Error " + e);
    console.log("Rejected!", e);
  };

  onSuccess = s => {
    console.log("Recording...", s);
    let tracks = s.getTracks();
    this.setState({ tracks });
    console.log("tracks", tracks);
    // startBtn.setAttribute("disabled", true);
    // stopBtn.removeAttribute("disabled");
    this.context = new AudioContext();
    // console.log("context", this.context);
    let mediaStreamSource = this.context.createMediaStreamSource(s);
    this.recorder = new Recorder(mediaStreamSource);
    console.log("this.recoreder", this.recorder);

    this.recorder.record();
    // this.handleStopClick(tracks);
  };

  handleStartClick = () => {
    if (navigator.getUserMedia) {
      /**
       * ask permission of the user for use microphone or camera
       */
      navigator.getUserMedia({ audio: true }, this.onSuccess, this.onFail);
    } else {
      console.warn("navigator.getUserMedia not present");
    }
  };

  handleStopClick = () => {
    const { tracks } = this.state;
    console.log("Stop Recording...");
    // stopBtn.setAttribute("disabled", true);
    // startBtn.removeAttribute("disabled");
    this.recorder.stop();
    tracks.forEach(track => track.stop());
    this.recorder.exportWAV(s => {
      const src = window.URL.createObjectURL(s);
      this.setState({ src });
    });
  };

  render() {
    return (
      <div class="center-align">
        <audio controls autoplay src={this.state.src}></audio>
        <button
          onClick={this.handleStartClick}
          class="btn waves-effect waves-light js-start"
        >
          Start
        </button>
        <button
          onClick={this.handleStopClick}
          class="btn waves-effect waves-light js-stop"
        >
          Stop
        </button>
      </div>
    );
  }
}

export default NewAudio;
