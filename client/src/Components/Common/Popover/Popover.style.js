import styled from "styled-components";

import { colors, organizations } from "../../../theme";

export const PopoverLink = styled.p`
  margin-top: 10px;
  font-weight: 900;
  font-size: 18px;
  text-decoration: underline;
  color: ${({ category }) => organizations[category].primary};
  font-style: italic;
  cursor: pointer;
`;

export const PopoverDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;

  margin-top: 10px;
`;

export const PopoverText = styled.p`
  text-align: center;
  padding-bottom: 10px;
`;

export const StyledButton = styled.button`
  font-size: 16px;
  border: 3px solid transparent;
  background: ${colors.lightGray};
  text-align: center;
  color: ${colors.lightGray};
  background-color: ${colors.white};
  box-shadow: 0 0 0 1px ${colors.lightGray};
  display: inline-block;
  padding: 1px 1rem;
  margin-right: 0.5rem;
`;

export const PopoverBtn = styled(StyledButton)`
  background: ${({ category }) => organizations[category].primary};
  color: ${colors.white};
  width: 40%;
`;
