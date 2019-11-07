import styled from "styled-components";
import { gradient } from "../../../theme";

export const AdminWrapper = styled.div`
  background: ${gradient.adminBackground};
  min-height: 100vh;
  padding-bottom: 100px;
`;
export const ContentWrapper = styled.div`
  padding: 2rem;
  padding-left: calc(${props => props.marginLeft}px + 2rem);
`;
