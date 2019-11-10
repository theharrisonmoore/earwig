import styled from "styled-components";
import { EmailShareButton, WhatsappShareButton } from "react-share";

import { organizations, colors } from "../../../theme";

export const InviteWrapper = styled.div`
  padding-top: 5rem;
  max-width: 17rem;
  margin: 0 auto;
  padding-bottom: 100px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FbShare = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  height: 55px;
  width: 80px;
  border-radius: 6px;
  background-color: ${organizations.agency.primary};
  color: ${colors.white};
  font-weight: 700;
`;

export const WhatsappShare = styled(WhatsappShareButton)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${organizations.agency.primary};
  width: 80px;
  height: 55px;
  border-radius: 6px;
  color: ${colors.white};
  font-weight: 700;
`;
export const EmailShare = styled(EmailShareButton)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${organizations.agency.primary};
  width: 80px;
  height: 55px;
  border-radius: 6px;
  color: ${colors.white};
  font-weight: 700;
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
