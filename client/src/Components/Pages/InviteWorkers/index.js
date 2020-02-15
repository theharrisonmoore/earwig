import React from "react";

import Icon from "../../Common/Icon/Icon";
import SocialLinks from "../../Common/SocialLinks";
import CentredBluePurpleLayout from "../../Common/Layout/CentredBluePurpleLayout";

import Link from "../../Common/Link";

import { InviteWrapper, Head3, PromoParagraph } from "./inviteWorkers.style";
import { colors } from "../../../theme";

import { MY_POINTS_URL } from "../../../constants/naviagationUrls";

const InviteWorkers = ({ id: userId, points }) => {
  let referralLink = `https://${window.location.host}/signup/${userId}`;
  if (process.env.NODE_ENV === "development") {
    referralLink = `http://${window.location.host}/signup/${userId}`;
  }

  const title =
    "Mate, never choose a bad construction job again! Have you heard about earwig? It’s the first construction worker voice platform that lets us give and get feedback about every agency, payroll company, worksite and employer in the industry so we can avoid bad jobs and choose the best. It was set-up by a sparky who’s used agencies for 7 years. I’ve joined up. You should too mate. It’s free and secure.";

  const body = `Hi mate, have you heard about earwig? It’s the first construction worker voice platform that lets us give and get feedback about every agency, payroll company, worksite and employer in the industry so we can avoid bad jobs and choose the best. It was set-up by a sparky who’s used agencies for 7 years. I’ve joined up. You should too mate. It’s free and secure.
              >>> ${referralLink}
              If the link isn’t working, copy and paste it into your browser.`;

  const emailSubject = "Mate, never choose a bad construction job again!";

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
        <SocialLinks
          url={referralLink}
          title={title}
          body={body}
          emailSubject={emailSubject}
        />
        <PromoParagraph bottom>
          You’ll earn 1 point for every worker who signs up using your magic
          link. Your points are an important measure of how helpful you’ve been
          to other workers. We give awards and run competitions from time to
          time.
        </PromoParagraph>
        <PromoParagraph bottom>
          Points you've earned:{" "}
          <Link
            to={MY_POINTS_URL}
            text={`${points} points`}
            type="primary"
            style={{ display: "inline", fontSize: "15px" }}
          />
        </PromoParagraph>
      </InviteWrapper>
    </CentredBluePurpleLayout>
  );
};

export default InviteWorkers;
