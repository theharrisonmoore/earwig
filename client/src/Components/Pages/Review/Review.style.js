import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, organizations } from "../../theme";

export const ReviewRapper = styled.div.attrs({ className: "" })`
  font-family: "Roboto", sans-serif;
  max-width: 40rem;
  margin: 0 auto;
  text-align: left;

  .review-header {
    width: 100%;
    background-color: ${organizations.agency.primary};
    color: ${colors.white};
    font-size: 1.8rem;
    padding: 1rem 2rem;

    .org {
      font-weight: bold;
    }
  }

  .questions {
    width: 90%;
    margin: 0 auto;

    .question-container {
      margin-bottom: 1rem;
    }
  }
`;

export const ReviewHeader = styled.div.attrs({ className: "login" })`
  max-width: 70rem;
  margin: 0 auto;
  padding-top: 3rem;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }
`;

export const QuestionContainer = styled.div``;
