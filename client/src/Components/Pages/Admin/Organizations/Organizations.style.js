import styled from "styled-components";

import { colors } from "./../../../../theme";

export const AddOrgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  flex-direction: column;
`;

export const AddOrgTitle = styled.p`
  margin-right: 1rem;
  min-width: 15%;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 1.125rem;
`;

export const AddHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

export const AddOrgForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputLabel = styled.label`
  margin-right: 1rem;
  margin-bottom: 0;
  width: 6rem;
`;

export const InputDiv = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  width: 60%;
`;
export const ErrorMsg = styled.div`
  color: ${colors.red};
  margin-bottom: 1rem;
`;

export const SelectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  align-items: space-around;

  & > div {
    margin: 1rem auto;
    width: 50%;
  }
`;

export const Paragraph = styled.p`
  font-size: 1.25rem;
  text-align: left;
  margin-bottom: 0;
  text-align: center;

  span {
    font-weight: 700;
  }
`;
