import styled from "styled-components";

import { colors, organizations } from "../../../../theme";

export const QuestionWrapper = styled.div.attrs({ className: "" })`
  font-size: 18px;
  margin-bottom: 1rem;
  color: ${colors.profileFontColor};
`;

export const QText = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 18px;
`;

export const HintText = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 16px;
  color: ${colors.profileFontColor};
`;

export const QuestionOptionsWrapper = styled.div`
  font-size: 16px;
  margin: 1rem 0;
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
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 1rem;
  justify-content: ${({ options }) =>
    options === 4 ? "flex-end" : "space-between"};
  .choices {
    width: calc(85% - 1rem);
    display: flex;
    justify-content: space-between;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
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
    font-size: 1rem;
  }

  .ant-checkbox-wrapper-checked {
    color: ${colors.green};
    font-weight: 900;
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
  font-size: 1rem;
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
`;

export const InputWrapper = styled.div`
  color: ${colors.lightGray};

  .radio-button {
    display: none;
  }

  .yesno {
    border-radius: 3px;
  }
  width: 100%;
  margin-right: 14px;
  margin-right: ${({ options }) => (options === 4 ? "0" : "14px")};
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
    border: 3px solid
      ${props => {
        if (props.option.toLowerCase() === "yes") {
          return colors.green;
        } else if (props.option.toLowerCase() === "no") {
          return colors.red;
        }
        return organizations[props.orgType].primary;
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
  box-shadow: 0 0 0 1px ${colors.lightGray};
  display: inline-block;
  padding: 1px 1rem;
  margin-right: 0.5rem;
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
