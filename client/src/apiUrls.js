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

// quick review section
const QUICK_REVIEW_URL = "/short-review";
const API_QUICK_REVIEW_URL = `${API_PREFIX}${QUICK_REVIEW_URL}`;

const SEARCH_URL = "/search";
const API_SEARCH_URL = `${API_PREFIX}${SEARCH_URL}`;
const ADD_ORGANIZATION_URL = "/add-organization";

const API_ADD_ORGANIZATION_URL = `${API_PREFIX}${ADD_ORGANIZATION_URL}`;
module.exports = {
  // React varibles
  API_LOGIN_URL,
  API_GET_QUESTIONS_URL,
  API_POST_REVIEW_URL,
  API_QUICK_REVIEW_URL,
  API_UPLOAD_WORKSITE_IMAGE_URL,
  API_SEARCH_URL,
  API_LOGOUT_URL,
  API_ADD_ORGANIZATION_URL,
  // server varibles
  LOGIN_URL,
  LOGOUT_URL,
  GET_QUESTIONS_URL,
  REVIEW_URL,
  QUICK_REVIEW_URL,
  UPLOAD_WORKSITE_IMAGE_URL,
  SEARCH_URL
};
