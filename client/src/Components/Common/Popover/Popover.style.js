import styled from "styled-components";

import { colors, organizations } from "../../../theme";

export const PopoverLink = styled.p`
  margin-top: 10px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: underline;
  color: ${({ category }) =>
    category ? organizations[category].primary : "white"};
  font-style: italic;
  cursor: pointer;
`;

export const PopoverDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  max-width: 400px;
  padding: 0 1rem;
  margin-top: 10px;
`;

export const PopoverText = styled.p`
  text-align: center;
  margin-bottom: 0;
  color: ${colors.dustyGray2};
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
