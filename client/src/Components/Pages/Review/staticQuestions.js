export const STATIC_QUESTIONS = category => [
  {
    number: 21,
    text: `When did you last use this ${category}?`,
    type: "dateRange",
    category,
  },
  {
    number: 22,
    text: "Please write a review of this agency or share a voice review below",
    type: "overallReview",
    category,
    label: "Talk about what's most important to you at work...",
    hintText:
      "How can you make your reviews helpful for workers and earn rewards?",
  },
  {
    number: 23,
    text: `How would you rate this ${category}`,
    type: "rate",
    options: ["Bad", "Poor", "Average", "Great", "Excellent"],
    category,
  },
  {
    number: 24,
    text: "Share a voice review of this agency",
    hintText: "People may be able to identify you by your voice",
    type: "voiceReview",
  },
];
