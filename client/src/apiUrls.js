const API_PREFIX = "/api";

const LOGIN_URL = "/login"; // to use on the server
export const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

const GET_QUESTIONS_URL = "/questions";
export const API_GET_QUESTIONS_URL = `${API_PREFIX}${GET_QUESTIONS_URL}`;

const REVIEW_URL = "/review";
export const API_POST_REVIEW_URL = `${API_PREFIX}${REVIEW_URL}`;

const UPLOAD_WORKSITE_IMAGE_URL = "/worksite-image";
export const API_UPLOAD_WORKSITE_IMAGE_URL = `${API_PREFIX}${UPLOAD_WORKSITE_IMAGE_URL}`;

const THANKYOU_URL = "/thank-you";
export const API_THANKYOU_URL = `${API_PREFIX}${THANKYOU_URL}`;

module.exports = {
  LOGIN_URL,
  GET_QUESTIONS_URL,
  REVIEW_URL,
  UPLOAD_WORKSITE_IMAGE_URL
};
