import styled from "styled-components";

import { colors, shadows } from "./../theme";

export const UploadImageWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 1rem auto;
  padding: 0 1rem;
  padding-top: 2rem;
`;

export const ContentWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
`;

export const SelectWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const Heading = styled.h1`
  color: ${colors.mineShaft2};
  font-size: 1.125rem;
  font-weight: 900;
  margin-bottom: 2rem;
`;
export const SubHeading = styled.h2`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.mineShaft2};
  text-align: left;
  margin-bottom: 0;
`;

export const CardIcon = styled.img`
  width: 15vw;
  height: 15vw;
  max-width: 62rem;
  max-height: 62rem;
  margin-bottom: 1rem;
`;

export const Example = styled.img`
  margin-bottom: 0.25rem;
`;

export const Label = styled.label``;

export const Paragraph = styled.p`
  font-weight: 900;
  font-size: 1rem;
  text-align: left;
  color: ${colors.dustyGray};
  margin-bottom: 0.25rem;
`;

export const Button = styled.button`
  background: ${colors.white};
  border: 1px solid ${colors.mineShaft2};
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  height: 3.25rem;
  width: 100%;
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin-bottom: 2rem;
  margin-top: ${({ marginTop }) => (marginTop ? "2rem" : "0")};
  outline: none;

  &:active,
  &:focus {
    outline: none;
  }
`;

export const Link = styled.a`
  font-weight: 900;
  font-size: 1.125rem;

  color: ${colors.profileFontColor};
`;
