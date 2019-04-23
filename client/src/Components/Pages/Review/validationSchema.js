import * as Yup from "yup";

export const validationSchema = {
  agency: Yup.object({
    questions: Yup.object({
      1: Yup.string().required("Required"),
      2: Yup.string().required("Required"),
      3: Yup.string().required("Required"),
      4: Yup.string().required("Required"),
      5: Yup.string().required("Required"),
      6: Yup.string().required("Required"),
      7: Yup.string().required("Required"),
      // 8: Yup.string().required("Required"),

      // number input
      8: Yup.number()
        .typeError("Must be a number")
        .required("Required"),

      9: Yup.string().required("Required"),
      10: Yup.string().required("Required"),
      11: Yup.string().required("Required"),
      12: Yup.string().required("Required"),
      13: Yup.string().required("Required"),
      14: Yup.string().required("Required"),
      15: Yup.string().required("Required"),
      16: Yup.string().required("Required"),
      //number input
      17: Yup.number()
        .typeError("Must be a number")
        .required("Required"),

      18: Yup.string().required("Required"),
      19: Yup.string().required("Required")
    }),
    // checklist: Yup.array().of(Yup.string()),
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      // rate: Yup.string().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  payroll: Yup.object({
    questions: Yup.object({
      1: Yup.string().required("Required"),
      2: Yup.string().required("Required"),
      // 3: Yup.string().required("Required"),
      // number
      3: Yup.number()
        .typeError("Must be a number")
        .required("Required"),

      4: Yup.string().required("Required"),
      5: Yup.string().required("Required"),
      6: Yup.string().required("Required"),
      7: Yup.string().required("Required"),
      8: Yup.string().required("Required"),
      9: Yup.string().required("Required"),
      // number
      10: Yup.number()
        .typeError("Must be a number")
        .required("Required"),

      11: Yup.string().required("Required"),
      12: Yup.string().required("Required"),
      13: Yup.string().required("Required")
    }),
    // checklist: Yup.array().of(Yup.string()),
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      // rate: Yup.string().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  worksite: Yup.object({
    questions: Yup.object({
      1: Yup.string().required("Required"),
      2: Yup.string().required("Required"),
      3: Yup.string().required("Required"),
      // number
      4: Yup.number()
        .typeError("Must be a number")
        .required("Required"),

      5: Yup.string().required("Required"),
      6: Yup.string().required("Required"),
      7: Yup.string().required("Required"),
      8: Yup.string().required("Required"),
      9: Yup.string().required("Required"),
      10: Yup.string().required("Required"),
      11: Yup.string().required("Required"),
      12: Yup.string().required("Required"),
      13: Yup.string().required("Required"),
      // 14 has his own value (checklist)
      15: Yup.string().required("Required"),
      16: Yup.string().required("Required"),
      17: Yup.string().required("Required"),
      18: Yup.string().required("Required")
    }),
    // checklist: Yup.array().required(),
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      // rate: Yup.string().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
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
      // name of the rep
      // 7: Yup.string().required("Required"),

      7: Yup.string().required("Required"),
      8: Yup.string().required("Required"),
      9: Yup.string().required("Required")
    }),
    // checklist: Yup.array().of(Yup.string()),
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      rate: Yup.number().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  })
};

export const validationSchemaShort = {
  agency: Yup.object({
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      rate: Yup.string().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  payroll: Yup.object({
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      rate: Yup.string().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  worksite: Yup.object({
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      rate: Yup.string().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  company: Yup.object({
    review: Yup.object({
      // workPeriod: Yup.string().required("Required"),
      // rate: Yup.string().required("Required"),
      overallReview: Yup.string().required("Required")
      // voiceReview: Yup.mixed()
    }),
    hasAgreed: Yup.boolean()
      .required("Required")
      .oneOf([true], "Must Accept Terms and Conditions")
  })
};
