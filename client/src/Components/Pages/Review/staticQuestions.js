export const STATIC_QUESTIONS = category => [
  {
    number: 18,
    text: `Select the month(s) you used this ${category}?`,
    type: "dateRange"
  },
  {
    number: 20,
    text: "If you’d like to write an overall review, go ahead here",
    type: "overallReview",
    hintText:
      "To help other workers, please try to explain why something was or wasn't good."
  },
  {
    number: 21,
    text: "Share a voice review",
    hintText:
      "30 seconds max. Bear in mind that people may be able to identify you from your voice.",
    type: "voiceReview"
  }
];
