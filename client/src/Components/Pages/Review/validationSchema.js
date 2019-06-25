import * as Yup from "yup";

const generalSectionSchema = {
  review: Yup.object({
    workPeriod: Yup.object({
      from: Yup.date()
        .typeError("Must select the work period")
        .required("Required"),
      to: Yup.date()
        .typeError("Must select the work period")
        .required("Required")
    }),
    rate: Yup.number()
      .min(1, "Must pick a rate")
      .required("Required"),
    overallReview: Yup.string()
    // voiceReview: Yup.mixed()
  }),
  hasAgreed: Yup.boolean()
    .required("Required")
    .oneOf([true], "Must Accept Terms and Conditions")
};

export const validationSchema = {
  agency: Yup.object({
    questions: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
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
      //9 => yes 15, 16 required
      // 9 => no 10 - 14
      10: Yup.string(),
      11: Yup.string(),
      12: Yup.string(),
      13: Yup.string(),
      14: Yup.string(),

      15: Yup.string(),
      // 16, 17 if yes
      16: Yup.string(),
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
    questions: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
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
    questions: Yup.object({
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
      16: Yup.mixed(),

      17: Yup.string(),
      18: Yup.string(),
      // 17 open name of cafe
      19: Yup.string(),

      20: Yup.string()
    }),
    ...generalSectionSchema
  }),
  company: Yup.object({
    questions: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
      3: Yup.string(),
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

/* ============================================================== */

const quickReview = {
  general: Yup.object({ ...generalSectionSchema })
};

export const validationSchemaShort = {
  agency: quickReview.general,
  payroll: quickReview.general,
  worksite: quickReview.general,
  company: quickReview.general
};
