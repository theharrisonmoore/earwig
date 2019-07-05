export const STATIC_QUESTIONS = category => [
  {
    number: 21,
    text: `Select the month(s) you used this ${category}?`,
    type: "dateRange",
    category: category
  },
  {
    number: 22,
    text: "If you’d like to write an overall review, go ahead here",
    type: "overallReview",
    category: category,
    hintText:
      "To help other workers, please try to explain why something was or wasn't good."
  },
  {
    number: 23,
    text: `How would you rate this ${category}`,
    type: "rate",
    options: ["Bad", "Poor", "Average", "Great", "Excellent"],
    category: category
  },
  {
    number: 24,
    text: "Share a voice review",
    hintText:
      "30 seconds max. Bear in mind that people may be able to identify you from your voice.",
    type: "voiceReview"
  }
];
