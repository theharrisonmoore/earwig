import styled from "styled-components"
import { NavLink } from "react-router-dom"

import { colors, organizations, borders, shadows, breakpoints } from "./../../../theme"

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${props => props.orgType ? organizations[`${props.orgType}`].primary : colors.white };
  display: flex;
  overflow: scroll;
  position: absolute;
  top: 0;
`

export const Title = styled.h1`
  width: 300px;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.5rem;
  text-align: left;
  color: ${colors.profileFontColor};
  margin-bottom: 1rem;
`

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: ${colors.profileFontColor};
  margin-bottom: 2rem;
`

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
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }

  @media ${breakpoints.tablet} {
    width: 50%;
    padding: 1rem 7rem;
    align-items: flex-start;
  }
`;


export const StyledLink = styled(NavLink)`
  width: 100%;
`
