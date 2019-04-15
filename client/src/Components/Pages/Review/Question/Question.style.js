import styled from "styled-components";

import { colors, organizations } from "../../../../theme";

export const QuestionWrapper = styled.div.attrs({ className: "" })`
  font-size: 18px;
  margin-bottom: 1rem;
  color: #4a4a4a;
`;

export const QText = styled.p`
  margin: 0;
  font-weight: 900;
`;

export const HintText = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 16px;
  color: #4a4a4a;
`;

export const QuestionOptionsWrapper = styled.div`
  font-size: 16px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 1rem;

  .choices {
    width: calc(80% - 1rem);
    display: flex;
    justify-content: space-between;
    margin-right: 1rem;
  }

  .choices-3 div:last-child label {
    font-size: 11px;
    padding-top: 8px;
  }

  .choices-4 {
    width: 100%;
  }

  .radio {
    font-size: 14px;
    margin: 0;
  }
  .hide {
    display: none;
  }
`;

export const CommentsIcon = styled.div`
  width: 20%;
  margin: 0 auto;
`;

export const StyledErrorMessage = styled.div`
  color: ${colors.red};
  font-weight: 100;
  font-size: 1rem;
  text-align: left;
  margin-bottom: 0rem;
`;

export const Input = styled.label`
  border: 3px solid transparent;
  background: #ccc;
  text-align: center;
  color: grey;
  background-color: white;
  box-shadow: 0 0 0 1px #9b9b9b;
  display: inline-block;
  padding: 0.25rem 1rem;
  height: 100%;
`;

export const InputWrapper = styled.div`
  color: #9b9b9b;

  .radio-button {
    display: none;
  }

  .options-2 {
    width: 100px;
  }

  .options-3 {
    font-size: 11;
  }

  .radio-button:checked + .yesno {
    border: 3px solid
      ${props => {
        if (props.option === "yes") {
          return colors.green;
        } else if (props.option === "no") {
          return colors.red;
        }
        return organizations[props.orgType].primary;
      }};
  }
`;
