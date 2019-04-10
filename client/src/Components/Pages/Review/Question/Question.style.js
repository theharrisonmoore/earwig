import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, organizations } from "../../../theme";

export const QuestionWrapper = styled.div.attrs({ className: "" })`
  font-size: 1.8rem;
  background-color: red;
  margin-bottom: 1rem;

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
  font-size: 1.8rem;
  background-color: black;
  margin-bottom: 1rem;

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
  .radio-input:checked + .yesno {
    border: 3px solid blue;
  }
`;
