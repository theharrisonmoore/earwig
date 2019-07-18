import React, { Component } from "react";
import { message } from "antd";
import { getMp3MediaRecorder } from "mp3-mediarecorder";

import { VoiceWrapper, VoiceIconWrapper } from "./Question.style";
import Icon from "./../../../Common/Icon/Icon";

window.getMp3MediaRecorder = getMp3MediaRecorder;

class UploadAudio extends Component {
  state = {
    mic: null,
    recording: false,
    recordedAudio: null,
    recordedAudioURL: null,
    mimeType: null
  };

  Mp3MediaRecorder = null;
  mediaStream = null;
  recorder = null;
  blobs = [];
  mediaStream = null;

  componentDidMount() {
    const supportsWasm =
      WebAssembly && typeof WebAssembly.instantiate === "function";
    const supportsUserMediaAPI =
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function";
    const isBrowserSupported = supportsWasm && supportsUserMediaAPI;

    if (isBrowserSupported) {
      window
        .getMp3MediaRecorder({
          wasmURL: "https://unpkg.com/vmsg@0.3.5/vmsg.wasm"
        })
        .then(recorderClass => {
          this.Mp3MediaRecorder = recorderClass;
        });
    }
  }

  toggleRecording = () => {
    // Stop Recording
    if (this.state.recording) {
      this.recorder.stop();

      this.setState({
        recording: false
      });
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(
        stream => {
          this.mediaStream = stream;
          this.recorder = new this.Mp3MediaRecorder(stream);
          this.recorder.start();

          this.recorder.onstart = e => {
            this.blobs = [];
            this.setState({ recording: true });
          };

          this.recorder.ondataavailable = e => {
            this.blobs.push(e.data);
          };

          this.recorder.onstop = e => {
            this.setState({ recording: false });
            this.mediaStream.getTracks().forEach(track => track.stop());
            const mp3Blob = new Blob(this.blobs, { type: "audio/mpeg" });
            const mp3BlobUrl = URL.createObjectURL(mp3Blob);
            const audio = new Audio();
            audio.controls = true;
            audio.src = mp3BlobUrl;
            const audioFile = new File(this.blobs, `${this.props.id}.mp3`, {
              type: "audio/mp3",
              lastModified: Date.now()
            });

            this.setState({
              recordedAudio: mp3Blob,
              audioFile: audioFile
            });

            this.props.handleRecord({
              recordedAudio: mp3Blob,
              audioFile
            });
          };

          this.recorder.onerror = e => {
            message.error("Sorry!, Something went wrong");
          };
        },
        reason => {
          message.error(
            `Could not get microphone access.\nError:
            ${reason.message}`
          );
        }
      );
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
                <source key={recordedAudioURL} src={recordedAudioURL}></source>
              </audio>
            )}
            {this.state.mimeType === "audio/webm" && (
              <video id="player" controls key={recordedAudioURL}>
                {/* For Chrome */}
                <source key={recordedAudioURL} src={recordedAudioURL}></source>
              </video>
            )}
          </div>
        )}
      </VoiceWrapper>
    );
  }
}

export default UploadAudio;
