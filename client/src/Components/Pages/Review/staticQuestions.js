import React from "react";
import PopoverComponent from "../../Common/Popover";
import { Text } from "../../Common/ToolTip";
import Icon from "../../Common/Icon/Icon";
import { colors } from "../../../theme";

const decideText = category => {
  switch (category) {
    case "company":
      return `When did you last work for this ${category}?`;
    case "worksite":
      return `When did you last work on this ${category}?`;
    default:
      return `When did you last use this ${category}?`;
  }
};

export const STATIC_QUESTIONS = category => [
  {
    number: 21,
    text: decideText(category),
    type: "dateRange",
    category,
  },
  {
    number: 22,
    text: `Please write a review of this ${category ||
      "organisation"} or share a voice review below`,
    type: "overallReview",
    category,
    label: "What was good? What was bad?",
    hintText: (
      <PopoverComponent
        popoverOptions={{
          text: (
            <>
              <p style={{ fontWeight: "bold" }}>
                Workers give you points if they find your reviews helpful.
                Here’s how to do that:
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>
                  Write for other workers.
                </span>{" "}
                Mention things you would care about if you were looking for a
                new job. More detail = more helpful.
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Try to be balanced. </span>
                Even if you loved working on a job, there was probably some room
                for improvement somewhere and this is useful for others to know.
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Be authentic. </span>
                Communicate your true self and opinions. If your reviews speak
                about specific situations that are interesting and relevant,
                then you’re bound to help more people.
              </p>
            </>
          ),
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative", top: "1.5px" }}>
            <Icon
              icon="info"
              width="23"
              height="23"
              margin="0 0.5rem 0 0"
              color={colors.primary}
            />
          </div>
          <Text>
            How can you make your reviews helpful for workers and earn rewards?
          </Text>
        </div>
      </PopoverComponent>
    ),
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
    text: `Share a voice review of this ${category || "organisation"}`,
    hintText: "People may be able to identify you by your voice",
    type: "voiceReview",
  },
];
