import React from "react";
import styled, { css } from "styled-components";

import Icon from "./Icon/Icon";
import PopoverComponent from "./Popover";

import { colors } from "../../theme";

import { SIGNUP_URL } from "../../constants/naviagationUrls";

export const TabsDivFullWidth = styled.div`
  border-bottom: 1px solid ${colors.dustyGray2};
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: ${({ zIndex }) => zIndex || "2"} !important;
  margin: 0;
  height: ${({ fixedHeight }) => fixedHeight};
`;

export const TabsDiv = styled.div`
  display: flex;
  max-width: 376px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

export const level0PromoStyle = css`
  color: ${colors.dustyGray2};
`;

export const Tab = styled.div`
  display: flex;
  color: ${colors.primary};
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0;
  width: 50%;
  position: relative;
  cursor: pointer;
  pointer-events: all !important;

  * {
    pointer-events: none;
  }

  ${({ level }) => level === 0 && level0PromoStyle}
`;

export const TabTitle = styled.span`
  font-size: 15px;
  margin-top: 0.25rem;
  text-transform: capitalize;

  font-weight: ${({ isActive }) => (isActive ? "500" : "normal")};
`;

export const Underline = styled.div`
  position: absolute;
  content: "";
  width: 50%;
  height: 5px;
  background-color: ${colors.primary};
  margin-left: ${({ left }) => (left ? 0 : "50%")};
  border: 0;
  display: block;
  z-index: 1;
  bottom: 0;
  transition: 400ms all;
`;

const GeneralTabs = ({
  setActiveTab,
  activeTab,
  tabOne,
  tabTwo,
  zIndex,
  fixedHeight,
  level,
  category,
  orgId,
}) => {
  return (
    <TabsDivFullWidth zIndex={zIndex} fixedHeight={fixedHeight}>
      <TabsDiv onClick={setActiveTab}>
        <Tab isActive={activeTab === tabOne} data-tab={tabOne}>
          <Icon icon={tabOne} width="19" height="19" />
          <TabTitle isActive={activeTab === tabOne}>{tabOne}</TabTitle>
        </Tab>
        {level > 0 ? (
          <Tab isActive={activeTab === tabTwo} data-tab={tabTwo}>
            <Icon icon={tabTwo} width="19" height="19" />
            <TabTitle isActive={activeTab === tabTwo}>{tabTwo}</TabTitle>
          </Tab>
        ) : (
          // <Tab level={level} data-tab={tabTwo}>
          //   <Icon
          //     icon={tabTwo}
          //     width="19"
          //     height="19"
          //     color={colors.dustyGray2}
          //     opacity={tabTwo === "detailed" && "0.5"}
          //   />
          //   <TabTitle>{tabTwo}</TabTitle>
          // </Tab>
          <div style={{ width: "50%" }}>
            <PopoverComponent
              popoverOptions={{
                text: `Sign up to see more information including detailed reviews and company contact details.`,
                actionButtonTxt: "Sign up to see more",
                linkButtonOptions: {
                  pathname: SIGNUP_URL,
                  // COMMENTED_VERIFICATION_CHECK
                  // pathname: level >= 1 ? UPLOAD_VERIFICATION_PHOTO : SIGNUP_URL,
                  state: {
                    category,
                    orgId,
                    redirectToProfile: true,
                  },
                },
              }}
              children={
                <Tab level={level} data-tab={tabTwo} style={{ width: "100%" }}>
                  <Icon
                    icon={tabTwo}
                    width="19"
                    height="19"
                    color={colors.dustyGray2}
                    opacity={tabTwo === "detailed" && "0.5"}
                  />
                  <TabTitle>{tabTwo}</TabTitle>
                </Tab>
              }
            />
          </div>
        )}
        <Underline left={activeTab === tabOne} />
      </TabsDiv>
    </TabsDivFullWidth>
  );
};

export default GeneralTabs;
