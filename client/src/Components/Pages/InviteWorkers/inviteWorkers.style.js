import styled from "styled-components";

import { colors } from "../../../theme";

export const InviteWrapper = styled.div`
  /* padding-top: 5rem; */
  max-width: 20rem;
  margin: 0 auto;
  padding-bottom: 100px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SocialButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  height: 45px;
  width: 90px;
  border-radius: 300px;
  background-color: ${colors.primary};
  color: ${colors.white};
  font-weight: 700;
  margin-right: 12px;
  margin-bottom: 15px;
  font-size: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const ShareParagraph = styled.p`
  font-size: 16px;
  color: ${colors.dustyGray2};
`;

export const Head3 = styled.h3`
  font-size: 34px;
  text-align: center;
  line-height: 1.4;
  font-family: "Lato", sans-serif;
`;

export const PromoParagraph = styled.p`
  font-size: 20px;
  line-height: 19px;
  font-family: "Lato", sans-serif;
  margin: 2rem 0;
  letter-spacing: 0.34px;
  opacity: 0.8;
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
`;
