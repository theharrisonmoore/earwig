import styled from "styled-components";
import { colors } from "./../../../../theme";
import { Button } from "antd";

export const VerificationPhoto = styled.img`
  display: block;
  width: 90%;
  max-height: 80vh;
  object-fit: contain;
  margin: 0 auto;
  max-width: 900px;
`;

export const ButtonsWrapper = styled.div``;

export const StyledButton = styled(Button)`
  margin: 0 2rem 1rem;
`;

export const InfoWrapper = styled.div``;

export const Header = styled.header`
  display: flex;
  max-width: 55rem;
  margin: 0 auto;
  justify-content: space-between;
`;

export const Info = styled.p`
  font-weight: 900;
  color: ${colors.profileFontColor};
  margin-bottom: 0;
`;
