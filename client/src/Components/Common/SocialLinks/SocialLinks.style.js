import styled from "styled-components";

import { colors } from "../../../theme";

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
  margin: 0 auto;
  margin-bottom: 15px;
  font-size: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;
