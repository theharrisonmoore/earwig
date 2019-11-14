import styled from "styled-components";

import { colors } from "../../../theme";
import { MOBILE_WIDTH } from "../../../constants/screenWidths";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 6rem 1.5rem;

  @media (max-width: ${MOBILE_WIDTH}px) {
    padding-top: 5rem;
  }
`;

export const CommentsWrapper = styled.div`
  padding-bottom: 20vh;
`;

export const IndividComment = styled.div`
  display: flex;
  flex-direction: column;
  flex: initial;
  justify-content: flex-start;
  margin-bottom: 0rem;
  position: relative;
  padding-bottom: 2rem;
  align-items: flex-start;
  direction: ${({ adminReply }) => adminReply && "rtl"};
`;

export const ReplyWrapper = styled.div`
  text-align: left;
  position: fixed;
  width: 70%;
  bottom: 0;
  background: white;
  padding: 2rem 4rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  height: 40vh;
  border-top: 2px ${colors.ghostGray} solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 90%;
    padding: 2rem 0;
  }
`;
