const Review = require("../../models/Review");

module.exports = ({ userId, reviewId, points }) => new Promise(async (resolve, reject) => {
  try {
    if (points === 0) {
      const review = await Review.findById(reviewId);

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
      // then we need to add new vote into the votes array
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
      }
    }
    resolve();
  } catch (error) {
    reject(error);
  }
});
