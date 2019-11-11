import React from "react";

import { Skeleton, Spin } from "antd";

import { OrgsListWrapper, MainKey, SubKey } from "./Search.style";

import Suggestion from "./OrganisationRow";

const SkeletonWrapper = () => {
  return (
    <Spin tip="loading...">
      <div style={{ width: "300px" }}>
        <Skeleton loading active style={{ width: "300px" }}></Skeleton>
        <Skeleton loading active></Skeleton>
        <Skeleton loading active></Skeleton>
        <Skeleton loading active></Skeleton>
        <Skeleton loading active></Skeleton>
      </div>
    </Spin>
  );
};

const OrganisationsList = ({ sortedOrgs, loading }) => {
  return (
    <OrgsListWrapper>
      {loading ? (
        <SkeletonWrapper />
      ) : (
        sortedOrgs.map(org => (
          <div onShow>
            {org.mainKey && <MainKey>{org.mainKey}</MainKey>}
            {org.subKey && <SubKey>{org.subKey}</SubKey>}

            <Suggestion organisation={org} key={org._id} withoutBorder noIcon />
          </div>
        ))
      )}
    </OrgsListWrapper>
  );
};

export default OrganisationsList;
