import React from 'react';
import styled from 'styled-components';

import Icon from "./Icon/Icon";

import { colors } from "../../theme";

export const TabsDivFullWidth = styled.div`
  border-bottom: 1px solid ${colors.dustyGray2};
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 2 !important;
  margin: 0;
`;

export const TabsDiv = styled.div`
  display: flex;
  max-width: 376px;
  width: 100%;
  margin: 0 auto;
  position: relative;
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
`;

export const TabTitle = styled.span`
  font-size: 1rem;
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

const GeneralTabs = ({ setActiveTab, activeTab, tabOne, tabTwo }) => {
  return (
    <TabsDivFullWidth>
      <TabsDiv onClick={setActiveTab}>
        <Tab isActive={activeTab === tabOne} data-tab={tabOne}>
          <Icon icon={tabOne} width="19" height="19" />
          <TabTitle isActive={activeTab === tabOne}>{tabOne}</TabTitle>
        </Tab>
        <Tab isActive={activeTab === tabTwo} data-tab={tabTwo}>
          <Icon icon={tabTwo} width="19" height="19" />
          <TabTitle isActive={activeTab === tabTwo}>{tabTwo}</TabTitle>
        </Tab>
        <Underline left={activeTab === tabOne} />
      </TabsDiv>
    </TabsDivFullWidth>
  );
};

export default GeneralTabs;