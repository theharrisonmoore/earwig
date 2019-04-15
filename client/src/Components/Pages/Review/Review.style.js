import styled from "styled-components";

import { colors, organizations } from "../../theme";

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
  color: white;
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
  border-bottom: 1px solid grey;
  display: inline-block;
`;

export const AgreementLabel = styled.label`
  font-size: 15px;
  color: #4a4a4a;
  width: 90%;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SubmitButton = styled.button`
  background: ${props => organizations[props.orgType].primary};
  border: 1px solid #979797;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.195772), inset 0px 2px 0px #ffffff;
  border-radius: 6px;
  font-weight: 900;
  font-size: 20px;
  color: white;
  padding: 1rem 3rem;
  display: block;
  margin: 2rem auto 3rem;
`;
