import * as Yup from "yup";

export const from = Yup.date()
  .typeError("Must select the work period")
  .required("Required");

export const workPeriod = Yup.object({
  from,
  to: from,
});

export const rate = Yup.number()
  .min(1, "Must select a rating")
  .required("Required");

export const overallReview = Yup.string();

export const hasAgreed = Yup.boolean()
  .required("Required")
  .oneOf([true], "Must accept Terms and Conditions");

export const generalSectionSchema = {
  review: Yup.object({
    workPeriod,
    rate,
    overallReview,
  }),
  hasAgreed,
};

export const validationSchema = {
  agency: Yup.object({
    answers: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
      // 2: Yup.string().when("1", {
      //   is: "Yes",
      //   then: Yup.string(),
      // }),
      3: Yup.string(),
      4: Yup.string(),
      5: Yup.number()
        .nullable()
        .typeError("Must be a number")
        .positive("Must be greater than zero"),
      6: Yup.string(),
      // no branch
      7: Yup.string().when("6", {
        is: "No",
        then: Yup.string(),
      }),
      8: Yup.string().when("6", {
        is: "No",
        then: Yup.string(),
      }),
      // yes branch
      9: Yup.string().when("6", {
        is: "Yes",
        then: Yup.string(),
      }),
      10: Yup.string().when("6", {
        is: "Yes",
        then: Yup.number()
          .nullable()
          .typeError("Must be a number")
          .positive("Must be greater than zero"),
      }),
      // rest
      11: Yup.string(),
      12: Yup.string(),
      13: Yup.string(),
      14: Yup.string(),
      15: Yup.string(),
    }),
    ...generalSectionSchema,
  }),
  payroll: Yup.object({
    answers: Yup.object({
      1: Yup.string(),
      2: Yup.string().when("1", {
        is: "Yes",
        then: Yup.string(),
      }),
      3: Yup.string(),
      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      // number
      8: Yup.number()
        .nullable()
        .typeError("Must be a number"),
      9: Yup.string(),
      10: Yup.string(),
      11: Yup.string(),
    }),
    ...generalSectionSchema,
  }),
  worksite: Yup.object({
    answers: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
      // number
      3: Yup.number()
        .nullable()
        .typeError("Must be a number"),

      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      8: Yup.string(),
      9: Yup.string(),
      10: Yup.string(),
      11: Yup.string(),
      12: Yup.string(),
      13: Yup.string(),
      14: Yup.string(),
      15: Yup.string(),
      // 16 checklist question
      16: Yup.mixed().when("1", {
        is: "Yes",
        then: Yup.mixed(),
      }),

      17: Yup.string(),
      18: Yup.string(),
      // 17 open name of cafe
      19: Yup.string(),

      20: Yup.string(),
    }),
    ...generalSectionSchema,
  }),
  company: Yup.object({
    answers: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
      3: Yup.string().when("2", {
        is: "Yes",
        then: Yup.string(),
      }),
      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      8: Yup.string(),
      9: Yup.string(),
    }),
    ...generalSectionSchema,
  }),
};
