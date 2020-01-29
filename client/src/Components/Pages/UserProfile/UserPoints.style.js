import styled from "styled-components";
import { colors, breakpoints } from "../../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  height: 100vh;
  font-family: Roboto;
`;

export const ProgressSection = styled.section`
  // border: 1px solid black;
  margin-top: -35px;
  height: 70vh;

  @media ${breakpoints.mobileM} {
    margin-top: -50px;
  }
`;

export const ZeroNum = styled.div`
  padding: 3.8rem 0 1.2rem 0;
  font-weight: 500;
  height: 37px;
  width: 37px;
  margin: 0 auto;
  color: ${({ color }) => (color ? "white" : colors.lightGray)};
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

export const ExtendedTracker = styled.div`
  height: 400px;
  margin: -100px auto;
  overflow: hidden;
  background: ${colors.veryLightGray}
  width: 3px;
`;

export const ProgressNum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 37px;
  height: 37px;
  border: 1.5px solid ${colors.gray};
  color: ${colors.gray}
  border-radius: 50%
  background: white;
  position: absolute;
  top: ${({ progress }) => progress - 5}%;
`;

export const CompetitionContainer = styled.div`
  position: absolute;
  color: ${colors.black};
  width: 150px;
  font-weight: 700;
  top: ${({ progress }) => progress - 5}%;
  margin-left: 100px;
  margin-top: 5px;
  text-align: left;
`;

// renders user progress dynamically
export const YourProgressDiv = styled.div`
  width: 280px;
  margin-top: -10px;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: ${({ progress }) => progress - 5}%;
  color: ${colors.lightGray};
  text-align: right;
`;

export const ProgressTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 35px solid #ed254e;
  position: absolute;
  top: ${({ progress }) => progress - 5}%;
`;
