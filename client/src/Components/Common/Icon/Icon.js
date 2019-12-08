import React from "react";

import styled, { css } from "styled-components";

import Add from "./Add";
import AddComment from "./AddComment";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import Agency from "./Agency";
import AgencyThanks from "./AgencyThanks";
import Arrow from "./Arrow";
import Bus from "./Bus";
import Canteen from "./Canteen";
import CheapFood from "./CheapFood";
import Clock30s from "./Clock30s";
import Clock2min from "./Clock2min";
import Close from "./Close";
import CommentsReceived from "./CommentsReceived";
import Company from "./Company";
import CompanyThanks from "./CompanyThanks";
import Email from "./Email";
import FAQ from "./FAQ";
import Fingerprint from "./Fingerprint";
import Gasmask from "./Gasmask";
import GetVerified from "./GetVerified";
import Hamburger from "./Hamburger";
import HelpfulLinks from "./HelpfulLinks";
import HelpingHand from "./HelpingHand";
import HotFood from "./HotFood";
import Info from "./Info";
import JobBoard from "./JobBoard";
import Lockers from "./Lockers";
import Logo from "./Logo";
import LogoBeta from "./LogoBeta";
import LogoutLogin from "./LogoutLogin";
import MedalIcon1 from "./MedalIcon1";
import MedalIcon2 from "./MedalIcon2";
import NumberOne from "./NumberOne";
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
import PrayerRoom from "./PrayerRoom";
import PrivacyTerms from "./PrivacyTerms";
import RaiseHand from "./RaiseHand";
import ReportFlag from "./ReportFlag";
import Search from "./Search";
import ShapeEarwig from "./ShapeEarwig";
import StarComment from "./StarComment";
import Supervisor from "./Supervisor";
import Support from "./Support";
import Tick from "./Tick";
import TrophyIcon1 from "./TrophyIcon1";
import TrophyIcon2 from "./TrophyIcon2";
import TrustRating from "./TrustRating";
import User from "./User";
import VoiceRecord from "./VoiceRecord";
import Warning from "./Warning";
import Water from "./Water";
import WelfareSafety from "./WelfareSafety";
import Win from "./Win";
import Worksite from "./Worksite";
import WorksiteThanks from "./WorksiteThanks";
import Reply from "./Reply";
import Calendar from "./Calendar";
import Overview from "./Overview";
import Detailed from "./Detailed";
import Like from "./Like";

const iconStyles = props => css`
  width: ${props.width || "100%"};
  height: ${props.height || "100%"};
  color: ${props.color};
  margin: ${props.margin || "0 0 0 0"};
  cursor: ${props.cursor};
`;

const iconMap = {
  right: RightArrow,
  left: LeftArrow,
  add: Add,
  addComment: AddComment,
  agency: Agency,
  agencyThanks: AgencyThanks,
  arrow: Arrow,
  bus: Bus,
  canteen: Canteen,
  cheapFood: CheapFood,
  clock30s: Clock30s,
  clock2min: Clock2min,
  close: Close,
  commentsReceived: CommentsReceived,
  company: Company,
  companyThanks: CompanyThanks,
  email: Email,
  faq: FAQ,
  fingerprint: Fingerprint,
  gasmask: Gasmask,
  getVerified: GetVerified,
  hamburger: Hamburger,
  hotFood: HotFood,
  helpfulLinks: HelpfulLinks,
  helpingHand: HelpingHand,
  info: Info,
  jobBoard: JobBoard,
  lockers: Lockers,
  logo: Logo,
  logoBeta: LogoBeta,
  logoutLogin: LogoutLogin,
  medalIcon1: MedalIcon1,
  medalIcon2: MedalIcon2,
  numberOne: NumberOne,
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
  prayerRoom: PrayerRoom,
  privacyTerms: PrivacyTerms,
  raiseHand: RaiseHand,
  reportFlag: ReportFlag,
  search: Search,
  shapeEarwig: ShapeEarwig,
  starComment: StarComment,
  supervisor: Supervisor,
  support: Support,
  tick: Tick,
  trophyIcon1: TrophyIcon1,
  trophyIcon2: TrophyIcon2,
  trustRating: TrustRating,
  user: User,
  voiceRecord: VoiceRecord,
  warning: Warning,
  water: Water,
  welfareSafety: WelfareSafety,
  win: Win,
  worksite: Worksite,
  worksiteThanks: WorksiteThanks,
  reply: Reply,
  calendar: Calendar,
  overview: Overview,
  detailed: Detailed,
  like: Like,
};

const styledIconMap = Object.keys(iconMap).reduce((accum, curr) => {
  const IconSvg = iconMap[curr];

  if (!IconSvg) {
    throw new Error(`Icon ${curr} not found`);
  }

  // eslint-disable-next-line no-param-reassign
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
