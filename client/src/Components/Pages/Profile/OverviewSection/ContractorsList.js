import React from "react";
import { Icon as AntdIcon, Popover } from "antd";
import { Link } from "react-router-dom";

import {
  ContractorDiv,
  ContractorText,
  ContractorListLink,
} from "../Profile.style";

const DropdownList = ({ contractorAnswers }) => (
  <div style={{ maxHeight: "150px", overflow: "auto" }}>
    {contractorAnswers.map(item => (
      <Link to={`/profile/${item._id}`}>{item.name}</Link>
    ))}
  </div>
);

export default ({ contractorAnswers }) => {
  return (
    <ContractorDiv>
      <ContractorText>
        Main Company:{" "}
        <span className="contactor-name">
          {contractorAnswers[0] && contractorAnswers[0].name ? (
            <Link
              to={`/profile/${contractorAnswers[0]._id}`}
              style={{ color: "black", textDecoration: "underline" }}
            >
              {contractorAnswers[0] && contractorAnswers[0].name}
            </Link>
          ) : (
            "No answers yet"
          )}
        </span>
      </ContractorText>
      {contractorAnswers && contractorAnswers.length > 1 && (
        <Popover
          placement="bottom"
          title="Contractors List"
          content={<DropdownList contractorAnswers={contractorAnswers} />}
          trigger="click"
        >
          <ContractorListLink>
            More main companies on this site
          </ContractorListLink>
          <AntdIcon style={{ color: "black" }} type="caret-down" />
        </Popover>
      )}
    </ContractorDiv>
  );
};
