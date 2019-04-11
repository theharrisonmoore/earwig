import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, organizations } from "../../../theme";

export const QuestionWrapper = styled.div.attrs({ className: "" })`
  font-size: 18px;
  margin-bottom: 1rem;
  color: #4a4a4a;

  .text {
    font-weight: bold;
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

  .yesno {
    text-align: center;
    color: grey;
    padding: 1rem 2rem;
    background-color: white;
    border: 1px solid #9b9b9b;
    display: inline-block;
    padding: 0.25rem 1rem;
  }
  .hide {
    display: none;
  }
`;

export const InputWrapper = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  color: #9b9b9b;
  margin-right: 1.25rem;
  /* width: 40%; */

  .radio-button {
    display: none;
  }

  .yesno {
    /* width: 100%; */
    border: 3px solid transparent;
    background: #ccc;
    text-align: center;
    color: grey;
    background-color: white;
    border: 1px solid #9b9b9b;
    display: inline-block;
    padding: 0.25rem 1rem;
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
