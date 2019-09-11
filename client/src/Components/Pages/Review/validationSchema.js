import * as Yup from "yup";

export const from = Yup.date()
  .typeError("Must select the work period")
  .required("Required");

export const workPeriod = Yup.object({
  from: from,
  to: from
});

export const rate = Yup.number()
  .min(1, "Must pick a rate")
  .required("Required");

export const overallReview = Yup.string();

export const hasAgreed = Yup.boolean()
  .required("Required")
  .oneOf([true], "Must Accept Terms and Conditions");

export const generalSectionSchema = {
  review: Yup.object({
    workPeriod,
    rate,
    overallReview
  }),
  hasAgreed
};

export const validationSchema = {
  agency: Yup.object({
    answers: Yup.object({
      1: Yup.string(),
      2: Yup.string().when("1", {
        is: "Yes",
        then: Yup.string()
      }),
      3: Yup.string(),
      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      // number input
      8: Yup.number()
        .nullable()
        .typeError("Must be a number")
        .positive("Must be greater than zero"),
      9: Yup.string(),
      //10 => yes 16, 17 required
      //10 => no 11 - 15
      10: Yup.string(),
      11: Yup.string().when("10", {
        is: "No",
        then: Yup.string()
      }),
      12: Yup.string().when("10", {
        is: "No",
        then: Yup.string()
      }),
      13: Yup.string().when("10", {
        is: "No",
        then: Yup.string()
      }),
      14: Yup.string().when("10", {
        is: "No",
        then: Yup.string()
      }),
      15: Yup.string().when("10", {
        is: "No",
        then: Yup.string()
      }),
      // 16, 17 if yes
      16: Yup.string().when("10", {
        is: "No",
        then: Yup.string()
      }),
      //number input
      17: Yup.number()
        .nullable()
        .typeError("Must be a number"),

      18: Yup.string(),
      19: Yup.string()
    }),
    ...generalSectionSchema
  }),
  payroll: Yup.object({
    answers: Yup.object({
      1: Yup.string(),
      2: Yup.string().when("1", {
        is: "Yes",
        then: Yup.string()
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
      11: Yup.string()
    }),
    ...generalSectionSchema
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
        then: Yup.mixed()
      }),

      17: Yup.string(),
      18: Yup.string(),
      // 17 open name of cafe
      19: Yup.string(),

      20: Yup.string()
    }),
    ...generalSectionSchema
  }),
  company: Yup.object({
    answers: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
      3: Yup.string().when("2", {
        is: "Yes",
        then: Yup.string()
      }),
      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      8: Yup.string(),
      9: Yup.string()
    }),
    ...generalSectionSchema
  })
};
