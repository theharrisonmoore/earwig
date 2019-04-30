import React from "react";

import styled, { css } from "styled-components";

import Add from "./Add";
import Agency from "./Agency";
import AgencyThanks from "./AgencyThanks";
import Arrow from "./Arrow";
import Clock30s from "./Clock30s";
import Clock2min from "./Clock2min";
import CommentsReceived from "./CommentsReceived";
import Company from "./Company";
import CompanyThanks from "./CompanyThanks";
import FAQ from "./FAQ";
import GetVerified from "./GetVerified";
import HelpfulLinks from "./HelpfulLinks";
import HelpingHand from "./HelpingHand";
import JobBoard from "./JobBoard";
import LogoutLogin from "./LogoutLogin";
import MedalIcon1 from "./MedalIcon1";
import MedalIcon2 from "./MedalIcon2";
import OrganisationalRatings from "./OrganisationalRatings";
import OrHorizontal from "./OrHorizontal";
import OrVertical from "./OrVertical";
import OrWhite from "./OrWhite";
import ParkingSign from "./ParkingSign";
import Payroll from "./Payroll";
import PayrollCharges from "./PayrollCharges";
import Payscales from "./Payscales";
import PayslipRatings from "./PayslipRatings";
import PhotoCamera from "./PhotoCamera";
import PointsEarned from "./PointsEarned";
import PrivacyTerms from "./PrivacyTerms";
import ReportFlag from "./ReportFlag";
import Search from "./Search";
import ShapeEarwig from "./ShapeEarwig";
import Supervisor from "./Supervisor";
import Support from "./Support";
import Tick from "./Tick";
import TrophyIcon1 from "./TrophyIcon1";
import TrophyIcon2 from "./TrophyIcon2";
import TrustRating from "./TrustRating";
import VoiceRecord from "./VoiceRecord";
import WelfareSafety from "./WelfareSafety";
import Win from "./Win";
import Worksite from "./Worksite";
import WorksiteThanks from "./WorksiteThanks";

const iconStyles = props => css`
  width: ${props.width || "100%"};
  height: ${props.height || "100%"};
  color: ${props.color};
  margin: ${props.margin || "0 0 0 0"};
`;

const iconMap = {
  add: Add,
  agency: Agency,
  agencyThanks: AgencyThanks,
  arrow: Arrow,
  clock30s: Clock30s,
  clock2min: Clock2min,
  commentsReceived: CommentsReceived,
  company: Company,
  companyThanks: CompanyThanks,
  faq: FAQ,
  getVerified: GetVerified,
  helpfulLinks: HelpfulLinks,
  helpingHand: HelpingHand,
  jobBoard: JobBoard,
  logoutLogin: LogoutLogin,
  medalIcon1: MedalIcon1,
  medalIcon2: MedalIcon2,
  organisationalRatings: OrganisationalRatings,
  orHorizontal: OrHorizontal,
  orVertical: OrVertical,
  orWhite: OrWhite,
  parkingSign: ParkingSign,
  payroll: Payroll,
  payrollCharges: PayrollCharges,
  payscales: Payscales,
  payslipRatings: PayslipRatings,
  photoCamera: PhotoCamera,
  pointsEarned: PointsEarned,
  privacyTerms: PrivacyTerms,
  reportFlag: ReportFlag,
  search: Search,
  shapeEarwig: ShapeEarwig,
  supervisor: Supervisor,
  support: Support,
  tick: Tick,
  trophyIcon1: TrophyIcon1,
  trophyIcon2: TrophyIcon2,
  trustRating: TrustRating,
  voiceRecord: VoiceRecord,
  welfareSafety: WelfareSafety,
  win: Win,
  worksite: Worksite,
  worksiteThanks: WorksiteThanks
};

const styledIconMap = Object.keys(iconMap).reduce((accum, curr) => {
  const IconSvg = iconMap[curr];

  if (!IconSvg) {
    throw new Error(`Icon ${curr} not found`);
  }

  accum[curr] = styled(IconSvg)(iconStyles);
  return accum;
}, {});

const Icon = props => {
  if (!iconMap[props.icon]) {
    console.warn(`<Icon /> called with invalid icon prop "${props.icon}"`);
    return null;
  }
  const StyledIcon = styledIconMap[props.icon];

  return <StyledIcon {...props} />;
};

export default Icon;
