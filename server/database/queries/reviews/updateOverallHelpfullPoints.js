const Review = require("../../models/Review");
const User = require("../../models/User");

module.exports = ({ userId, reviewId, points }) => new Promise(async (resolve, reject) => {
  try {
    if (points === 0) {
      const review = await Review.findById(reviewId);

      // remove helped point
      await User.findOneAndUpdate(
        { _id: review.user._id },
        {
          $inc: { helpedPoints: -1 },
        },
      );

      review.overallReview.votes.forEach((vote, index) => {
        if (vote.user.toString() === userId.toString()) {
          review.overallReview.votes[index].remove();
        }
      });
      await review.save();
    } else {
      const updateResult = await Review.updateOne(
        // filter
        {
          _id: reviewId,
          // the condition for positional operator $
          "overallReview.votes.user": userId,
        },
        {
          // update the vote
          $set: {
            "overallReview.votes.$.points": points,
            "overallReview.votes.$.updatedAt": Date.now(),
          },
        },
      );

      // if no document updated that means that the user is making new vote
      // then we need to add new vote into the votes array and give the review author 1 helped point
      if (updateResult.nModified === 0) {
        await Review.updateOne(
          { _id: reviewId },
          {
            $push: {
              "overallReview.votes": {
                user: userId,
                points,
              },
            },
          },
        );

        // give review author 1 helped point
        const reviewDetails = await Review.findOne({ _id: reviewId });

        await User.findOneAndUpdate(
          { _id: reviewDetails.user._id },
          {
            $inc: { helpedPoints: 1 },
          },
        );
      }
    }
    resolve();
  } catch (error) {
    reject(error);
  }
});
