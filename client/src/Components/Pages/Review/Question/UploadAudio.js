import React, { Component } from "react";
import { message } from "antd";

import { VoiceWrapper, VoiceIconWrapper } from "./Question.style";
import Icon from "./../../../Common/Icon/Icon";

// if the browser doesn't support MediaRecorder
// use the polyfill
if (window.MediaRecorder == null) {
  // safari polyfill
  window.MediaRecorder = require("audio-recorder-polyfill");
}

class UploadAudio extends Component {
  state = {
    mic: null,
    recording: false,
    recordedAudio: null,
    recordedAudioURL: null,
    mimeType: null
  };

  componentDidMount() {
    this.reset();
    this.blobLengthMS = null;
  }

  recordAudioStream = stream => {
    this.stream = stream;
    // requires https to work on chrome and safari
    this.options = {
      // chrome likes webm
      mimeType: "audio/webm"
    };
    if (MediaRecorder.isTypeSupported(this.options.mimeType)) {
      this.mediaRecorder = new MediaRecorder(stream, this.options);
    } else {
      // firefox only supports ogg completely
      this.options.mimeType = "audio/ogg";
      if (MediaRecorder.isTypeSupported(this.options.mimeType)) {
        this.mediaRecorder = new MediaRecorder(stream, this.options);
      } else {
        // safari polyfill
        this.options.mimeType = "audio/wav";
        if (MediaRecorder.isTypeSupported(this.options.mimeType)) {
          this.mediaRecorder = new MediaRecorder(stream, this.options);
        } else {
          message.error(
            "Sorry!, Your Browser doesn't support recording voices"
          );
          return;
        }
      }
    }

    this.setState({
      mimeType: this.options.mimeType
    });

    this.newMediaRecorder(this.mediaRecorder, this.options.mimeType);
  };

  reset = () => {
    this.recordedMarks = [];

    this.recordedAudioBlobs = [];
    this.fftOutput = [];
    this.recordedAudioStartTimestamp = null;
    this.recordedAudioEndTimestamp = null;

    this.fr = new FileReader();
    this.fr.addEventListener("error", e => {
      message.error("Sorry!, Something went wrong");
    });
    this.counter = 0;

    this.lastMark = null;
  };

  newMediaRecorder = (mediaRecorder, mimeType) => {
    this.mediaRecorder = mediaRecorder;
    this.mimeType = mimeType;
    this.mediaRecorder.addEventListener("stop", this.saveRecording);
    this.mediaRecorder.addEventListener("error", e => {
      message.error("Sorry!, error in recording audio from mic");
    });
    this.mediaRecorder.addEventListener("dataavailable", event => {
      if (event.data.size > 0) {
        // this.recordedAudioBlobs.push(event.data);
        this.pushNewAudioBlob(event.data, event);
      } else {
        this.pushNewAudioBlob(event.data, event);
      }
    });
  };

  clearTracks = () => {
    this.stream
      .getTracks() // get all tracks from the MediaStream
      .forEach(track => track.stop());
  };

  pushNewAudioBlob = (blob, event) => {
    this.recordedAudioBlobs.push(blob);
  };

  toggleRecording = () => {
    // Stop Recording
    if (this.state.recording) {
      this.mediaRecorder.stop();
      this.clearTracks();
      this.setState({
        recording: false
      });
    } else {
      // Start Recording
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(this.recordAudioStream)
        .then(() => {
          this.reset();

          this.setState({
            recordedAudio: null,
            recordedAudioURL: null
          });

          let timestamp = Date.now();
          this.recordedAudioStartTimestamp = timestamp;

          this.mediaRecorder.start(this.blobLengthMS);
          this.setState({
            recording: true
          });
        });
    }
  };

  saveRecording = () => {
    const { id } = this.props;

    this.recordedAudioEndTimestamp = Date.now();
    let audioBlob = new Blob(this.recordedAudioBlobs, {
      type: "audio/mp3"
    });

    const audioFile = new File(this.recordedAudioBlobs, `${id}.mp3`, {
      type: "audio",
      lastModified: Date.now()
    });

    this.setState({
      recordedAudio: audioBlob,
      audioFile
    });
    this.props.handleRecord({ recordedAudio: audioBlob, audioFile });
  };

  processSample = e => {
    this.counter++;

    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    this.fftOutput.push(dataArray);
  };

  render() {
    let recordedAudioURL = null;
    if (this.state.recordedAudio) {
      recordedAudioURL = window.URL.createObjectURL(this.state.recordedAudio);
    }

    return (
      <VoiceWrapper>
        <VoiceIconWrapper
          recording={this.state.recording}
          onClick={this.toggleRecording}
        >
          <Icon icon="voiceRecord" width="36px" height="48px" />
        </VoiceIconWrapper>
        {this.state.recordedAudio && (
          <div style={{ width: "100%" }}>
            {this.state.mimeType !== "audio/webm" && (
              <audio id="player" controls key={recordedAudioURL}>
                <source
                  key={recordedAudioURL}
                  type={this.options.mimeType}
                  src={recordedAudioURL}
                ></source>
              </audio>
            )}
            {this.state.mimeType === "audio/webm" && (
              <video id="player" controls key={recordedAudioURL}>
                {/* For Chrome */}
                <source
                  key={recordedAudioURL}
                  type={this.state.mimeType}
                  src={recordedAudioURL}
                ></source>
              </video>
            )}
            <a
              className="button is-info"
              href={recordedAudioURL}
              download={"audio." + this.state.mimeType.split("/")[1]}
            >
              Download Audio Recording
            </a>
          </div>
        )}
      </VoiceWrapper>
    );
  }
}

export default UploadAudio;
