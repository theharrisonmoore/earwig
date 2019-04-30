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
} = require("../../client/src/apiUrls");


router.get(SEARCH_URL, searchController);
router.get("/user", authentication, userInfoController);

router.get(GET_QUESTIONS_URL, authentication, authorization("LEVEL3"), getByOrg);
router.post(REVIEW_URL, authentication, authorization("LEVEL3"), postReview);
router.post("/short-review", authentication, authorization("LEVEL3"), postReviewShort);

// Add new payroll and agency
router.get("/organizations", authentication, authorization("LEVEL3"), getOrgsByType);
router.post("/organizations", authentication, authorization("LEVEL3"), addNewAgencyPayroll);
router.get("/agency-payroll", authentication, authorization("LEVEL3"), getAgencesAndPayrollsNames);

// require all the routes in this file
router.post(LOGIN_URL, validation("login"), loginController);

// require all the routes in this file
router.post("/profile", softAuthCheck, profileController);

router.post("/comments", commentsController);

router.post(LOGIN_URL, validation("login"), loginController);

router.use(LOGOUT_URL, logoutController);

// get worksite images route

router.post("/wroksite-images", authentication, authorization("LEVEL3"), getWorksiteImgsController);

router.post(
  "/upload-verification-image",
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

router.get("/trades", authentication, authorization("LEVEL1"), getTradesController);

router.post(
  "/trades",
  authentication,
  authorization("LEVEL1"),
  validation("addTrade"),
  postTradesController,
);

router.post("/signup", validation("signup"), signupController);

router.post(
  "/edit-profile",
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
  "/add-organization",
  // authentication,
  // authorization("LEVEL3"),
  // validation("addOrganization"),
  addOrganizationController,
);

router.use("/confirm-email", validation("onlyMongoId"), confirmJoiningEmailList);

router.post(
  REPORT_CONTENT_URL,
  validation("reportContent"),
  authentication,
  authorization("LEVEL1"),
  reportContentController,
);


router.post(
  ADD_COMMENT_ON_QUESTION_URL,
  authentication,
  // validation("onlyMongoId"),
  addCommentOnQuestion,
);

router.post(
  ADD_COMMENT_ON_REVIEW_URL,
  authentication,
  // validation("onlyMongoId"),
  addCommentOnReview,
);


router.get(
  `${GET_OVERALL_REVIEW_REPLIES_URL}/:id`,
  authentication,
  // validation("onlyMongoId"),
  getOverallReviewReplies,
);

router.use("/admin", authentication, authorization("ADMIN"), adminRouter);

router.post("/thinking-of-deleting", authentication, thinkingofDeletingController);

router.post("/give-feedback", authentication, feedbackController);

module.exports = router;
