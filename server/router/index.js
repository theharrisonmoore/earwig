const router = require("express").Router();
const {
  getByOrg,
  postReview,
  addNewAgencyPayroll,
  getOrgsByType,
  getAgencesAndPayrollsNames,
  postReviewShort,
  getSingleReviewAnswers,
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
const updateOverallHelpfulPoints = require("../controllers/updateOverallHelpfulPoints");


const {
  LOGIN_URL,
  GET_QUESTIONS_URL,
  REVIEW_URL,
  UPLOAD_WORKSITE_IMAGE_URL,
  SEARCH_URL,
  LOGOUT_URL,
  ADD_ORGANIZATION_URL,
  REPORT_CONTENT_URL,
  ADD_COMMENT_ON_QUESTION_URL,
  GET_OVERALL_REVIEW_REPLIES_URL,
  ADD_COMMENT_ON_REVIEW_URL,
  ADMIN,
  CONFIRM_EMAIL,
  EDIT_PROFILE,
  SIGN_UP,
  UPLOAD_VERIFICATION_IMAGE_URL,
  TRADE_URL,
  USERS,
  ADD_HELPFUL_OVERALL_POINTS,
} = require("../../client/src/apiUrls");

router.get(SEARCH_URL, searchController);

// get user info from the cookies and send it to fron-end
router.get(USERS, authentication, userInfoController);

router.get(GET_QUESTIONS_URL, authentication, authorization("LEVEL3"), getByOrg);
router.post(REVIEW_URL, authentication, authorization("LEVEL3"), postReview);
router.post("/short-review", authentication, authorization("LEVEL3"), postReviewShort);

// Add new payroll and agency
router.get("/organizations", authentication, authorization("LEVEL3"), getOrgsByType);
router.post("/organizations", authentication, authorization("LEVEL3"), addNewAgencyPayroll);
router.get("/agency-payroll", authentication, authorization("LEVEL3"), getAgencesAndPayrollsNames);

// require all the routes in this file
router.post("/profile", softAuthCheck, profileController);

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

// get all trades
router.get(TRADE_URL, authentication, authorization("LEVEL1"), getTradesController);

// add new trade
router.post(
  TRADE_URL,
  authentication,
  authorization("LEVEL1"),
  validation("addTrade"),
  postTradesController,
);

// sign up
router.post(SIGN_UP, validation("signup"), signupController);

// edit profile route
// user can update password or/and the verification image
router.post(
  EDIT_PROFILE,
  authentication,
  authorization("LEVEL3"),
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
  authorization("LEVEL3"),
  validation("addCommentOnReview"),
  addCommentOnReview,
);

// get all replies on specific overall review
router.get(
  `${GET_OVERALL_REVIEW_REPLIES_URL}/:id`,
  authentication,
  authorization("LEVEL1"),
  getOverallReviewReplies,
);

// admin handler
router.use(ADMIN, authentication, authorization("ADMIN"), adminRouter);

router.post("/thinking-of-deleting", authentication, thinkingofDeletingController);

router.post("/give-feedback", authentication, feedbackController);

router.post("/update-last-viewed", updateLastViewedOrg);


router.patch(ADD_HELPFUL_OVERALL_POINTS, authentication, updateOverallHelpfulPoints);

module.exports = router;
