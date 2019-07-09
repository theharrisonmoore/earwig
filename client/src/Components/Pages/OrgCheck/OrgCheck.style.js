import styled from "styled-components"

import { colors, organizations, borders, shadows, breakpoints } from "./../../../theme"

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${props => props.orgType ? organizations[`${props.orgType}`].primary : colors.white };
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  position: absolute;
  top: 0;
`

export const QuestionWrapper = styled.div`
  width: 400px
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const QuestionHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  align-items: center;
`

export const Question = styled.h1`
  width: 300px;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.5rem;
  text-align: left;
  color: ${props => props.confirm ? colors.profileFontColor : colors.white};
`

export const ConfirmQuestion = styled(Question)`
  margin-bottom: 2rem;
`

export const StatusButton = styled.button`
  width: 150px;
  height: 3.5rem;
  border: ${borders.buttonBox};
  border-radius: 3px;
  box-shadow: ${shadows.buttonShadow};
  font-weight: 700;
  cursor: pointer;
  color: ${colors.profileFontColor};
  margin-top: 2rem;
`

export const ConfirmWrapper = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
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

export const Row = styled.div`
  display: flex;
  color: ${({orgType}) => organizations[`${orgType}`].primary};
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
`

export const OrgText = styled.p`
  margin: 0;
  font-weight: ${props => props.noOrg ? "normal" : "bold"};
  color: ${props => props.noOrg && colors.gray}
  font-size: 1rem;
`
export const StyledLink = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  margin-top: 1rem;
  color: ${colors.purpleLinks};
  width: 100%;
  text-align: center;
`