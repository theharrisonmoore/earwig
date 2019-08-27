import React from "react";
import { message } from "antd";

import { VoiceWrapper, VoiceIconWrapper, StopIcon } from "./Question.style";

import Icon from "./../../../Common/Icon/Icon";

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
    this.state = { tracks: [], src: "", mimeType: "", recording: false };
    this.recorder = null;
    this.context = null;
  }

  componentDidMount() {
    message.config({ duration: 20 });
    message.info("example1");
    // message.info(navigator.platform);
    // message.info(navigator.productSub);
    // message.info(navigator.product);
    // message.info(navigator.userAgent);
    // message.info(navigator.vendor);
    // message.info(window.navigator.appCodeName);
  }

  onFail = e => {
    this.setState({ recording: false });
    console.log("Rejected!", e);
  };

  onSuccess = s => {
    let tracks = s.getTracks();
    this.setState({ tracks });
    this.context = new AudioContext();
    let mediaStreamSource = this.context.createMediaStreamSource(s);
    // eslint-disable-next-line no-undef
    this.recorder = new Recorder(mediaStreamSource);
    console.log("this.recoreder", this.recorder);

    this.recorder.record();
  };

  handleStartClick = () => {
    this.setState({ recording: true });
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
    this.recorder.stop();
    tracks.forEach(track => track.stop());
    this.recorder.exportWAV(s => {
      console.log('s', s)
      const src = window.URL.createObjectURL(s);
      const mimeType = s.type;
      this.setState({ src, mimeType, recording: false });
      this.saveRecording(s);
    });
  };

  toggleRecording = () => {
    console.log("hii");
    if (this.state.recording) {
      this.handleStopClick();
    } else {
      this.handleStartClick();
    }
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

  render() {
    const { recording, src, mimeType } = this.state;
    return (
      <VoiceWrapper>
        <VoiceIconWrapper recording={recording} onClick={this.toggleRecording}>
          {recording ? (
            <StopIcon className="rectangle"></StopIcon>
          ) : (
            <Icon icon="voiceRecord" width="36px" height="48px" />
          )}
        </VoiceIconWrapper>
        {src && (
          <div style={{ width: "100%" }}>
            {mimeType !== "audio/webm" && (
              <audio controls src={this.state.src} type={this.state.mimeType} />
            )}
          </div>
        )}
      </VoiceWrapper>
    );
  }
}

export default NewAudio;
