import React, { Component } from "react";

import { Collapse, Icon as AntdIcon } from "antd";
import Icon from "../Icon/Icon";
import { colors } from "../../../theme";

const { Panel } = Collapse;
class RepliesAndCommentsCollaps extends Component {
  render() {
    const {
      children,
      id,
      isActive,
      panelKey,
      count,
      activeKey,
      onToggle,
    } = this.props;

    return (
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
              {isActive ? (
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
                {isActive ? "Hide Replies" : `Read Replies (${count})`}
              </span>
            </>
          }
        >
          {children}
        </Panel>
      </Collapse>
    );
  }
}

export default RepliesAndCommentsCollaps;
