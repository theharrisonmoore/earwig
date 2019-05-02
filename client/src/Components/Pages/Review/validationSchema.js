import * as Yup from "yup";

export const validationSchema = {
  agency: Yup.object({
    questions: Yup.object({
      1: Yup.string().required("Required"),
      2: Yup.string().when("1", {
        is: "Yes",
        then: Yup.string().required("Required")
      }),
      3: Yup.string().required("Required"),
      4: Yup.string().required("Required"),
      5: Yup.string().required("Required"),
      6: Yup.string().required("Required"),
      7: Yup.string().required("Required"),
      // number input
      // 8: Yup.number()
      //   .typeError("Must be a number")
      //   .positive("Must be greater than zero")
      //   .required("Required"),

      9: Yup.string().required("Required"),
      //9 => yes 15, 16 required
      // 9 => no 10 - 14
      10: Yup.string().when("9", {
        is: "No",
        then: Yup.string().required("Required")
      }),
      11: Yup.string().when("9", {
        is: "No",
        then: Yup.string().required("Required")
      }),
      12: Yup.string().when("9", {
        is: "No",
        then: Yup.string().required("Required")
      }),
      13: Yup.string().when("9", {
        is: "No",
        then: Yup.string().required("Required")
      }),
      14: Yup.string().when("9", {
        is: "No",
        then: Yup.string().required("Required")
      }),

      // 15, 16 if yes
      15: Yup.string().when("9", {
        is: "Yes",
        then: Yup.string().required("Required")
      }),
      //number input
      // 16: Yup.number().when("9", {
      //   is: "Yes",
      //   then: Yup.number()
      //     .typeError("Must be a number")
      //     .min(0, "Must be positive")
      //     .required("Required")
      // }),

      17: Yup.string().required("Required"),
      18: Yup.string().required("Required")
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
      overallReview: Yup.string().required("Required"),
      voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  payroll: Yup.object({
    questions: Yup.object({
      1: Yup.string().required("Required"),
      2: Yup.string().when("1", {
        is: "Yes",
        then: Yup.string().required("Required")
      }),

      4: Yup.string().required("Required"),
      5: Yup.string().required("Required"),
      6: Yup.string().required("Required"),
      7: Yup.string().required("Required"),
      8: Yup.string().required("Required"),
      // number
      // 9: Yup.number()
      //   .typeError("Must be a number")
      //   .positive("Must be greater than zero")
      //   .required("Required"),

      10: Yup.string().required("Required"),
      11: Yup.string().required("Required"),
      12: Yup.string().required("Required")
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
      overallReview: Yup.string().required("Required"),
      voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  worksite: Yup.object({
    questions: Yup.object({
      1: Yup.string().required("Required"),
      2: Yup.string().required("Required"),
      // number
      // 3: Yup.number().when("2", {
      //   is: "Yes",
      //   then: Yup.number()
      //     .typeError("Must be a number")
      //     .min(0, "Must be positive")
      //     .required("Required"),
      // }),

      4: Yup.string().required("Required"),
      5: Yup.string().required("Required"),
      6: Yup.string().required("Required"),
      7: Yup.string().required("Required"),
      8: Yup.string(),
      9: Yup.string().required("Required"),
      10: Yup.string().required("Required"),
      11: Yup.string().required("Required"),
      12: Yup.string().required("Required"),
      13: Yup.string().when("12", {
        is: "Yes",
        then: Yup.string().required("Required")
      }),
      // 14 checklist question
      14: Yup.mixed().when("12", {
        is: "Yes",
        then: Yup.mixed().required("Required")
      }),

      15: Yup.string().required("Required"),
      16: Yup.string().required("Required"),
      // 17 open name of cafe
      17: Yup.string().required("Required"),

      18: Yup.string().required("Required")
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
      // rate: Yup.number()
      //   .positive("Must be greater than zero")
      //   .required("Required"),
      overallReview: Yup.string().required("Required"),
      voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  company: Yup.object({
    questions: Yup.object({
      1: Yup.string().required("Required"),
      2: Yup.string().required("Required"),
      3: Yup.string().required("Required"),
      4: Yup.string().required("Required"),
      5: Yup.string().required("Required"),
      6: Yup.string().required("Required"),
      7: Yup.string().required("Required"),
      8: Yup.string().required("Required"),
      9: Yup.string().required("Required")
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
      // rate: Yup.number()
      //   .positive("Must be greater than zero")
      //   .required("Required"),
      overallReview: Yup.string().required("Required"),
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
      // rate: Yup.number()
      //   .positive("must be greater than zero")
      //   .required("Required"),
      overallReview: Yup.string().required("Required")
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
      // rate: Yup.number()
      //   .positive("Must be greater than zero")
      //   .required("Required"),
      overallReview: Yup.string().required("Required")
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
      // rate: Yup.number()
      //   .positive("Must be greater than zero")
      //   .required("Required"),
      overallReview: Yup.string().required("Required")
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
      // rate: Yup.number()
      //   .positive("Must be greater than zero")
      //   .required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  })
};
