import styled from "styled-components";

import { Label } from "./../../Common/Formik/Formik.style";

import { colors } from "./../../theme";

export const EditWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 1.5rem auto;
  padding: 0 1.5rem;
  padding-top: 3rem;
`;

export const Section = styled.div`
  width: 100%;
  padding: 2.75rem 0;
  text-align: left;
  border-bottom: 1px solid ${colors.inputBorder};

  /* &:first-child{
  padding-top 0;
  } */
`;

export const Title = styled.h2`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin: 0;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .row__image-container {
    & > * {
      display: inline-block;
    }

    & > img {
      margin-right: 1rem;
    }
  }
`;

export const EditButton = styled.button`
  font-weight: 900;
  font-size: 1rem;
  color: ${colors.profileFontColor};
  background: none;
  border: none;
  outline: none;

  &:active,
  &:focus {
    outline: none;
  }
`;

export const PasswordWrapper = styled.div`
  padding-top: 2rem;
`;

export const LightLabel = styled(Label)`
  font-weight: 100;
  font-size: 1rem;
`;
