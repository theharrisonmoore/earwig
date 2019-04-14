import styled from "styled-components";
import { Link } from "react-router-dom";
import { Label, Button } from "./../../Common/Formik/Formik.style";

import { colors } from "./../../theme";

export const EditWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 1.5rem auto;
  padding: 0 1.5rem;
  padding-top: 3rem;

  & > div:first-child {
  padding-top 0;
  }
`;

export const Section = styled.div`
  width: 100%;
  padding: 2.75rem 0;
  text-align: left;
  border-bottom: 1px solid ${colors.inputBorder};
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
  align-content: center;

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
  cursor: pointer;
  margin-bottom: 0;

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

export const StyledButton = styled(Button)`
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const StyledLink = styled(Link)`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin: 0;
  text-decoration: none;

  &:active,
  &:hover {
    text-decoration: none;
    color: ${colors.profileFontColor};
    outline: none;
  }
`;
