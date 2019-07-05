import styled from "styled-components"

import { colors, organizations, borders, shadows } from "./../../../theme"

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.orgType ? organizations[`${props.orgType}`].primary : colors.white };
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  color: ${colors.white}
`

export const InputWrapper = styled.input`
  width: 300px;
  height: 4.5rem
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

`

