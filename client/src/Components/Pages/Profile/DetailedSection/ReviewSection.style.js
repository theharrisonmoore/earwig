import styled from "styled-components";

import { colors, borders } from "../../../../theme";

const titleFontSize = "18px";
const titleFontWeight = "bold";

const generalFontSize = "15px";
// const generalFontWeight = "normal";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${titleFontSize};
  color: ${colors.dustyGray4};
  border-bottom: ${({ bordered }) => (bordered ? borders.commentBox : "none")};
  margin: 0;
  margin-bottom: 1rem;
  font-weight: ${titleFontWeight};
  padding-top: 1rem;
`;

export const QuestionWrapper = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
  flex-direction: column;
  padding: 1.125rem 0;
  max-width: 100%;
  width: ${({ width }) => width};
`;

export const YesNoQuestionWrapper = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
`;

export const ListWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const QuestionContainer = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
  flex-direction: column;
  padding: 1.125rem 0;
  max-width: 100%;
`;

export const IconContainer = styled.div`
  padding-top: 1.125rem;
  padding-right: 0.8rem;
`;

export const QuestionTitle = styled.h3`
  font-size: 15px;
  color: ${colors.dustyGray3};
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const HintText = styled.p`
  margin: 0;
  padding-bottom: 1.125rem;
  font-style: italic;
  font-size: ${generalFontSize};
  color: ${colors.dustyGray3};
`;

export const StarWrapper = styled(QuestionTitle)`
  font-size: 3rem;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: medium;
  margin: 0;
  color: ${colors.dustyGray3};
`;

export const LightTitle = styled.div`
  opacity: 0.5;
  font-weight: 500;
  font-size: 15px;
  color: ${colors.dustyGray3};
  border: ${({ bar }) => (bar ? `1px solid ${colors.inputBorder}80` : "none")};
  text-align: ${({ bar }) => (bar ? `center` : "left")};
  padding: ${({ large, image }) => {
    if (image) {
      return "5rem";
    }
    if (large) {
      return "0.75rem 0";
    }
    return "0";
  }};
  width: 100%;

  p {
    margin-bottom: 0;
  }
`;
