import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, organizations } from "../../../theme";

export const QuestionWrapper = styled.div.attrs({ className: "" })`
  font-size: 18px;
  margin-bottom: 1rem;
  color: #4a4a4a;

  p {
    margin: 0;
  }
  .text {
    font-weight: 900;
  }

  .hint-text {
    font-style: italic;
    font-size: 16px;
    color: #4a4a4a;
  }
`;

export const QuestionOptionsWrapper = styled.div`
  font-size: 16px;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .choices {
    width: calc(80% - 1rem);
    display: flex;
    justify-content: space-between;
    margin-right: 1rem;
  }

  .choices-3 div:last-child label {
    font-size: 11px;
    height: 24px;
  }

  .choices-4 {
    width: 100%;
  }

  .comment-icon-box {
    width: 20%;
    margin: 0 auto;
  }

  /* .yesno {
    text-align: center;
    color: grey;
    background-color: white;
    border: 1px solid #9b9b9b;
    display: inline-block;
    padding: 0.25rem 1rem;
  } */

  .radio {
    /* width: 4.75rem; */
    font-size: 14px;
    margin: 0;
  }
  .hide {
    display: none;
  }
`;

export const InputWrapper = styled.div`
  color: #9b9b9b;
  /* width: calc(((80% - 10px) / 4)); */

  .radio-button {
    display: none;
  }

  .yesno {
    border: 3px solid transparent;
    background: #ccc;
    text-align: center;
    color: grey;
    background-color: white;
    border: 1px solid #9b9b9b;
    display: inline-block;
    padding: 0.25rem 1rem;
  }

  .options-2 {
    width: 100px;
  }

  .options-3 {
    font-size: 11;
  }

  .options-4 {
  }

  .radio-button:checked + .yesno {
    border: 3px solid
      ${props => {
        if (props.option === "yes") {
          return "green";
        } else if (props.option === "no") {
          return `red`;
        }
        return "purple";
      }};
  }
`;
