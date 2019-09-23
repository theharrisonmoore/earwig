import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors, organizations, breakpoints } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${props =>
    props.orgType ? organizations[`${props.orgType}`].primary : colors.white};
  display: flex;
  overflow: scroll;
  position: absolute;
  top: 0;
`;

export const Title = styled.h1`
  margin-top: 6rem;
  width: 300px;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.5rem;
  text-align: left;
  color: ${colors.profileFontColor};
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: ${colors.profileFontColor};
  margin-bottom: 2rem;
`;

export const PurpleDiv = styled.div`
  width: 0%;
  background-color: ${colors.heliotrope};

  @media ${breakpoints.tablet} {
    width: 50%;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  /* max-width: 25rem; */
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 30rem;
  margin: 0 auto;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }

  @media ${breakpoints.tablet} {
    width: 50%;
    padding: 1rem 3rem;
    align-items: flex-start;
  }
`;

export const StyledLink = styled(NavLink)`
  width: 100%;
  text-align: left;
  margin-bottom: 1.5rem;
`;

export const HintText = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const Text = styled.p`
  margin: 0;
`;

export const ButtonText = styled.div`
  text-align: left;
`;

export const ComingSoon = styled.span`
  font-weight: 300;
  font-size: 14px;
  width: 8rem;
  margin-left: 0.5rem;
`;
