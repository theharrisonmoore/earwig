import React, { Component } from "react";

import { Collapse, Icon as AntdIcon } from "antd";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import { colors } from "../../../theme";

const Wrapper = styled.div`
  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none;
  }
`;

const { Panel } = Collapse;
class RepliesAndCommentsCollaps extends Component {
  render() {
    const {
      children,
      id,
      isOpen,
      panelKey,
      count,
      activeKey,
      onToggle,
      comments,
    } = this.props;

    return (
      <Wrapper>
        <Collapse
          bordered={false}
          data-id={id}
          onChange={onToggle}
          accordion
          activeKey={activeKey}
        >
          <Panel
            showArrow={false}
            key={panelKey}
            header={
              <>
                {isOpen ? (
                  <AntdIcon
                    fontWeight={700}
                    type="up"
                    style={{
                      color: colors.primary,
                      width: "15px",
                      marginRight: "0.5rem",
                      fontWeight: 700,
                    }}
                  />
                ) : (
                  <Icon
                    icon="reply"
                    width="15px"
                    style={{
                      transform: "rotate(180deg)",
                      marginRight: "0.5rem",
                    }}
                    fill={colors.primary}
                  />
                )}
                <span
                  style={{
                    fontWeight: 700,
                    color: colors.primary,
                    marginBottom: "1rem",
                  }}
                >
                  {isOpen
                    ? `Hide ${comments ? "more" : `Replies`}`
                    : `Read ${comments ? "more" : `Replies`} (${count})`}
                </span>
              </>
            }
          >
            {children}
          </Panel>
        </Collapse>
      </Wrapper>
    );
  }
}

export default RepliesAndCommentsCollaps;
