import styled from "styled-components";

import { colors, borders } from "../../../../theme";

export const QuestionWithIconWrapper = styled.div`
  display: flex;
`;

export const QuestionWrapper = styled.div.attrs({ className: "" })`
  font-size: 18px;
  margin-bottom: 2.25rem;
  color: ${colors.profileFontColor};
  width: 100%;
`;

export const QText = styled.p`
  margin: 0 0 0.25rem;
  font-weight: bold;
  font-size: 15px;
  color: ${colors.dustyGray3};
`;

export const Warning = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

export const HintText = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 15px;
  color: ${props =>
    props.voiceWarn ? colors.warningText : colors.profileFontColor};
  font-weight: ${props => props.voiceWarn && "bold"};
`;

export const QuestionOptionsWrapper = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

export const AnswerDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Options = styled.div`
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-between;
  font-size: 16px;

  justify-content: ${({ options }) =>
    options === 4 ? "flex-end" : "space-between"};
  .choices {
    // width: calc(85% - 1rem);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .choices-3 div:last-child label {
    font-size: 11px;
    padding-top: 5px;
  }

  .choices-4 {
    width: 100%;
    margin-right: 0;
  }

  .radio-input {
    font-size: 14px;
    margin: 0;
    width: 100px;
  }
  .hide {
    display: none;
  }

  .ant-checkbox-group-item {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 15px;
    margin-bottom: 0.75rem;
  }

  .ant-checkbox-wrapper-checked {
    color: ${colors.green};
    font-weight: 900;
  }

  .ant-select-selection {
    position: relative;
  }
`;

export const CommentsIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 33px;
  color: ${props => {
    return props.hasValue ? colors.green : colors.profileFontColor;
  }};
  margin: 0 auto;
  box-shadow: 0 0 0 1px ${colors.dustyGray1};
  box-shadow: ${props => {
    return props.hasValue ? "none" : `0 0 0 1px ${colors.dustyGray1}`;
  }};
  border: 1px solid
    ${props => {
      return props.hasValue ? colors.green : "transparent";
    }};
  border-radius: 3px;

  img {
    width: 28px;
    height: 28px;
  }
`;

export const StyledErrorMessage = styled.div`
  color: ${colors.red};
  font-weight: 100;
  font-size: 15px;
  text-align: left;
  margin-bottom: 0rem;
`;

export const StyledInput = styled.label`
  border: 3px solid transparent;
  background: ${colors.lightGray};
  text-align: center;
  color: ${colors.lightGray};
  background-color: ${colors.white};
  box-shadow: 0 0 0 1px ${colors.lightGray};
  display: inline-block;
  height: 100%;
  width: 100%;
  vertical-align: center;
  padding-top: 0 !important;
`;

export const InputWrapper = styled.div`
  color: ${colors.lightGray};
  padding-top: 0;

  .radio-button {
    display: none;
  }

  .yesno {
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  width: 100%;
  margin-right: ${({ options }) => (options === 4 ? "0" : "8px")};
  :last-child {
    margin-right: 0;
  }

  .options-4 {
    margin-right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radio-button:checked + .yesno {
    box-shadow: none;
    color: white;
    transition: all 0.3s;
    border: 3px solid
      ${props => {
        if (props.option.toLowerCase() === "yes") {
          return colors.green;
        }
        if (props.option.toLowerCase() === "no") {
          return colors.red;
        }
        return colors.profileFontColor;
      }};
    background-color: ${props => {
      if (props.option.toLowerCase() === "yes") {
        return colors.green;
      }
      if (props.option.toLowerCase() === "no") {
        return colors.red;
      }
      return colors.profileFontColor;
    }};
  }
`;

export const StyledButton = styled.button`
  font-size: 16px;
  border: 3px solid transparent;
  background: ${colors.lightGray};
  text-align: center;
  color: ${colors.lightGray};
  background-color: ${colors.white};
  box-shadow: 0 0 0 2px ${colors.lightGray};
  display: inline-block;
  padding: 1px 0.25rem;
  margin-right: 0.5rem;
  border-radius: 3px;
`;

export const StyledCheckList = styled.div`
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .icon-button {
    display: flex;
    align-self: flex-end;
  }
`;

export const SliderWrapper = styled.div`
  width: calc(85% - 1rem);
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
  flex-wrap: wrap;

  min-height: 7.75rem;
  .ant-slider-with-marks {
    margin-top: 45px;
    margin-bottom: 0;
  }

  .ant-slider-handle {
    position: absolute;
    width: 28px;
    height: 28px;
    margin-top: -11px;
  }
  .ant-slider-track {
    background-color: #b6b6b6;
  }

  .ant-slider:hover .ant-slider-track {
    background-color: #b6b6b6;
  }

  .ant-slider-rail::after {
    content: "";
    width: 100%;
    height: 1px;
    z-index: 1;
    background: #cfced3;
    position: absolute;
    bottom: 25px;
  }

  .ant-slider-rail::before {
    content: "";
    width: 100%;
    height: 1px;
    z-index: 1;
    background: #cfced3;
    position: absolute;
    top: 25px;
  }

  .ant-slider-step {
    display: none;
  }

  .ant-slider-handle {
    border: 0.5px solid rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.375px;

    color: #4a4a4a;
    opacity: 0.8;
    width: 100%;
    visibility: ${({ visibility }) => (visibility ? "intial" : "hidden")};
    margin-bottom: 0.75rem;
  }
`;

export const VoiceIconWrapper = styled.div`
  width: 67px;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  color: ${({ recording }) => (recording ? colors.red : colors.dustyGray2)};
  margin-right: 1rem;

  :after {
    content: "";
    position: absolute;
    width: 67px;
    height: 67px;
    border: ${borders.commentBox};
    border-radius: 50%;
    animation: ${({ recording }) => recording && "spin 2s linear infinite"};
    border-top: ${({ recording }) => recording && borders.recording};

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export const VoiceWrapper = styled.div`
  display: flex;
  align-items: center;

  video,
  audio {
    height: 46px;
    width: calc(100% - 76px);
  }
`;

export const StopIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${colors.gray};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Input = styled.input`
  background: ${colors.white};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  display: block;
  width: 100%;
  border: 1px solid ${colors.inputBorder};
  outline: none;
`;

export const CheckboxWrapper = styled.div`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fff;
    border: 2px solid ${colors.gray};
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border: 3px solid ${colors.gray};
    border-top: 0;
    border-left: 0;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border: 3px solid ${colors.gray};
    border-top: 0;
    border-left: 0;
    width: 9px;
    height: 15px;
  }

  .ant-checkbox-inner {
    width: 22px;
    height: 22px;
    border: 2px solid ${colors.gray};
  }
`;

export const CommentIconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  padding-right: 0.8rem;
  padding-top: 0.25rem;
  display: flex;
  align-items: flex-start;
`;
