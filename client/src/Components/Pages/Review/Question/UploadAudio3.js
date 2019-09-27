import React, { Component } from "react";
// import { message } from "antd";

import { VoiceWrapper, VoiceIconWrapper, StopIcon } from "./Question.style";
import { AudioErrorMsg } from "./UploadPhoto.style";
import Icon from "../../../Common/Icon/Icon";

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

export default class UploadAudio3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      tracks: [],
      src: "",
      message: "",
    };
    this.audioContext = null;
    this.processor = null;
    this.microphone = null;
    this.config = {
      bufferLen: 4096,
      numChannels: 2,
      mimeType: "audio/mp3",
    };
    this.encoder = null;
  }

  // componentDidMount() {
  //   message.config({ duration: 20 });
  //   message.info("exmple3");
  // }

  handleStartClick = () => {
    this.startRecord();
  };

  handleStopClick = () => {
    try {
      this.audioContext.close();
      this.processor.disconnect();
      this.state.tracks.forEach(track => track.stop());
      const blob = this.encoder.finish("audio/mp3");
      const src = URL.createObjectURL(blob);
      this.setState({ isRecording: false, src });
      this.saveRecording(blob);
      // this.encoder.cancel();
    } catch (err) {
      this.logError(err);
    }
  };

  saveRecording = blob => {
    try {
      const { id } = this.props;

      const audioBlob = new Blob([blob], {
        type: "audio/mp3",
      });

      audioBlob.name = `${id}.mp3`;

      this.setState({
        recordedAudio: audioBlob,
        audioFile: audioBlob,
      });
      this.props.handleRecord({
        recordedAudio: audioBlob,
        audioFile: audioBlob,
      });
    } catch (err) {
      this.logError(err);
    }
  };

  startRecord = async () => {
    this.setState({ message: "" });
    try {
      this.audioContext = new AudioContext({ latencyHint: "playback" });
      /**
       * Create a ScriptProcessorNode with a bufferSize of
       * 4096 and two input and output channel
       * */
      if (this.audioContext.createJavaScriptNode) {
        this.processor = this.audioContext.createJavaScriptNode(
          this.config.bufferLen,
          this.config.numChannels,
          this.config.numChannels
        );
      } else if (this.audioContext.createScriptProcessor) {
        this.processor = this.audioContext.createScriptProcessor(
          this.config.bufferLen,
          this.config.numChannels,
          this.config.numChannels
        );
      } else {
        console.log("WebAudio API has no support on this browser.");
      }

      this.processor.connect(this.audioContext.destination);
      /**
       *  ask permission of the user for use microphone or camera
       * */
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(this.gotStreamMethod)
        .catch(this.logError);
    } catch (error) {
      this.logError(error);
    }
  };

  gotStreamMethod = stream => {
    try {
      this.setState({ isRecording: true, message: "" });
      const tracks = stream.getTracks();
      this.setState({ tracks });
      /**
       * Create a MediaStreamAudioSourceNode for the microphone
       * */
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      /**
       * connect the AudioBufferSourceNode to the gainNode
       * */
      this.microphone.connect(this.processor);
      // eslint-disable-next-line no-undef
      this.encoder = new Mp3LameEncoder(this.audioContext.sampleRate, 160);
      /**
       * Give the node a function to process audio events
       */
      // handle firefox bug
      this.processor.onaudioprocess = event => {
        try {
          this.encoder.encode(this.getBuffers(event));

          if (event.playbackTime >= 33) {
            this.handleStopClick();
          }
        } catch (err) {
          this.logError(err);
        }
      };
    } catch (err) {
      this.logError(err);
    }
  };

  logError = error => {
    console.log("err", error);
    this.setState({
      message:
        "Sorry, there seems to be an issue doing voice recordings on this browser/device. If on a computer please use Chrome or on Apple mobile devices please use Safari.",
    });
  };

  getBuffers = event => {
    try {
      const buffers = [];
      for (let ch = 0; ch < 2; ++ch) {
        buffers[ch] = event.inputBuffer.getChannelData(ch);
      }
      return buffers;
    } catch (err) {
      this.logError(err);
    }
  };

  toggleRecording = () => {
    try {
      if (this.state.isRecording) {
        this.handleStopClick();
      } else {
        this.handleStartClick();
      }
    } catch (err) {
      this.logError(err);
    }
  };

  render() {
    const { isRecording, src, message } = this.state;

    if (message) {
      return <AudioErrorMsg>{message}</AudioErrorMsg>;
    }
    return (
      <VoiceWrapper>
        <VoiceIconWrapper
          recording={isRecording}
          onClick={this.toggleRecording}
        >
          {isRecording ? (
            <StopIcon className="rectangle"></StopIcon>
          ) : (
            <Icon icon="voiceRecord" width="36px" height="48px" />
          )}
        </VoiceIconWrapper>
        {(src || this.props.voiceReviewUrl) && (
          <div style={{ width: "100%" }}>
            <audio
              controls
              src={this.state.src || this.props.voiceReviewUrl}
              type="audio/mp3"
              controlsList="nodownload"
            />
          </div>
        )}
      </VoiceWrapper>
    );
  }
}
