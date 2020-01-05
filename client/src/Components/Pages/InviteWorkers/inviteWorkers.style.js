import styled from "styled-components";

import { colors } from "../../../theme";

export const InviteWrapper = styled.div`
  padding-top: 3rem;
  max-width: 20rem;
  margin: 0 auto;
  padding-bottom: 100px;
`;

export const Head3 = styled.h3`
  font-size: 18px;
  text-align: center;
  line-height: 1.4;
  font-family: "Lato", sans-serif;
  color: ${colors.dustyGray2};
`;

export const PromoParagraph = styled.p`
  font-size: 15px;
  line-height: 19px;
  font-family: "Lato", sans-serif;
  margin: ${({ bottom }) => (bottom ? "1.75rem 0" : "2rem 0")};
  letter-spacing: 0.34px;
  opacity: 0.8;
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
`;
