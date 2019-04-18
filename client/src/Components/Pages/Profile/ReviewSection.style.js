import styled from "styled-components";

import { colors, borders, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 2.5rem 0;
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
  display: flex;
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

export const CategoryTitle = styled.span`
  text-transform: capitalize;
`;
