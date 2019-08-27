import React, { Component } from "react";

import { VoiceWrapper, VoiceIconWrapper, StopIcon } from "./Question.style";

import Icon from "./../../../Common/Icon/Icon";
import { message } from "antd";

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
      src: ""
    };
    this.audioContext = null;
    this.processor = null;
    this.microphone = null;
    this.config = {
      bufferLen: 4096,
      numChannels: 2,
      mimeType: "audio/mp3"
    };
    this.encoder = null;
  }

  componentDidMount() {
    message.config({ duration: 20 });
    message.info("exmple3");
  }

  handleStartClick = () => {
    this.startRecord();
  };

  handleStopClick = () => {
    this.audioContext.close();
    this.processor.disconnect();
    this.state.tracks.forEach(track => track.stop());
    const blob = this.encoder.finish("audio/mp3");
    const src = URL.createObjectURL(blob);
    this.setState({ isRecording: false, src });
    this.saveRecording(blob);
    // this.encoder.cancel();
  };

  saveRecording = blob => {
    const { id } = this.props;

    let audioBlob = new Blob([blob], {
      type: "audio/mp3"
    });

    audioBlob.name = `${id}.mp3`;

    // const audioFile = new File([blob], `${id}.mp3`, {
    //   type: "audio/mp3",
    //   lastModified: Date.now()
    // });

    this.setState({
      recordedAudio: audioBlob,
      audioFile: audioBlob
    });
    this.props.handleRecord({ recordedAudio: audioBlob, audioFile: audioBlob });
  };

  startRecord = () => {
    this.audioContext = new AudioContext();
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
  };

  gotStreamMethod = stream => {
    this.setState({ isRecording: true });
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
    this.processor.onaudioprocess = event => {
      this.encoder.encode(this.getBuffers(event));
    };
  };

  logError = error => {
    alert(error);
  };

  getBuffers = event => {
    const buffers = [];
    for (let ch = 0; ch < 2; ++ch) {
      buffers[ch] = event.inputBuffer.getChannelData(ch);
    }
    return buffers;
  };

  toggleRecording = () => {
    console.log("333");
    if (this.state.isRecording) {
      this.handleStopClick();
    } else {
      this.handleStartClick();
    }
  };

  render() {
    const { isRecording, src } = this.state;
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
        {src && (
          <div style={{ width: "100%" }}>
            <audio controls src={this.state.src} type="audio/mp3" />
          </div>
        )}
      </VoiceWrapper>
    );
    // return (
    //   <div class="center-align">
    //     <div>
    //       <canvas class="js-volume" width="20" height="140"></canvas>
    //     </div>
    //     <audio controls type="audio/mpeg" src={this.state.src}></audio>
    //     <br />
    //     <button
    //       class="btn waves-effect waves-light js-start"
    //       onClick={this.handleStartClick}
    //     >
    //       Start
    //     </button>
    //     <button
    //       class="btn waves-effect waves-light js-stop"
    //       onClick={this.handleStopClick}
    //     >
    //       Stop
    //     </button>
    //     <br />
    //     <a id="download" class="hide">
    //       Download Audio
    //     </a>
    //     <br />
    //     <button class="btn waves-effect waves-light js-code">Show Code</button>
    //   </div>
    // );
  }
}
