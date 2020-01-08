import styled, { css } from "styled-components";
import { EmailShareButton, WhatsappShareButton } from "react-share";

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
`;

const SocialButtonsSharedStyle = css`
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
  font-size: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
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
  font-size: 15px;
  color: ${colors.profileFontColor};
`;

export const Head3 = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${colors.dustyGray4};
  text-align: center;
`;

export const PromoParagraph = styled.p`
  font-size: 15px;
  margin: 2rem 0;
  color: ${colors.profileFontColor};
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
`;
