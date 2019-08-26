import React from "react";
// import Recorder from "recorder-js";
// let startBtn = document.querySelector(".js-start");
// let stopBtn = document.querySelector(".js-stop");
// let codeBtn = document.querySelector(".js-code");
// let pre = document.querySelector("pre");

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

class NewAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [], src: "", mimeType: "" };
    this.recorder = null;
    this.context = null;
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
    console.log("Stop Recording...", tracks);
    // stopBtn.setAttribute("disabled", true);
    // startBtn.removeAttribute("disabled");
    this.recorder.stop();
    tracks.forEach(track => track.stop());
    console.log("hi");
    this.recorder.exportWAV(s => {
      console.log("s", s);
      const src = window.URL.createObjectURL(s);
      const mimeType = s.type;
      console.log("sssssssssssssssssssss", src);
      this.setState({ src, mimeType });
    });
  };

  render() {
    return (
      <div class="center-align">
        <audio controls src={this.state.src} type={this.state.mimeType} />
        {/* <source src={this.state.src} type={this.state.mimeType} />
          {/* <source src="myAudio.ogg" type="audio/ogg" /> */}
        {/* <p>
            Your browser doesn't support HTML5 audio. Here is a{" "}
            <a href="myAudio.mp4">link to the audio</a> instead.
          </p>
        </audio> */}
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
