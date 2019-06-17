const API_PREFIX = "/api";

const LOGIN_URL = "/login"; // to use on the server
const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

const LOGOUT_URL = "/login";
const API_LOGOUT_URL = `${API_PREFIX}${LOGOUT_URL}`;

const GET_QUESTIONS_URL = "/questions";
const API_GET_QUESTIONS_URL = `${API_PREFIX}${GET_QUESTIONS_URL}`;

const REVIEW_URL = "/review";
const API_POST_REVIEW_URL = `${API_PREFIX}${REVIEW_URL}`;

const UPLOAD_WORKSITE_IMAGE_URL = "/worksite-image";
const API_UPLOAD_WORKSITE_IMAGE_URL = `${API_PREFIX}${UPLOAD_WORKSITE_IMAGE_URL}`;

const REPORT_CONTENT_URL = "/report-content";
const API_REPORT_CONTENT_URL = `${API_PREFIX}${REPORT_CONTENT_URL}`;

// quick review section
const QUICK_REVIEW_URL = "/short-review";
const API_QUICK_REVIEW_URL = `${API_PREFIX}${QUICK_REVIEW_URL}`;

const SEARCH_URL = "/search";
const API_SEARCH_URL = `${API_PREFIX}${SEARCH_URL}`;

const ADD_ORGANIZATION_URL = "/add-organization";
const API_ADD_ORGANIZATION_URL = `${API_PREFIX}${ADD_ORGANIZATION_URL}`;

const TRADE_URL = "/trades";
const API_TRADE_URL = `${API_PREFIX}${TRADE_URL}`;

const UPLOAD_VERIFICATION_IMAGE_URL = "/upload-verification-image";
const API_UPLOAD_VERIFICATION_IMAGE_URL = `${API_PREFIX}${UPLOAD_VERIFICATION_IMAGE_URL}`;

const ADD_COMMENT_ON_QUESTION_URL = "/question/comment";
const API_ADD_COMMENT_ON_QUESTION_URL = `${API_PREFIX}${ADD_COMMENT_ON_QUESTION_URL}`;

const GET_OVERALL_REVIEW_REPLIES_URL = "/reviews/overall/replies";
const API_GET_OVERALL_REVIEW_REPLIES_URL = `${API_PREFIX}${GET_OVERALL_REVIEW_REPLIES_URL}`;

const ADD_COMMENT_ON_REVIEW_URL = "/reviews/overall/replies";
const API_ADD_COMMENT_ON_REVIEW_URL = `${API_PREFIX}${ADD_COMMENT_ON_REVIEW_URL}`;

const CONFIRM_EMAIL = "/confirm-email";
const API_CONFIRM_EMAIL = `${API_PREFIX}${CONFIRM_EMAIL}`;

const EDIT_PROFILE = "/edit-profile";
const API_EDIT_PROFILE = `${API_PREFIX}${EDIT_PROFILE}`;

const SIGN_UP = "/signup";
const API_SIGN_UP = `${API_PREFIX}${SIGN_UP}`;

const USERS = "/users";
const API_USERS = `${API_PREFIX}${USERS}`;

const RESET_PASSWORD = "/reset-password";
const API_RESET_PASSWORD = `${API_PREFIX}${RESET_PASSWORD}`;

const SET_PASSWORD = "/set-password";
const API_SET_PASSWORD = `${API_PREFIX}${SET_PASSWORD}`;

const ADMIN = "/admin";

module.exports = {
  // React variables
  API_LOGIN_URL,
  API_GET_QUESTIONS_URL,
  API_POST_REVIEW_URL,
  API_QUICK_REVIEW_URL,
  API_UPLOAD_WORKSITE_IMAGE_URL,
  API_SEARCH_URL,
  API_LOGOUT_URL,
  API_ADD_ORGANIZATION_URL,
  API_TRADE_URL,
  API_UPLOAD_VERIFICATION_IMAGE_URL,
  API_REPORT_CONTENT_URL,
  API_ADD_COMMENT_ON_QUESTION_URL,
  API_GET_OVERALL_REVIEW_REPLIES_URL,
  API_ADD_COMMENT_ON_REVIEW_URL,
  API_CONFIRM_EMAIL,
  API_EDIT_PROFILE,
  API_SIGN_UP,
  API_USERS,
  API_RESET_PASSWORD,
  API_SET_PASSWORD,

  // server variables
  LOGIN_URL,
  LOGOUT_URL,
  GET_QUESTIONS_URL,
  ADD_ORGANIZATION_URL,
  REVIEW_URL,
  QUICK_REVIEW_URL,
  UPLOAD_WORKSITE_IMAGE_URL,
  TRADE_URL,
  UPLOAD_VERIFICATION_IMAGE_URL,
  SEARCH_URL,
  REPORT_CONTENT_URL,
  ADD_COMMENT_ON_QUESTION_URL,
  GET_OVERALL_REVIEW_REPLIES_URL,
  ADD_COMMENT_ON_REVIEW_URL,
  ADMIN,
  CONFIRM_EMAIL,
  EDIT_PROFILE,
  SIGN_UP,
  USERS,
  RESET_PASSWORD,
  SET_PASSWORD
};
