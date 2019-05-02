import * as Yup from "yup";

export const validationSchema = {
  agency: Yup.object({
    questions: Yup.object({
      1: Yup.string(),
      2: Yup.string().when("1", {
        is: "yes",
        then: Yup.string()
      }),
      3: Yup.string(),
      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      // number input
      8: Yup.number().nullable().typeError("Must be a number"),
      9: Yup.string(),
      //9 => yes 15, 16 required
      // 9 => no 10 - 14
      10: Yup.string().when("9", {
        is: "no",
        then: Yup.string()
      }),
      11: Yup.string().when("9", {
        is: "no",
        then: Yup.string()
      }),
      12: Yup.string().when("9", {
        is: "no",
        then: Yup.string()
      }),
      13: Yup.string().when("9", {
        is: "no",
        then: Yup.string()
      }),
      14: Yup.string().when("9", {
        is: "no",
        then: Yup.string()
      }),

      // 15, 16 if yes
      15: Yup.string().when("9", {
        is: "yes",
        then: Yup.string()
      }),
      //number input
      16: Yup.number().nullable().typeError("Must be a number"),

      17: Yup.string(),
      18: Yup.string()
    }),
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.string().required("Required"),
      overallReview: Yup.string(),
      voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  payroll: Yup.object({
    questions: Yup.object({
      1: Yup.string(),
      2: Yup.string().when("1", {
        is: "yes",
        then: Yup.string()
      }),

      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      8: Yup.string(),
      // number
      9: Yup.number().nullable()
        .typeError("Must be a number")
        ,

      10: Yup.string(),
      11: Yup.string(),
      12: Yup.string()
    }),
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.string().required("Required"),
      overallReview: Yup.string(),
      voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  worksite: Yup.object({
    questions: Yup.object({
      1: Yup.string(),
      2: Yup.string(),
      // number
      3: Yup.number().nullable().when("2", {
        is: "yes",
        then: Yup.number().nullable()
          .typeError("Must be a number")
          
      }),

      4: Yup.string(),
      5: Yup.string(),
      6: Yup.string(),
      7: Yup.string(),
      8: Yup.string(),
      9: Yup.string(),
      10: Yup.string(),
      11: Yup.string(),
      12: Yup.string(),
      13: Yup.string().when("12", {
        is: "yes",
        then: Yup.string()
      }),
      // 14 checklist question
      14: Yup.mixed().when("12", {
        is: "yes",
        then: Yup.mixed()
      }),

      15: Yup.string(),
      16: Yup.string(),
      // 17 open name of cafe
      17: Yup.string(),

      18: Yup.string()
    }),
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.number().required("Required"),
      overallReview: Yup.string(),
      voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
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
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.number().required("Required"),
      overallReview: Yup.string(),
      voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  })
};

/* ============================================================== */

export const validationSchemaShort = {
  agency: Yup.object({
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.number().required("Required"),
      overallReview: Yup.string()
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  payroll: Yup.object({
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.number().required("Required"),
      overallReview: Yup.string()
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  worksite: Yup.object({
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.number().required("Required"),
      overallReview: Yup.string()
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  company: Yup.object({
    review: Yup.object({
      workPeriod: Yup.object({
        from: Yup.date()
          .typeError("Must select the work period")
          .required("Required"),
        to: Yup.date()
          .typeError("Must select the work period")
          .required("Required")
      }),
      rate: Yup.number().required("Required"),
      overallReview: Yup.string()
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  })
};
