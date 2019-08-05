const router = require("express").Router();
const {
  getByOrg,
  postReview,
  getOrgsByType,
  getAgencesAndPayrollsNames,
  postReviewShort,
  updateReview,
} = require("../controllers/review");

const adminRouter = require("./admin");
const upload = require("../middlewares/uploadFileToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");
const uploadVerificationImage = require("./../controllers/uploadVerificationImage");
const getTradesController = require("../controllers/getTrades");
const deleteFileFromServer = require("../middlewares/deleteFileFromServer");
const validation = require("./../middlewares/validation");
const loginController = require("./../controllers/login");
const signupController = require("./../controllers/signup");
const editProfile = require("./../controllers/editProfile");
const postTradesController = require("../controllers/addTrade");
const userInfoController = require("../controllers/userInfo");
const confirmJoiningEmailList = require("../controllers/confirmJoiningEmailList");
const deleteUserProfile = require("../controllers/deleteUserProfile");

const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");
const softAuthCheck = require("./../middlewares/softAuthCheck");

const uploadWorksiteController = require("../controllers/uploadWorksiteImage");
const searchController = require("../controllers/search");
const profileController = require("./../controllers/profile");
const commentsController = require("./../controllers/comments");
const logoutController = require("./../controllers/logout");
const getWorksiteImgsController = require("./../controllers/getWorksiteImgs");
const reportContentController = require("./../controllers/reportContent");

const addOrganizationController = require("../controllers/organizations");

const thinkingofDeletingController = require("../controllers/thinkingOfDeleting");
const addCommentOnQuestion = require("../controllers/addCommentOnQuestion");
const feedbackController = require("../controllers/feedback");

const userReviewsController = require("../controllers/getUserReviews");
const getOverallReviewReplies = require("../controllers/getOverallReviewReplies");
const addCommentOnReview = require("../controllers/addCommentOnReview");

const updateLastViewedOrg = require("../controllers/updateLastViewedOrg");

const deleteOrgController = require("../controllers/deleteOrganization");
const resetPassword = require("../controllers/resetPassword");
const setPassword = require("../controllers/setPassword");
const updateHelpfulPoints = require("../controllers/updateHelpfulPoints");
const userReviews = require("../controllers/userReviews");
const deleteReview = require("../controllers/admin/deleteReview");
const checkIfEditReview = require("../controllers/checkIfCanEdit");

const getUsersTrade = require("../controllers/getUsersTrade");

const setCurrentOrgs = require("../controllers/setCurrentOrgs");
const getCurrentOrgs = require("../controllers/getCurrentOrgs");

const uploadVoiceRecording = require("../controllers/uploadVoiceRecording");
const voiceReview = require("../controllers/getVoiceReview");
const getUserVotesOnProfile = require("./../controllers/getUserVotesOnProfile");

const {
  LOGIN_URL,
  REVIEW_URL,
  UPLOAD_WORKSITE_IMAGE_URL,
  SEARCH_URL,
  LOGOUT_URL,
  ADD_ORGANIZATION_URL,
  REPORT_CONTENT_URL,
  ADD_COMMENT_ON_QUESTION_URL,
  ADD_COMMENT_ON_REVIEW_URL,
  ADMIN,
  CONFIRM_EMAIL,
  EDIT_PROFILE,
  SIGN_UP,
  UPLOAD_VERIFICATION_IMAGE_URL,
  TRADE_URL,
  USERS,
  RESET_PASSWORD,
  SET_PASSWORD,
  ADD_HELPFUL_OVERALL_POINTS,
  USERS_TRADE,
  SET_ORGS,
  GET_USER_ORGS,
  UPLOAD_AUDIO,
  GET_AUDIO_URL,
  GET_USER_VOTES_ON_PROFILE,
} = require("../../client/src/apiUrls");

router.get(SEARCH_URL, searchController);

// get user reviews
router.get("/reviews", authentication, userReviews);
// delete a review
router.delete("/reviews", authentication, deleteReview);

// get user info from the cookies and send it to fron-end
router.get(USERS, authentication, userInfoController);

router.get("/review/:id/is-edatable", authentication, authorization("LEVEL3"), checkIfEditReview);

router.get("/questions/:id", authentication, authorization("LEVEL2"), getByOrg);
router.post(REVIEW_URL, authentication, authorization("LEVEL2"), postReview);
router.put("/review/:id", authentication, authorization("LEVEL3"), updateReview);
router.post("/short-review", authentication, authorization("LEVEL3"), postReviewShort);

// Add new payroll and agency
router.get("/organizations", authentication, authorization("LEVEL3"), getOrgsByType);
router.post("/organizations", authentication, authorization("LEVEL2"), addOrganizationController);
router.get("/agency-payroll", authentication, authorization("LEVEL3"), getAgencesAndPayrollsNames);

// require all the routes in this file
router.get("/profile/:organizationID", softAuthCheck, profileController);

router.post("/comments", commentsController);

// login route
router.post(LOGIN_URL, validation("login"), loginController);

router.use(LOGOUT_URL, logoutController);

// get worksite images route

router.post("/wroksite-images", authentication, authorization("LEVEL3"), getWorksiteImgsController);

// update user info (verification image, city and trade)
router.post(
  UPLOAD_VERIFICATION_IMAGE_URL,
  authentication,
  authorization("LEVEL1"),
  upload("verificationImage"),
  validation("uploadVerificationImage"),
  toGoogle(true),
  deleteFileFromServer,
  uploadVerificationImage,
);

router.post(
  UPLOAD_WORKSITE_IMAGE_URL,
  upload("worksiteImage"),
  toGoogle(),
  deleteFileFromServer,
  uploadWorksiteController,
);

router.post(
  UPLOAD_AUDIO,
  upload("voiceRecording"),
  // required = true , isVoice = true
  toGoogle(true, true),
  deleteFileFromServer,
  uploadVoiceRecording,
);

router.post(GET_AUDIO_URL, softAuthCheck, voiceReview);

// get all trades
router.get(TRADE_URL, getTradesController);

// add new trade
router.post(TRADE_URL, validation("addTrade"), postTradesController);

// sign up
router.post(
  SIGN_UP,
  upload("verificationImage"),
  validation("signup"),
  toGoogle(false),
  signupController,
  deleteFileFromServer,
);

// edit profile route
// user can update password or/and the verification image
router.post(
  EDIT_PROFILE,
  authentication,
  authorization("LEVEL1"),
  upload("verificationImage"),
  validation("editProfile"),
  toGoogle(false),
  deleteFileFromServer,
  editProfile,
);

router.delete("/delete-user", authentication, deleteUserProfile);

router.get("/user-reviews", authentication, userReviewsController);

router.post(
  ADD_ORGANIZATION_URL,
  authentication,
  authorization("LEVEL2"),
  validation("addOrganization"),
  addOrganizationController,
);

router.delete("/delete-organization/:id", authentication, deleteOrgController);

// confirm adding the user mail to the mail list
router.use(CONFIRM_EMAIL, validation("onlyMongoId"), confirmJoiningEmailList);

// report for a piece of content
// can be (overall review, comment, worksite image, reply)
// depends on target param
router.post(
  REPORT_CONTENT_URL,
  validation("reportContent"),
  authentication,
  authorization("LEVEL1"),
  reportContentController,
);

// add reply on an organization's question
router.post(
  ADD_COMMENT_ON_QUESTION_URL,
  authentication,
  authorization("LEVEL3"),
  validation("addCommentOnQuestion"),
  addCommentOnQuestion,
);

// add comment on review includes
// can be (overall or voice -for sprint 2 -) depends on "target" param
router.post(
  ADD_COMMENT_ON_REVIEW_URL,
  authentication,
  authorization("LEVEL2"),
  validation("addCommentOnReview"),
  addCommentOnReview,
);

// get all replies on specific overall review
// /reviews/${target}/replies/${id}
router.get(
  "/reviews/:target/replies/:id",
  softAuthCheck,
  getOverallReviewReplies,
);

// admin handler
router.use(ADMIN, authentication, authorization("ADMIN"), adminRouter);

router.post("/thinking-of-deleting", authentication, thinkingofDeletingController);

router.post("/give-feedback", authentication, feedbackController);

router.post("/update-last-viewed", updateLastViewedOrg);

router.post(RESET_PASSWORD, resetPassword);
router.post(SET_PASSWORD, setPassword);

router.patch(ADD_HELPFUL_OVERALL_POINTS, authentication, updateHelpfulPoints);

router.get(USERS_TRADE, authentication, getUsersTrade);

router.post(SET_ORGS, authentication, setCurrentOrgs);

router.get(GET_USER_ORGS, authentication, getCurrentOrgs);

router.get(GET_USER_VOTES_ON_PROFILE, authentication, getUserVotesOnProfile);

module.exports = router;
