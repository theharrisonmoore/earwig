import styled from "styled-components";

import { colors, breakpoints } from "../../../theme";
import Icon from "../../Common/Icon/Icon";

export const UploadImageWrapper = styled.div`
  display: flex;
`;

export const EditIcon = styled(Icon)`
  width: 15vw;
  height: 15vw;
  max-width: 5rem;
  max-height: 5rem;
  margin-bottom: 1rem;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 25rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }
`;

export const SelectWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  /* max-width: 24rem; */
`;

export const PurpleDiv = styled.div`
  width: 0%;
  background-color: ${colors.heliotrope};
  padding-bottom: 100px;

  @media ${breakpoints.tablet} {
    width: 50%;
  }
`;

export const Heading = styled.h1`
  color: ${colors.mineShaft2};
  font-size: 2rem;
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

export const Example = styled.img`
  max-width: 70%;
  margin: 1rem auto;
`;

export const Label = styled.label``;

export const Paragraph = styled.p`
  font-size: 1rem;
  text-align: left;
  color: ${colors.dustyGray};
  margin-bottom: 0.25rem;
`;

export const ImageInput = styled.input`
  display: none;
  width: auto;
`;

export const Error = styled.p`
  margin-top: 0.5rem;
  margin-bottom: -2rem;
  color: red;
  font-size: 1rem;
`;

export const ModalText = styled.p`
  font-weight: bold;
  color: ${colors.dustyGray2};
  text-align: center;
  margin-bottom: 0;
`;
