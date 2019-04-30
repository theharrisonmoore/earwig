import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "./../../../theme";

export const Wrapper = styled.div`
  background: ${colors.heliotrope};
  padding: 2rem 1rem 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .paragraph {
    color: red;
    display: block;
    color: ${colors.white};
    font-size: 1.25rem;
    margin: 0;
  }
`;

export const Logo = styled.img`
  width: 11rem;
  margin: ${props => (props.isMobile ? "0 0 2rem 0" : "2rem 0 4rem 0")};
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || "column"};
  margin-bottom: ${props => (props.isMobile ? "0" : "2rem")};
`;

export const HalfDiv = styled.div`
  width: 50%;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Title = styled.h1`
  text-align: left;
  font-size: 3rem;
  margin: 0 0 1rem 0;
  width: 100%;
  color: ${colors.white};
  font-weight: normal;
  line-height: 3rem;
`;

export const Paragraph = styled.p`
  font-size: 1.5rem;
  text-align: left;
  color: ${colors.white};
  margin-bottom: 0;
`;

export const StyledLink = styled(Link).attrs({})`
  display: block;
  text-decoration: none;
  font-size: 1.25rem;
  color: ${colors.white};
  font-weight: 900;

  &:hover,
  &:active {
    text-decoration: none;
    color: ${colors.white};
  }
`;

export const SmallLink = styled(StyledLink)`
  font-size: 1rem;
  text-align: right;
  font-weight: initial;
  margin: 0;
  color: ${colors.white};

  &:hover,
  &:active {
    color: ${colors.white};
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  padding: 1rem;
`;

export const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  /* margin-top: 4rem;
  margin-bottom: 3rem; */
`;

export const WhiteWrapper = styled.div`
  background: ${colors.white};
  color: ${colors.gray};
  text-align: center;
  width: 100vw;
  padding: 3rem 0;
  margin-top: 3rem;
`;

export const SectionTitle = styled.h2`
  font-weight: 900;
  font-size: 1.25rem;
  color: ${props => props.color || colors.gray};
`;

export const PromiseParagraph = styled.p`
  font-style: italic;
  font-size: 1rem;
  line-height: 3rem;
`;

export const Award = styled.div`
  width: ${props => (props.isMobile ? "100%" : "50%")};
`;

export const AwardsWrapper = styled.div`
  padding: 3rem 0 0 0;
`;

export const AwardTitle = styled.h3`
  margin: 0;
  margin-bottom: 1rem;
  font-weight: 900;
  font-size: 1rem;
  color: ${colors.white}
  width: 100%;
`;

export const AwardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: ${props => (props.isMobile ? "0" : "1rem")};
`;

export const LabelTitle = styled.p`
  color: ${colors.white};
  margin: 0;
`;
