import React, { Component } from "react";

import { Collapse, Icon as AntdIcon } from "antd";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import { colors } from "../../../theme";

const Wrapper = styled.div`
  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0.5rem 0 0 1.625rem !important;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0.5rem 0 0 1.625rem !important;
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
          activeKey={isOpen ? panelKey : "-"}
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
                    fontSize: 15,
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
