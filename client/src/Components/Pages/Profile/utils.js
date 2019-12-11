import moment from "moment";

export const getContractorsFromReviews = reviewDetails => {
  const [worksiteQuestionsGroup] = reviewDetails.filter(
    group => group._id === "Working on the site"
  );
  const [
    contractorQuestion,
  ] = worksiteQuestionsGroup.questions.filter(question =>
    question.text.includes("main contractor")
  );
  // question => question.text === "Who is the main contractor on site?"
  const orderedAnswers = contractorQuestion.answers.sort(
    (a, b) => moment(a.updatedAt).valueOf() - moment(b.updatedAt).valueOf()
  );
  return orderedAnswers.map(item => item.answer);
};

export const reviewsByMonth = FilteredReviewMonths => {
  const reviewMonths = FilteredReviewMonths.map(review => {
    return moment(review.createdAt).format("MMM");
  });

  const reviewMonthsCount = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  if (FilteredReviewMonths.length === 0) return reviewMonthsCount;

  reviewMonths.forEach(month => {
    reviewMonthsCount[month] += 1;
  });

  return reviewMonthsCount;
};

// calculate the car parking cost
export const getCarCost = (reviewDetails = []) => {
  // get the car parking cost question
  const carSection = reviewDetails
    .filter(section => section._id === null)
    .map(item =>
      item.questions.filter(
        question => question.text === "How much did car parking cost per day?"
      )
    );

  if (
    !carSection ||
    carSection.length < 1 ||
    carSection[0][0].answers.length < 1
  )
    return "N/A";

  // work out the average cost from the answers
  const costsArr = carSection[0][0].answers.map(answer => answer.answer);

  const average =
    costsArr.reduce((accum, curr) => {
      return accum + curr;
    }, 0) / costsArr.length;

  if (average > 0) {
    if (Number.isInteger(average)) {
      return average;
    }
    return average.toFixed(2);
  }
  return "Free";
};

export const getVerifiedUsers = usersArray => {
  return usersArray.filter(user => user.verified).map(({ _id }) => _id);
};

export const getVerifiedRepliesCount = (replies, verifiedUsers) => {
  if (!replies || replies.length === 0) {
    return 0;
  }
  const verifiedReplies = replies.filter(({ user }) =>
    verifiedUsers.includes(user)
  );
  return verifiedReplies.length;
};
