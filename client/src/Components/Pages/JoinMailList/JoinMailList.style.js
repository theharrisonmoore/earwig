import styled from "styled-components";
import { colors } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  color: ${colors.profileFontColor};
`;

export const Content = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 35%;
  left: 50%;
  color: inherit;
`;

export const Heading = styled.h1`
  color: inherit;
`;
export const Paragraph = styled.p`
  color: inherit;
`;
