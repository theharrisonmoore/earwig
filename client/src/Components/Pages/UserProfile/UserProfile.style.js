import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows, borders, gradient } from "./../../../theme";

export const Wrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 2rem 2rem 2rem;
  color: ${colors.profileFontColor};
  box-shadow: ${shadows.headerShadow};
  margin-bottom: 1rem;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IDWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Verified = styled.div`
  display: flex;
  font-weight: 900;
`;

export const EditInfo = styled.button`
  cursor: pointer;
  outline: none;
  border: ${borders.searchBox};
  box-shadow: ${shadows.buttonShadow};
  color: ${colors.profileFontColor};
  background: none;
  margin: 0;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
  font-weight: 900;

  &:active,
  &:focus,
  &:hover {
    outline: none;
    text-decoration: none;
  }
`;

export const IDText = styled.p`
  font-weight: bold;
`;

export const MainSection = styled.div`
  padding: 0 2rem 0 2rem;
`;

export const UnVerifiedTitle = styled.h1`
  font-weight: 900;
  font-size: 1.375rem;
  color: ${colors.profileFontColor};
  margin-top: 2.5rem;
  display: inline-block;
  margin-bottom: 0;
`;

export const Paragraph = styled.p`
  font-weight: 500;
  font-size: 1rem;
  text-align: left;
  color: ${colors.gray};
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const UnVerifiedButton = styled(Link)`
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  background-color: ${colors.white};
  font-size: 1.25rem;
  border: 1px solid ${colors.black};
  box-shadow: ${shadows.buttonShadow};
  outline: none;
  font-weight: 900;
  text-transform: capitalize;
  margin-bottom: 1.25rem;
  color: ${colors.profileFontColor};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 20rem;

  &,
  &:active,
  &:focus {
    outline: none;
    text-decoration: none;
  }
`;

export const Title = styled.h2`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin: 0;
`;
