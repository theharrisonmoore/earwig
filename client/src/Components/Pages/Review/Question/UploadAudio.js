import React, { Component } from 'react'
import axios from "axios";
import Swal from "sweetalert2";

import { VoiceWrapper, VoiceIconWrapper } from "./Question.style";
import Icon from "./../../../Common/Icon/Icon"


export default class UploadAudio extends Component {

  render() {

    const { recording,
    startRecord,
    stopRecord
  } = this.props;
  
    return (
      <VoiceWrapper>
        <VoiceIconWrapper recording={recording} onClick={recording ? () => stopRecord(this.refs) : () => startRecord(this.refs)}>
          <Icon icon="voiceRecord" width="36px" height="48px" />
        </VoiceIconWrapper>
        <audio id="player" controls className="no__record" ref="player" />
      </VoiceWrapper>
    )
  }
}
