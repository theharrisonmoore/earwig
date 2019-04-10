import styled from "styled-components";

import { Organizations, colors, shadows } from "./../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
`;

export const Banner = styled.div`
  background: ${props => Organizations[`${props.category}`].primary};
  height: 2.75rem;
  width: 100%;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  position: fixed;

  p {
    margin-bottom: 0;

    span {
      font-weight: 700;
    }
  }
`;

export const Header = styled.div`
  box-shadow: ${shadows.boxShadow};
  display: flex;
  flex-direction: column;
  margin-top: 2.75rem;
`;

export const CompanyDetails = styled.div`
  border-bottom: ${colors.gray2} 1px solid;
  display: flex;
  flex-direction: row;
  padding: 1.5rem 0;
  margin: 0 7rem;
`;

export const CompanyTitle = styled.div`
  min-width: 50%;
  display: flex;
  text-align: left;

  div {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const ButtonDiv = styled.div`
  min-width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const OrgButton = styled.button`
  border: ${props => Organizations[`${props.category}`].primary} solid 2px;
  box-sizing: border-box;
  color: ${props => Organizations[`${props.category}`].primary};
  background: ${colors.white};
  transition: all ease-in 0.1s;
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  box-shadow: ${shadows.buttonShadow};

  :hover {
    background: ${props => Organizations[`${props.category}`].primary};
    color: ${colors.white};
  }
`;

export const ReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 7rem;

  h3 {
    font-size: 1.75rem;
    font-style: italic;
    font-weight: 300;
    color: ${colors.profileFontColor};
    margin-bottom: 1.5rem;
  }
`;

export const ReviewButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewType = styled.div`
  display: flex;
  width: 45%;
  align-items: center;
`;

export const ReviewButton = styled.button`
  background: ${props => Organizations[`${props.category}`].primary};
  color: ${colors.white};
  display: flex;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 0.25rem;
  height: 3rem;
  padding: 0 0.5rem;
  align-items: center;
  min-width: 7rem;

  h4 {
    margin: 0;
    font-size: 1rem;
    width: 50%;
    text-align: left;
    line-height: 0.9rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    font-style: italic;
  }
`;

export const QuickReviewButton = styled(ReviewButton)`
  width: 25%;
  position: relative;
  margin-left: auto;

  :after {
    content: "";
    border: 2px ${props => Organizations[`${props.category}`].primary} dashed;
    position: absolute;
    left: -95%;
    height: 100%;
    width: 100%;
    z-index: -1;
    border-radius: 0.25rem;
  }
`;
