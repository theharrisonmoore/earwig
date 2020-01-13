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
      next: 2,
      type: "yesno",
      text:
        "Did this agency give you correct information about the hours you would work?",
      options: ["Yes", "No"],
      category: "agency",

      profileText:
        "Did this agency give you correct information about the hours you would work?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 3,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "correctHours",
    },
    {
      number: 2,
      next: 3,
      type: "yesno",
      text:
        "Did this agency give you correct information about the rate you would be paid?",
      options: ["Yes", "No"],
      category: "agency",
      profileText:
        "Did this agency give you correct information about the rate you would be paid?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 4,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "correctRate",
    },
    {
      number: 3,
      next: 5,
      type: "yesno",
      text:
        "Did this agency give you correct information about the type of work you would do?",
      options: ["Yes", "No"],
      category: "agency",

      profileText:
        "Did this agency give you correct information about the type of work you would do?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 5,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "correctWork",
    },
    // {
    //   number: 4,
    //   next: 5,
    //   type: "yesno",
    //   text:
    //     "Did this agency give you correct information about the date your job would end?",
    //   options: ["Yes", "No"],
    //   category: "agency",

    //   profileText:
    //     "Did this agency give you correct information about the date your job would end?",
    //   profileSection: "Key ratings",
    //   profileType: "yesno",
    //   profileOrder: 6,

    //   group: {
    //     groupOrder: 0,
    //     name: "general",
    //     text: "General",
    //   },
    //   hasComment: true,
    // },
    // new section ( add popup for this Q.)
    {
      number: 5,
      next: 6,
      type: "number",
      text: "What hourly rate did this agency pay you?",
      label: "per hour",
      category: "agency",

      // not rendered in the profile
      // profileText: "Hourly pay rates",
      // profileSection: "Key ratings",
      // profileType: "dotChart",
      // profileOrder: 4,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
      icon: "hourlyRate",
    },
    {
      number: 6,
      next: {
        yes: 9,
        no: 7,
      },
      type: "yesno",
      text: "Were you paid via a payroll company?",
      options: ["Yes", "No"],
      category: "agency",
      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    // //////////////////////
    // No branch
    {
      number: 7,
      next: 8,
      isDependent: true,
      type: "yesno",
      text: "What was the payroll type?",
      options: ["CIS", "Ltd", "PAYE", "Umbrella"],
      category: "agency",

      profileText: "This agency pays you using the following payroll types",
      profileSection: "Key ratings",
      profileType: "barChart",
      profileOrder: 11,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    {
      number: 8,
      next: 11,
      isDependent: true,
      type: "yesno",
      text: "Did this agency send you a contract?",
      hintText: "ie details of pay, overtime, mileage/travel allowance, etc.",
      options: ["Yes", "No"],
      category: "agency",

      profileText: "Did this agency send you a contract?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 2,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
      icon: "contract",
    },

    // ///////////////////////
    // Yes branch
    {
      number: 9,
      next: 10,
      isDependent: true,
      type: "dropdown",
      text: "What's the name of the payroll?",
      label: "Choose payroll",
      options: payrollsNames,
      category: "agency",

      profileText: "This agency works with the following payroll companies",
      profileSection: "Key ratings",
      profileType: "payrollList",
      profileOrder: 12,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
    },
    {
      number: 10,
      next: 11,
      isDependent: true,
      type: "number",
      text: "How much were you charged by the payroll for each timesheet?",
      label: "per timesheet",
      category: "agency",

      profileSection: "Key ratings",
      profileType: "payrollSubList",

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: false,
      icon: "timesheetCharge",
    },

    // ////////////////
    {
      number: 11,
      next: 12,
      type: "yesno",
      text: "Were you paid on time?",
      options: ["Yes", "No"],
      category: "agency",

      profileText: "Were you paid on time?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 7,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
      icon: "paidOnTime",
    },
    {
      number: 12,
      next: 13,
      type: "yesno",
      text: "Were you paid the amount you expected (including any overtime)?",
      options: ["Yes", "No"],
      category: "agency",

      profileText:
        "Were you paid the amount you expected (including any overtime)?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 8,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
      icon: "amountExpected",
    },
    {
      number: 13,
      next: 14,
      type: "yesno",
      text: "Were your payslips easily accessible?",
      options: ["Yes", "No", "I didn't check"],
      category: "agency",

      profileText: "Were your payslips easily accessible?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 9,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
      icon: "payslipsAccessible",
    },
    {
      number: 14,
      next: 15,
      type: "yesno",
      text: "Did the payslips show all the information you needed?",
      options: ["Yes", "No", "I didn't check"],
      category: "agency",

      profileText: "Did the payslips show all the information you needed?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 10,

      group: {
        groupOrder: 1,
        name: "wages",
        text: "Getting your wages",
      },
      hasComment: true,
      icon: "payslipsInfo",
    },
    // new section (overall rating)
    {
      number: 15,
      type: "yesno",
      text: "Overall, would you recommend this agency to a friend?",
      options: ["Yes", "No"],
      category: "agency",

      profileText: "Overall, would you recommend this agency to a friend?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 1,

      group: {
        groupOrder: 2,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
      icon: "overall",
    },

    /* =========================== questionsPayroll ==================================== */

    {
      number: 1,
      next: 2,
      type: "number",
      text: "How much were you charged by this payroll for each timesheet?",
      label: "per timesheet",
      category: "payroll",

      profileText: "This payroll charges you",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 8,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      icon: "timesheetCharge",
    },
    {
      number: 2,
      next: 3,
      type: "radio",
      text: "What was the payroll type?",
      options: ["CIS", "Ltd", "PAYE", "Umbrella"],
      category: "payroll",

      profileText: "This payroll pays you using the following payroll types",
      profileSection: "Key ratings",
      profileType: "barChart",
      profileOrder: 9,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: false,
    },
    {
      number: 3,
      next: {
        yes: 4,
        no: 5,
      },
      type: "yesno",
      text: "Did this payroll send you a contract?",
      hintText: "ie details of pay, overtime, mileage/travel allowance, etc.",
      options: ["Yes", "No"],
      category: "payroll",

      profileText: "Did this payroll send you a contract?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 4,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "contract",
    },

    {
      number: 4,
      next: 5,
      isDependent: true,
      type: "yesno",
      text: "Did this payroll send you a contract before your work started?",
      isJumping: false,
      options: ["Yes", "No"],
      category: "payroll",

      profileText:
        "Did this payroll send you a contract before your work started?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 5,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "contractBefore",
    },
    {
      number: 5,
      next: 6,
      type: "yesno",
      text: "Were you paid on time?",
      options: ["Yes", "No"],
      category: "payroll",

      profileText: "Were you paid on time?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 2,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "paidOnTime",
    },
    {
      number: 6,
      next: 7,
      type: "yesno",
      text: "Were you paid the amount you expected (including any overtime)?",
      options: ["Yes", "No"],
      category: "payroll",

      profileText:
        "Were you paid the amount you expected (including any overtime)?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 3,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "amountExpected",
    },
    {
      number: 7,
      next: 8,
      type: "radio",
      text: "Were your payslips easily accessible?",
      options: ["Yes", "No", "I didn't check"],
      category: "payroll",
      profileText: "Were your payslips easily accessible?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 6,
      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "payslipsAccessible",
    },
    {
      number: 8,
      next: 9,
      type: "radio",
      text: "Did the payslips show all the information you needed?",
      options: ["Yes", "No", "I didn't check"],
      category: "payroll",

      profileText: "Did the payslips show all the information you needed?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 7,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: true,
      icon: "payslipsInfo",
    },
    {
      number: 9,
      next: 10,
      type: "dropdown",
      text: "What's the name of the agency you used?",
      label: "Choose agency",
      options: agencyNames,
      category: "payroll",

      profileText: "This payroll works with the following agencies",
      profileSection: "Key ratings",
      profileType: "list",
      profileOrder: 10,

      group: {
        groupOrder: 0,
        name: "general",
        text: "General",
      },
      hasComment: false,
    },
    {
      number: 10,
      type: "yesno",
      text: "Overall, would you recommend this payroll to a friend?",
      options: ["Yes", "No"],
      category: "payroll",

      profileText: "Overall, would you recommend this payroll to a friend?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 1,

      group: {
        groupOrder: 1,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
      icon: "overall",
    },

    /* =============================== worksite =============================== */
    {
      number: 1,
      next: 2,
      type: "radio",
      text: "Was there public transport within 10 minutes walk of this site?",
      hintText: "ie buses, trains, etc.",
      options: ["Yes", "No", "Don't know"],
      category: "worksite",

      profileText: "Public transport within 10 mins walk of site",
      profileSection: "Getting on to site",
      profileType: "siteItem",
      profileOrder: 2,

      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },

      hasComment: true,
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
      text: "Was there car parking within 10 minutes walk of this site?",
      options: ["Yes", "No", "Don't know"],
      category: "worksite",

      profileText: "Car parking within 10 mins walk of this site",
      profileSection: "Getting on to site",
      profileType: "siteItem",
      profileOrder: 3,

      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: true,
      icon: "parkingSign",
    },
    {
      number: 3,
      next: 4,
      isDependent: true,
      type: "number",
      text: "How much did car parking cost per day?",
      label: "per day",
      category: "worksite",
      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: true,
      icon: "parkingCost",
    },
    {
      number: 4,
      next: 5,
      type: "radio",
      text:
        "At this site, were you offered storage for your personal belongings?",
      hintText: "eg Lockers, cloak room, etc.",
      options: ["Yes", "No", "Yes, but I didn't need it"],
      category: "worksite",

      profileText: "Storage for your personal belongings at this site",
      profileSection: "Getting on to site",
      profileType: "siteItem",
      profileOrder: 4,

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
      text:
        "Did you have to use fingerprint scanners or eye recognition to access this site?",
      options: ["Yes", "No"],
      category: "worksite",

      profileText: "Fingerprint scanners/eye-recognition to access this site",
      profileSection: "Getting on to site",
      profileType: "siteItem",
      profileOrder: 5,

      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: true,
      icon: "fingerprint",
    },
    {
      number: 6,
      next: 7,
      type: "yesno",
      text: "Did you have to wear 5-point PPE at all times on this site? ",
      hintText: "eg Hat, goggles, vest, gloves, and boots",
      options: ["Yes", "No"],
      category: "worksite",

      profileText: "5-point PPE must be worn at all times on this site",
      profileSection: "Getting on to site",
      profileType: "siteItem",
      profileOrder: 6,

      group: {
        groupOrder: 0,
        name: "getToSite",
        text: "Getting on to site",
      },
      hasComment: true,
      icon: "gasmask",
    },
    {
      number: 7,
      next: 8,
      type: "dropdown",
      text: "Who was the main company in charge of this whole site?",
      category: "worksite",
      label: "Choose main company",

      profileText: "Main company",
      profileSection: "Working on the site",
      // profileType: "siteItem",
      // profileOrder: 1,

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
      options: ["Yes", "No"],
      category: "worksite",

      profileText: "Were the work areas tidy?",
      profileSection: "Working on the site",
      profileType: "yesno",
      profileOrder: 7,

      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: true,
      icon: "tidySite",
    },

    {
      number: 9,
      next: 10,
      type: "yesno",
      text: "Did you find it easy to get around this site?",
      hintText: "ie Gateways, walkways, signage",
      options: ["Yes", "No"],
      category: "worksite",

      profileText: "Did you find it easy to get around this site?",
      profileSection: "Working on the site",
      profileType: "yesno",
      profileOrder: 8,

      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: true,
      icon: "getAround",
    },

    {
      number: 10,
      next: 11,
      type: "yesno",
      text: "Did you feel it was safe to work on this site?",
      options: ["Yes", "No"],
      category: "worksite",

      profileText: "Did you feel it was safe to work on this site?",
      profileSection: "Working on the site",
      profileType: "yesno",
      profileOrder: 9,

      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: true,
      icon: "safeSite",
    },

    {
      number: 11,
      next: 12,
      type: "image",
      text: "Upload a photo of this site",
      hintText:
        "Offer workers a behind-the-scenes look at the site, e.g., work areas, canteen, etc.",
      isJumping: false,
      category: "worksite",

      profileText: "Photos of this site",
      profileSection: "Working on the site",
      profileType: "image",
      profileOrder: 10,

      group: {
        groupOrder: 1,
        name: "onTheSite",
        text: "Working on the site",
      },
      hasComment: false,
    },

    // new section (The site welfare)
    {
      number: 12,
      next: 13,
      type: "yesno",
      text: "Were the toilets clean and tidy?",
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",

      profileText: "Were the toilets clean and tidy?",
      profileSection: "The site welfare",
      profileType: "yesno",
      profileOrder: 11,

      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: true,
      icon: "toiletsClean",
    },
    {
      number: 13,
      next: 14,
      type: "yesno",
      text: "Did this site have a prayer room?",
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",

      profileText: "Prayer room on this site",
      profileSection: "The site welfare",
      profileType: "siteItem",
      profileOrder: 12,

      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: true,
      icon: "prayerRoom",
    },
    {
      number: 14,
      next: 16,
      type: "radio",
      text: "Did this site have a canteen or space to take a break?",
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",

      profileText: "Canteen on this site with:",
      profileSection: "The site welfare",
      profileType: "canteenItem",
      profileOrder: 13,

      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: true,
      icon: "canteen",
    },
    // {
    //   number: 15,
    //   next: 16,
    //   isDependent: true,
    //   type: "checklist",
    //   text: "What amenities did the canteen have?",
    //   options: [
    //     "Hot food served",
    //     "Vending machines",
    //     "Tables and chairs",
    //     "Microwave",
    //     "Kettle/boiling water",
    //     "Fridge",
    //   ],
    //   category: "worksite",

    //   profileSection: "The site welfare",
    //   profileType: "canteenSubItem",

    //   group: {
    //     groupOrder: 2,
    //     name: "siteWelfare",
    //     text: "The site welfare",
    //   },
    //   hasComment: false,
    // },
    {
      number: 16,
      next: 18,
      type: "radio",
      text:
        "Were there shops to buy hot food within 10 minutes walk of this site?",
      options: ["Yes", "No", "I didn't check"],
      category: "worksite",

      profileText: "Shops for hot food within 10 mins walk of this site",
      profileSection: "The site welfare",
      profileType: "siteItem",
      profileOrder: 14,

      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: true,
      icon: "hotFood",
    },
    // {
    //   number: 17,
    //   next: 18,
    //   type: "radio",
    //   text: "Could you buy hot food and a drink for less than £5?",
    //   options: ["Yes", "No", "I didn't check"],
    //   category: "worksite",

    //   profileText: "Can buy hot food and a drink for less than £5",
    //   profileSection: "The site welfare",
    //   profileType: "siteItem",
    //   profileOrder: 15,

    //   group: {
    //     groupOrder: 2,
    //     name: "siteWelfare",
    //     text: "The site welfare",
    //   },
    //   hasComment: false,
    //   icon: "cheapFood",
    // },
    {
      number: 18,
      next: 19,
      type: "open",
      text: "Add the name of a shop or café near this site that you would recommend to other workers?",
      label: "",
      category: "worksite",

      profileText: "Recommended nearby shops and cafés",
      profileSection: "The site welfare",
      profileType: "list",
      profileOrder: 16,

      group: {
        groupOrder: 2,
        name: "siteWelfare",
        text: "The site welfare",
      },
      hasComment: false,
      icon: "cafe",
    },
    {
      number: 19,
      type: "yesno",
      text: "Overall, would you recommend this worksite to a friend?",
      options: ["Yes", "No"],
      category: "worksite",

      profileText: "Overall, would you recommend this worksite to a friend?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 1,

      group: {
        groupOrder: 3,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
      icon: "overall",
    },

    /* ============================= company ================================== */

    // supervisors & employees
    {
      number: 1,
      next: 2,
      type: "yesno",
      text:
        "Did you feel the supervisor shared all the information you needed to complete your tasks?",
      options: ["Yes", "No"],
      category: "company",

      profileText:
        "Did you feel the supervisor shared all the information you needed to complete your tasks?",
      profileSection: "Supervisors & employees",
      profileType: "yesno",
      profileOrder: 2,

      group: {
        groupOrder: 0,
        name: "supervisorsAndEmployees",
        text: "Supervisors & employees",
      },
      hasComment: true,
      icon: "sharedInfo",
    },
    {
      number: 2,
      next: 3,
      type: "yesno",
      text: "Did you feel the supervisor treated you with respect?",
      options: ["Yes", "No"],
      category: "company",

      profileText: "Did you feel the supervisor treated you with respect?",
      profileSection: "Supervisors & employees",
      profileType: "yesno",
      profileOrder: 3,

      group: {
        groupOrder: 0,
        name: "supervisorsAndEmployees",
        text: "Supervisors & employees",
      },
      hasComment: true,
      icon: "respect",
    },
    {
      number: 3,
      next: 4,
      type: "yesno",
      text:
        "Did you feel the company’s other employees treated you with respect?",
      options: ["Yes", "No", "I didn't meet them"],
      category: "company",

      profileText:
        "Did you feel the company’s other employees treated you with respect?",
      profileSection: "Supervisors & employees",
      profileType: "yesno",
      profileOrder: 4,

      group: {
        groupOrder: 0,
        name: "supervisorsAndEmployees",
        text: "Supervisors & employees",
      },
      hasComment: true,
      icon: "otherEmployees",
    },

    // Tools & materials
    {
      number: 4,
      next: 5,
      type: "yesno",
      text:
        "Did this company offer you all the equipment and materials you needed to complete your tasks?",
      options: ["Yes", "No", "Yes, but I didn't need it"],
      category: "company",

      profileText:
        "Did this company offer you all the equipment and materials you needed to complete your tasks?",
      profileSection: "Tools & materials",
      profileType: "yesno",
      profileOrder: 5,

      group: {
        groupOrder: 1,
        name: "toolsAndMaterials",
        text: "Tools & materials",
      },
      hasComment: true,
      icon: "materials",
    },
    {
      number: 5,
      next: 6,
      type: "radio",
      text:
        "Did this company offer you secure storage for your tools overnight?",
      options: ["Yes", "No", "Yes, but I didn't need it"],
      category: "company",

      profileText:
        "Did this company offer you secure storage for your tools overnight?",
      profileSection: "Tools & materials",
      profileType: "yesno",
      profileOrder: 6,

      group: {
        groupOrder: 1,
        name: "toolsAndMaterials",
        text: "Tools & materials",
      },
      hasComment: true,
      icon: "secureTools",
    },
    {
      number: 6,
      next: 7,
      type: "yesno",
      text: "Did you feel this company took your safety on side seriously?",
      options: ["Yes", "No"],
      category: "company",

      profileText:
        "Did you feel this company took your safety on side seriously?",
      profileSection: "Tools & materials",
      profileType: "yesno",
      profileOrder: 7,

      group: {
        groupOrder: 1,
        name: "toolsAndMaterials",
        text: "Tools & materials",
      },
      hasComment: true,
      icon: "safetySeriously",
    },

    // new section (overall)
    {
      number: 7,
      type: "yesno",
      text: "Overall, would you recommend this company to a friend?",
      options: ["Yes", "No"],
      category: "company",

      profileText: "Overall, would you recommend this company to a friend?",
      profileSection: "Key ratings",
      profileType: "yesno",
      profileOrder: 1,

      group: {
        groupOrder: 2,
        name: "overall",
        text: "Overall rating",
      },
      hasComment: false,
      icon: "overall",
    },
  ];
  return Question.create(questions);
};
