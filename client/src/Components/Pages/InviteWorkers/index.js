import React from "react";

import Icon from "../../Common/Icon/Icon";
import SocialLinks from "../../Common/SocialLinks";
import CentredBluePurpleLayout from "../../Common/Layout/CentredBluePurpleLayout";

import { InviteWrapper, Head3, PromoParagraph } from "./inviteWorkers.style";
import { colors } from "../../../theme";

const InviteWorkers = ({ id: userId }) => {
  return (
    <CentredBluePurpleLayout>
      <InviteWrapper>
        <Icon
          icon="win"
          height="70"
          width="70"
          margin="1rem 0 0.5rem 0"
          fill={colors.dustyGray2}
        />

        <Head3>Together we are powerful!</Head3>
        <PromoParagraph>
          The more workers use earwig, the more valuable it becomes for us all.
        </PromoParagraph>

        <PromoParagraph>Share your magic link via:</PromoParagraph>
        <SocialLinks userId={userId} />
        <PromoParagraph bottom>
          You’ll earn 1 point for every worker who gets verified using your
          magic link. Your points are an important measure of how helpful you’ve
          been to other workers. We give awards and run competitions from time
          to time.
        </PromoParagraph>
      </InviteWrapper>
    </CentredBluePurpleLayout>
  );
};

export default InviteWorkers;
