import styled from "styled-components";

import { colors, organizations } from "../../theme";

export const ReviewWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 40rem;
  margin: 0 auto;
  text-align: left;

  .review-header {
    width: 100%;
    background-color: ${props => organizations[props.orgType].primary};
    color: ${colors.white};
    font-size: 1.25rem;
    font-weight: 400;
    padding: 1rem 2rem;
    padding-left: 3rem;

    .content {
      display: flex;
      justify-content: space;
      align-items: center;
      .image-box {
        margin-right: 2rem;

        img {
          width: 3rem;
        }
      }
      .org {
        p {
          margin-bottom: 0;
        }
        .org-name {
          font-weight: 900;
          font-size: 1.375rem;
        }
      }
    }
  }

  .questions {
    width: 90%;
    margin: 0 auto;

    .question-container {
      margin-bottom: 1rem;
    }
  }
`;

export const ReviewHeader = styled.div.attrs({ className: "login" })`
  max-width: 70rem;
  margin: 0 auto;
  padding-top: 3rem;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }
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
  margin: 0 auto;
  margin-bottom: 10rem;
`;

export const UserAgreement = styled.div`
  h2 {
    border-bottom: 1px solid grey;
    display: inline-block;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .agreement-checkbox {
    width: 10%;
  }

  .agreement-label {
    font-size: 15px;
    color: #4a4a4a;
    width: 90%;
  }
`;
