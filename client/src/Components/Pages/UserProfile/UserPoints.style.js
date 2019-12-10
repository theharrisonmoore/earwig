import styled from "styled-components";
import {
  colors,
  shadows,
  borders,
  organizations,
  breakpoints,
} from "../../../theme";

export const Wrapper = styled.div`
  // padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  min-height: 100vh;
`;

export const ProgressSection = styled.section`
  border: 1px solid black;
  height: 80vh;
  // overflow: hidden;

  // @media ${breakpoints.laptop} {
  //   height: 80vh;
  // }
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
  height: 500px;
  margin: 15px auto;
  background: ${colors.veryLightGray}
  width: 1px;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const ProgressNum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 37px;
  height: 37px;
  border: ${borders.buttonBox};
  border-radius: 50%
  background: white;
  position: absolute;
  top: ${({ progress }) => progress}%;
`;

export const ProgressInTracker = styled.div`
  height: ${({ progress }) => progress}%;
  width: 100%;
  position: absolute;
  margin: 15px auto;
  background: yellow;
`;
