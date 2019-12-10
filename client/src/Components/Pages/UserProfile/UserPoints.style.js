import styled from "styled-components";
import {
  colors,
  shadows,
  borders,
  organizations,
  breakpoints,
} from "../../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  min-height: 100vh;
`;

export const ProgressSection = styled.section`
  // border: 1px solid black;
  margin-top: -35px;
  height: 70vh;
`;

export const ZeroNum = styled.div`
  padding: 2rem 0 1.2rem 0;
  font-weight: 300;
  height: 37px;
  width: 37px;
  margin: 0 auto;
  color: ${colors.black};
`;

export const Tracker = styled.div`
  height: 75%;
  margin: 15px auto;
  background: ${colors.veryLightGray}
  width: 3px;
  position: relative;
  display: flex;
  justify-content: center;

  @media ${breakpoints.mobileL} {
    height: 85%;
  }
`;

export const ProgressNum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 37px;
  height: 37px;
  border: 1.5px solid ${colors.veryLightGray};
  border-radius: 50%
  background: white;
  position: absolute;
  top: ${({ progress }) => progress - 5}%;
`;

export const CompetitionContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: ${({ progress }) => progress - 5}%;
  color: ${colors.black};
`;

export const CompetitionDiv = styled.div`
  margin-left: 180px;
  margin-top: 5px;
  font-weight: 500;
  // border: 1px solid green;
`;

// renders user progress dynamically
export const YourProgressDiv = styled.div`
  width: 280px;
  margin-top: -10px;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: ${({ progress }) => progress - 5}%;
  color: ${colors.veryLightGray};
`;

export const ProgressTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 35px solid ${colors.red};
  position: absolute;
  top: ${({ progress }) => progress - 5}%;
`;
