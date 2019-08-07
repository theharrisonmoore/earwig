const Question = require("../models/Question");

const { getOrgsNamesByType } = require("../queries/review");

/**
 * questions types:
 * 1.open: accept any string
 * 2.yesno: yes or no
 * 3.radio: one of many choices
 * 4.number: accpet only number as an answer (hourlyrate)
 * 5.checklist: to choose more than one option
 * 6.image: for questions the require uploading images
 */

// const organization = {
//   types: {
//     1: "yesno",
//     2: "dropdown",
//     3: "open",
//     4: "number",
//     5: "image",
//     6: "checklist",
//   },
//   category: {
//     1: "agency",
//     2: "payroll",
//     3: "worksite",
//     4: "company",
//   },
// };

module.exports = async () => {
  let agencyNames;
  let payrollsNames;
  try {
    const agencies = await getOrgsNamesByType("agency");
    const payrolls = await getOrgsNamesByType("payroll");

    agencyNames = agencies[0].category;
    agencyNames = agencyNames.map(name => name.name);

    payrollsNames = payrolls[0].category;
    payrollsNames = payrollsNames.map(name => name.name);
  } catch (err) {
    console.log("database query error", err);
  }

  const questions = [
    {
      number: 1,
      next: {
        yes: 2,
        no: 3,
      },
      type: "yesno",
      text: "Did they send you written confirmation of the terms and conditions of employment?",
      hintText:
        "i.e., details of pay, overtime, mileage/travel allowance, lodging provision, holiday entitlement, disciplinary procedures, benefits, etc.",
      isJumping: true,
      jumpTo: [{ value: "Yes", nextQuestion: 2 }, { value: "No", nextQuestion: 3 }],
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Sends you written confirmation of terms and conditions of employment",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 9,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },
    {
      number: 2,
      next: 3,
      isDependent: true,
      type: "yesno",
      text: "Did they send you this information before your work began?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Sends you terms and conditions before your work begins",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 10,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },
    {
      number: 3,
      next: 4,
      type: "radio",
      text:
        "Taking into account all the information you were given before starting work, such as pay, hours, type of work and length of job, how accurate was the description you were given about the job overall?",
      isJumping: false,
      options: ["Totally inaccurate", "Not very accurate", "Mostly accurate", "Fully accurate"],
      category: "agency",
      profileText: "Accuracy of job descriptions given to you overall",
      profileSection: "Detailed ratings",
      profileOrder: 3,
      profileType: "barChart",
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: false,
    },
    {
      number: 4,
      next: 5,
      type: "yesno",
      text: "Did they give you correct information about the pay?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Gives you correct information about the pay",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 11,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },
    {
      number: 5,
      next: 6,
      type: "yesno",
      text: "Did they give you correct information about the hours?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Gives you correct information about the hours",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 12,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },
    {
      number: 6,
      next: 7,
      type: "yesno",
      text: "Did they give you correct information about the type of work?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Gives you correct information about the type of work",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 13,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },
    {
      number: 7,
      next: 8,
      type: "yesno",
      text: "Did they give you correct information about the length of the job?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Gives you correct information about the length of the job",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 14,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },

    // new section ( add popup for this Q.)
    {
      number: 8,
      next: 9,
      type: "number",
      text: "What hourly rate were you paid?",
      label: "per hour",
      isJumping: false,
      category: "agency",
      profileText: "Hourly pay rates",
      profileSection: "Key ratings",
      profileType: "dotChart",
      profileOrder: 4,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    // new
    {
      number: 9,
      next: 10,
      type: "yesno",
      text: "Were you happy with the amount you were paid?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Happy with the amount you were paid",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 5,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
    },
    {
      number: 10,
      next: {
        yes: 16,
        no: 11,
      },
      type: "yesno",
      text: "Were you paid via a payroll/umbrella?",
      isJumping: true,
      jumpTo: [{ value: "Yes", nextQuestion: 15 }, { value: "No", nextQuestion: 10 }],
      options: ["Yes", "No"],
      category: "agency",
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    {
      number: 11,
      isDependent: true,
      next: 12,
      type: "yesno",
      text: "What was the payroll type?",
      isJumping: false,
      options: ["CIS", "Ltd", "PAYE", "Umbrella"],
      category: "agency",
      profileText: "Pays using the following payroll types",
      profileSection: "Key ratings",
      profileType: "barChart",
      profileOrder: 3,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    {
      number: 12,
      isDependent: true,
      next: 13,
      type: "yesno",
      text: "Were you paid within the timeframe you expected?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Pays you within the timeframe you expect",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 6,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
    },
    {
      number: 13,
      isDependent: true,
      next: 14,
      type: "yesno",
      text: "Were you paid the amount you expected?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Pays you the amount you expect",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 7,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
    },
    {
      number: 14,
      isDependent: true,
      next: 15,
      type: "yesno",
      text: "Were your payslips easily accessible?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "agency",
      profileText: "Payslips are easily accessible",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 15,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
    },
    {
      number: 15,
      isDependent: true,
      next: 18,
      type: "yesno",
      text: "Did the payslips show all the information you needed?",
      isJumping: true,
      jumpTo: [
        { value: "Yes", nextQuestion: 17 },
        { value: "No", nextQuestion: 17 },
        { value: "I didn't check", nextQuestion: 17 },
      ],
      options: ["Yes", "No", "I didn't check"],
      category: "agency",
      profileText: "Payslips show all the information you need",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 16,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
    },
    {
      number: 16,
      isDependent: true,
      next: 17,
      type: "dropdown",
      text: "What's the name of the payroll?",
      label: "Select payroll",
      isJumping: false,
      options: payrollsNames,
      category: "agency",
      profileText: "Pays using the following payrolls",
      profileSection: "Key ratings",
      profileType: "payrollList",
      profileOrder: 2,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    {
      number: 17,
      isDependent: true,
      next: 18,
      type: "number",
      text: "How much were you charged?",
      label: "per timesheet",
      isJumping: false,
      category: "agency",
      profileSection: "Key ratings",
      profileType: "payrollSubList",
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    {
      number: 18,
      next: 19,
      type: "yesno",
      text: "Were you always treated fairly by this agency over any payment issues?",
      isJumping: false,
      options: ["Yes", "No", "no issues"],
      category: "agency",
      profileText: "Feel you were treated fairly over any payment issues",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 8,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
    },
    {
      number: 19,
      type: "yesno",
      text: "Overall, would you be happy to use this agency again?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "agency",
      profileText: "Happy to use this agency again overall",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 1,
      group: {
        groupOrder: 2,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
    },

    /* =========================== questionsPayroll ==================================== */

    {
      number: 1,
      next: {
        yes: 2,
        no: 3,
      },
      type: "yesno",
      text: "Did they send you written confirmation of the terms and conditions of employment?",
      hintText:
        "i.e., details of pay, overtime, mileage/travel allowance, lodging provision, holiday entitlement, disciplinary procedures, benefits, etc.",
      isJumping: true,
      jumpTo: [{ value: "Yes", nextQuestion: 2 }, { value: "No", nextQuestion: 3 }],
      options: ["Yes", "No"],
      category: "payroll",
      profileText: "Sends you written confirmation of terms and conditions of employment",
      profileSection: "Detailed ratings",
      profileType: "yesno",
      profileOrder: 1,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },
    {
      number: 2,
      next: 3,
      isDependent: true,
      type: "yesno",
      text: "Did they send you this information before your work began?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "payroll",
      profileText: "Sends you terms and conditions before your work begins",
      profileSection: "Detailed ratings",
      profileType: "yesno",
      profileOrder: 2,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
    },
    {
      number: 3,
      next: 4,
      type: "radio",
      text: "What was the payroll type?",
      isJumping: false,
      options: ["CIS", "Ltd", "PAYE", "Umbrella"],
      category: "payroll",
      profileText: "Pays using the following payroll types",
      profileSection: "Key ratings",
      profileType: "barChart",
      profileOrder: 2,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: false,
    },
    {
      number: 4,
      next: 5,
      type: "yesno",
      text: "Were you paid within the timeframe you expected?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "payroll",
      profileText: "Pays you within the timeframe you expect",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 5,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: true,
    },
    {
      number: 5,
      next: 6,
      type: "yesno",
      text: "Were you paid the amount you expected?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "payroll",
      profileText: "Pays you the amount you expect",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 6,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: true,
    },
    {
      number: 6,
      next: 7,
      type: "radio",
      text: "Were your payslips easily accessible?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "payroll",
      profileText: "Payslips are easily accessible",
      profileSection: "Detailed ratings",
      profileType: "yesno",
      profileOrder: 3,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: true,
    },
    {
      number: 7,
      next: 8,
      type: "radio",
      text: "Did the payslips show all the information you needed?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "payroll",
      profileText: "Payslips show all the information you need",
      profileSection: "Detailed ratings",
      profileType: "yesno",
      profileOrder: 4,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: true,
    },
    {
      number: 8,
      next: 9,
      type: "number",
      text: "How much were you charged for payroll?",
      label: "per timesheet",
      isJumping: false,
      category: "payroll",
      profileText: "Payroll charge",
      profileSection: "Key ratings",
      profileType: "list",
      profileOrder: 1,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: false,
    },
    {
      number: 9,
      next: 10,
      type: "radio",
      text: "Were you always treated fairly by this payroll over any payment issues?",
      isJumping: false,
      options: ["Yes", "No", "no issues"],
      category: "payroll",
      profileText: "Treats you fairly over any payment issues",
      profileSection: "Detailed ratings",
      profileType: "yesno",
      profileOrder: 5,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: true,
    },
    {
      number: 10,
      next: 11,
      type: "dropdown",
      text: "What's the name of the agency you used?",
      label: "Select agency",
      isJumping: false,
      options: agencyNames,
      category: "payroll",
      profileText: "Works with the following agencies",
      profileSection: "Key ratings",
      profileType: "list",
      profileOrder: 2,
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting yor wages",
      },
      hasComment: false,
    },
    {
      number: 11,
      type: "yesno",
      text: "Overall, would you be happy to use this payroll again?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "payroll",
      profileText: "Happy to use this payroll again overall",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 4,
      group: {
        groupOrder: 2,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
    },

    /* =============================== worksite =============================== */
    {
      number: 1,
      next: 2,
      type: "radio",
      text: "Was there public transport within 10 minutes walk of site?",
      hintText: "i.e., buses, trains, etc.",
      isJumping: false,
      options: ["Yes", "No", "don't know"],
      category: "worksite",
      profileText: "Public transport within 10 mins walk of site",
      profileSection: "Getting onto site",
      profileType: "siteItem",
      profileOrder: 1,
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: false,
      icon: "bus",
    },
    {
      number: 2,
      next: {
        yes: 3,
        no: 4,
        idk: 4,
      },
      type: "radio",
      text: "Was there car parking within 10 minutes walk of site?",
      isJumping: true,
      jumpTo: [
        { value: "Yes", nextQuestion: 3 },
        { value: "No", nextQuestion: 5 },
        { value: "don't know", nextQuestion: 5 },
      ],
      options: ["Yes", "No", "don't know"],
      category: "worksite",
      profileText: "Car parking within 10 mins walk of site",
      profileSection: "Getting onto site",
      profileType: "siteItem",
      profileOrder: 2,
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: false,
      icon: "parkingSign",
    },
    {
      number: 3,
      isDependent: true,
      next: 4,
      type: "number",
      text: "How much did car parking cost per day?",
      label: "per day",
      isJumping: false,
      category: "worksite",
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: false,
    },
    // double check the options
    {
      number: 4,
      next: 5,
      type: "radio",
      text: "At the site, were you offered storage for your personal belongings?",
      hintText: "E.g., Lockers, cloak room, etc.",
      isJumping: false,
      options: ["Yes", "No", "Yes, but I didn't need it"],
      category: "worksite",
      profileText: "Storage for your personal belongings",
      profileSection: "Getting onto site",
      profileType: "siteItem",
      profileOrder: 3,
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: true,
      icon: "lockers",
    },

    {
      number: 5,
      next: 6,
      type: "yesno",
      text: "Did you have to use fingerprint scanners or eye recognition to access the site?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "worksite",
      profileText: "Fingerprint scanners/eye-recognition to access site",
      profileSection: "Getting onto site",
      profileType: "siteItem",
      profileOrder: 4,
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: false,
      icon: "fingerprint",
    },
    {
      number: 6,
      next: 7,
      type: "yesno",
      text:
        "Did you have to wear 5-point PPE at all times (ie hat, goggles, vest, gloves, and boots)?",
      hintText: "eg Hat, goggles, vest, gloves, and boots?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "worksite",
      profileText: "5-point PPE at all times",
      profileSection: "Getting onto site",
      profileType: "siteItem",
      profileOrder: 5,
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: false,
      icon: "gasmask",
    },
    {
      number: 7,
      next: 8,
      type: "dropdown",
      text: "Who is the main contractor on site?",
      isJumping: false,
      category: "worksite",
      profileText: "Main contractor",
      profileSection: "Working on the site",
      profileType: "siteItem",
      profileOrder: 1,
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: false,
    },

    {
      number: 8,
      next: 9,
      type: "yesno",
      text: "Were the work areas tidy?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "worksite",
      profileText: "Work areas are tidy",
      profileSection: "Working on the site",
      profileType: "yesno",
      profileOrder: 2,
      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: true,
    },

    {
      number: 9,
      next: 10,
      type: "yesno",
      text: "Did you find it easy to get around site?",
      hintText: "ie Gateways, walkways, signage",
      isJumping: false,
      options: ["Yes", "No"],
      category: "worksite",
      profileText: "Easy to get around site",
      profileSection: "Working on the site",
      profileType: "yesno",
      profileOrder: 3,
      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: true,
    },

    {
      number: 10,
      next: 11,
      type: "yesno",
      text: "Did you feel this site was safe to work on?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "worksite",
      profileText: "Feel this site is safe to work on",
      profileSection: "Working on the site",
      profileType: "yesno",
      profileOrder: 4,
      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: true,
    },

    {
      number: 11,
      next: 12,
      type: "image",
      text: "Upload a photo of the site",
      hintText:
        "Offer workers a behind-the-scenes look at the site, e.g., work areas, canteen, etc.",
      isJumping: false,
      category: "worksite",
      profileText: "Site Photos",
      profileSection: "Key ratings",
      profileType: "image",
      profileOrder: 2,
      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: false,
    },

    // new
    {
      number: 12,
      next: 13,
      type: "yesno",
      text: "Were there female toilets on site?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",
      profileText: "Female toilets on site",
      profileSection: "The site welfare",
      profileType: "yesno",
      profileOrder: 2,
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: false,
    },
    {
      number: 13,
      next: 14,
      type: "yesno",
      text: "Were the toilets well maintained?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",
      profileText: "Toilets are well maintained",
      profileSection: "The site welfare",
      profileType: "yesno",
      profileOrder: 1,
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: true,
    },

    {
      number: 14,
      next: 15,
      type: "yesno",
      text: "Did this site have a prayer room?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",
      profileText: "Prayer room",
      profileSection: "The site welfare",
      profileType: "siteItem",
      profileOrder: 3,
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: false,
      icon: "prayerRoom",
    },
    {
      number: 15,
      next: {
        yes: 16,
        no: 17,
        idk: 17,
      },
      type: "radio",
      text: "Was there a canteen or space to take a break?",
      isJumping: true,
      jumpTo: [
        { value: "Yes", nextQuestion: 13 },
        { value: "No", nextQuestion: 15 },
        { value: "don't know", nextQuestion: 16 },
      ],
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",
      profileText: "Canteen:",
      profileSection: "The site welfare",
      profileType: "canteenItem",
      profileOrder: 4,
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: true,
    },
    {
      number: 16,
      isDependent: true,
      next: 17,
      type: "checklist",
      text: "What amenities did the canteen have?",
      isJumping: false,
      options: [
        "Hot food served",
        "Vending machines",
        "Tables and chairs",
        "Microwave",
        "Kettle/boiling water",
        "Fridge",
      ],
      category: "worksite",
      profileSection: "The site welfare",
      profileType: "canteenSubItem",
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: false,
    },
    {
      number: 17,
      next: 18,
      type: "radio",
      text: "Were there shops to buy hot food within 10 minutes walk of this site?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",
      profileText: "Shops for hot food within 10 mins walk of site",
      profileSection: "The site welfare",
      profileType: "siteItem",
      profileOrder: 5,
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: false,
      icon: "hotFood",
    },
    {
      number: 18,
      next: 19,
      type: "radio",
      text: "Could you buy hot food and a drink for less than £5?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",
      profileText: "Can buy hot food and a drink for less than £5",
      profileSection: "The site welfare",
      profileType: "siteItem",
      profileOrder: 6,
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: false,
      icon: "cheapFood",
    },
    {
      number: 19,
      next: 20,
      type: "open",
      text: "Is there a good shop or café near site that you would recommend to other workers?",
      label: "Good shop or café",
      isJumping: false,
      category: "worksite",
      profileText: "Recommended nearby shops and cafés",
      profileSection: "The site welfare",
      profileType: "list",
      profileOrder: 7,
      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: false,
    },
    {
      number: 20,
      type: "yesno",
      text: "Overall, would you be happy to work on this site again?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "worksite",
      profileText: "Happy to work on this site again overall",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 1,
      group: {
        groupOrder: 3,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
    },

    /* ============================= company ================================== */

    {
      number: 1,
      type: "yesno",
      text: "Was their materials store well organised?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check", "They didn't have a materials store"],
      category: "company",
      profileText: "Materials stores are well organised",
      profileSection: "Tools & materials",
      profileType: "yesno",
      profileOrder: 1,
      group: {
        groupOrder: 0,
        name: "toolsAndMaterials",
        text: "Tools & materials",
      },
      hasComment: true,
    },
    {
      number: 2,
      next: {
        yes: 3,
        no: 4,
      },
      type: "yesno",
      text: "Were you offered access equipment when you needed it?",
      hintText: "E.g., stepladders, harnesses, lifters, etc.",
      isJumping: false,
      options: ["Yes", "No", "I didn't need it"],
      category: "company",
      profileText: "Offers access equipment when you need it",
      profileSection: "Tools & materials",
      profileType: "yesno",
      profileOrder: 2,
      group: {
        groupOrder: 0,
        name: "toolsAndMaterials",
        text: "Tools & materials",
      },
      hasComment: true,
    },
    {
      number: 3,
      next: 4,
      isDependent: true,
      type: "radio",
      text: "Was the access equipment in safe condition?",
      isJumping: false,
      options: ["Yes", "No", "I didn't check"],
      category: "company",
      profileText: "Access equipment is in safe condition",
      profileSection: "Tools & materials",
      profileType: "yesno",
      profileOrder: 3,
      group: {
        groupOrder: 0,
        name: "toolsAndMaterials",
        text: "Tools & materials",
      },
      hasComment: true,
    },
    {
      number: 4,
      next: 5,
      type: "radio",
      text: "Were you offered storage for your tools overnight?",
      isJumping: false,
      options: ["Yes", "No", "I didn't need it"],
      category: "company",
      profileText: "Offers storage for your tools overnight when you need it",
      profileSection: "Tools & materials",
      profileType: "yesno",
      profileOrder: 4,
      group: {
        groupOrder: 0,
        name: "toolsAndMaterials",
        text: "Tools & materials",
      },
      hasComment: true,
    },

    // supervisors & employees
    {
      number: 5,
      next: 6,
      type: "yesno",
      text: "Did the supervisor share all the information you needed to do a good job?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "company",
      profileText: "Supervisors share all the information you need to do a good job",
      profileSection: "Supervisors & employees",
      profileType: "yesno",
      profileOrder: 1,
      group: {
        groupOrder: 1,
        name: "supervisorsAndEmployees",
        text: "Supervisors & employees",
      },
      hasComment: true,
    },
    {
      number: 6,
      next: 7,
      type: "yesno",
      text: "Did the supervisor treat you with respect?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "company",
      profileText: "Supervisors treat you with respect",
      profileSection: "Supervisors & employees",
      profileType: "yesno",
      profileOrder: 2,
      group: {
        groupOrder: 1,
        name: "supervisorsAndEmployees",
        text: "Supervisors & employees",
      },
      hasComment: true,
    },
    {
      number: 7,
      next: 8,
      type: "yesno",
      text: "Did the other company employees treat you with respect?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "company",
      profileText: "Employees treat you with respect",
      profileSection: "Supervisors & employees",
      profileType: "yesno",
      profileOrder: 3,
      group: {
        groupOrder: 1,
        name: "supervisorsAndEmployees",
        text: "Supervisors & employees",
      },
      hasComment: true,
    },
    {
      number: 8,
      next: 9,
      type: "yesno",
      text: "Overall, did you feel valued working with this company?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "company",
      profileText: "Feel valued working with this company overall",
      profileSection: "Supervisors & employees",
      profileType: "yesno",
      profileOrder: 4,
      group: {
        groupOrder: 1,
        name: "supervisorsAndEmployees",
        text: "Supervisors & employees",
      },
      hasComment: true,
    },
    {
      number: 9,
      type: "yesno",
      text: "Overall, would you be happy to work for this company again?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "company",
      profileText: "Happy to work for this company again overall",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 1,
      group: {
        groupOrder: 2,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
    },
  ];
  return Question.create(questions);
};
