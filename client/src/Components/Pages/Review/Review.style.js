import styled from "styled-components";

import { colors, organizations } from "../../../theme";

export const Header = styled.section`
  width: 100%;
  background-color: ${props => organizations[props.orgType].primary};
  color: ${colors.white};
  font-size: 1.25rem;
  font-weight: 400;
  padding: 1rem 2rem;
  padding-left: 3rem;
`;

export const ReviewWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 40rem;
  margin: 0 auto;
  text-align: left;
  background-color: ${colors.white};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space;
  align-items: center;
`;

export const ImageBox = styled.div`
  margin-right: 2rem;
`;

export const Image = styled.img`
  width: 3rem;
`;

export const Organization = styled.div``;

export const Paragraph = styled.p`
  margin-bottom: 0;
`;

export const OrgName = styled.h2`
  margin-bottom: 0;
  font-weight: 900;
  font-size: 1.375rem;
  color: ${colors.white};
`;

export const ReviewTime = styled.p`
  margin-bottom: 0;
`;

export const FormWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
`;

export const UserAgreement = styled.div``;

export const Level2Header = styled.h2`
  border-bottom: 1px solid ${colors.lightGray};
  display: inline-block;
`;

export const AgreementLabel = styled.label`
  font-size: 15px;
  color: ${colors.profileFontColor};
  width: 90%;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SubmitButton = styled.button`
  background: ${props => organizations[props.orgType].primary};
  border: 1px solid ${colors.inputBorder};
  box-shadow: ${colors.buttonShadow};
  border-radius: 6px;
  font-weight: 900;
  font-size: 20px;
  color: white;
  padding: 1rem 3rem;
  display: block;
  margin: 2rem auto 3rem;
`;
