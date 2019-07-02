import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors, breakpoints, organizations, shadows } from "../../../theme";

export const SignupWrapper = styled.div`
  display: flex;
`;

export const StyledLink = styled(Link).attrs({})`
  display: block;
  text-decoration: underline;
  margin-bottom: 3rem;
  font-size: 1.125rem;
  color: ${colors.heliotrope};
  font-weight: 900;

  &:hover,
  &:active {
    color: ${colors.heliotrope};
    text-decoration: underline;
  }
`;

export const LinkSpan = styled(Link)`
  color: ${colors.purpleLinks};
  font-size: 1rem;
  font-weight: 700;
  text-decoration: underline;

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 25rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }
`;

export const BlankDiv = styled.div`
  width: 0%;
  background-color: ${colors.heliotrope};

  @media ${breakpoints.tablet} {
    width: 50%;
  }
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${colors.lightGray};
  width: 50%;
  min-width: 130px;

  .radio-button {
    display: none;
  }
`;

export const StyledInput = styled.label`
  display: inline-block;
  padding: 0.25rem 0rem;
  margin-bottom: 1rem;
  width: 90%;
  border: 1px solid;
  border-radius: 3px;
  font-size: 1rem;
  border: 2px solid
    ${({ value, id, orgType }) => {
      let color;
      if (value.toLowerCase() === id.toLowerCase() && orgType) {
        color =
          (organizations[value] && organizations[value].primary) ||
          organizations.worksite.primary;
      }
      if (
        value.toLowerCase() === id &&
        (value.toLowerCase() === "yes" || value.toLowerCase() === "other")
      ) {
        color = colors.green;
      } else if (value.toLowerCase() === id && value.toLowerCase() === "no") {
        color = colors.red;
      }
      return `border: 2px solid ${color};
              color: ${color};
             `;
    }};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SelectWrapper = styled.div`
  width: 100%;

  .ant-select-lg .ant-select-selection--single {
    height: 48px;
  }

  .ant-select-lg .ant-select-selection__rendered {
    line-height: 48px;
  }
`;

export const SubHeading = styled.h2`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.mineShaft2};
  text-align: left;
  margin-bottom: 0;
`;

export const Paragraph = styled.p`
  font-style: italic;
  font-size: 1rem;
  text-align: left;
  color: ${colors.dustyGray};
  margin-bottom: 0.25rem;
`;

export const Example = styled.img`
  width: 70%;
  margin: 1rem auto;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const Button = styled.button`
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  background-color: ${colors.heliotrope};
  color: ${colors.white};
  font-size: 1.25rem;
  border: none;
  box-shadow: ${shadows.buttonShadow};
  outline: none;
  font-weight: 900;
  text-transform: capitalize;
  margin-bottom: 1.25rem;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
