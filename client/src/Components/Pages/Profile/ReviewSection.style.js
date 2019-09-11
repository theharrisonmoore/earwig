import styled from "styled-components";

import { colors, borders } from "./../../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${colors.profileFontColor};
  border-bottom: ${borders.commentBox};
  margin: 0;
  margin-bottom: 1.75rem;
  font-weight: medium;
`;

export const QuestionWrapper = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
  flex-direction: column;
  padding: 1.125rem 0;
`;

export const QuestionTitle = styled.h3`
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const StarWrapper = styled(QuestionTitle)`
  font-size: 3rem;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: medium;
  margin: 0;
  color: ${colors.profileFontColor};
`;

export const LightTitle = styled.div`
  opacity: 0.5;
  font-weight: 500;
  font-size: 1rem;
  color: ${colors.profileFontColor};

  p {
    margin-bottom: 0;
  }
`;
