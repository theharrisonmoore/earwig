import styled, { css } from "styled-components";
import { EmailShareButton, WhatsappShareButton } from "react-share";

import { colors } from "../../../theme";

export const InviteWrapper = styled.div`
  padding-top: 5rem;
  max-width: 20rem;
  margin: 0 auto;
  padding-bottom: 100px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SocialButtonsSharedStyle = css`
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  height: 55px;
  width: 90px;
  border-radius: 300px;
  background-color: ${colors.primary};
  color: ${colors.white};
  font-weight: 700;
  margin-right: 12px;
`;

export const FbShare = styled.div`
  ${SocialButtonsSharedStyle}
  margin-right: 0;
`;

export const WhatsappShare = styled(WhatsappShareButton)`
  ${SocialButtonsSharedStyle}
`;
export const EmailShare = styled(EmailShareButton)`
  ${SocialButtonsSharedStyle}
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
  width: 23px;
  height: 23px;
`;
