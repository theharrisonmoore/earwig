export const routes = {
  DASHBOARD: "/admin",
  USERS: "/admin/users",
  USERS_ALL: "/admin/users/",
  USERS_VERIFY: "/admin/users/verify",
  USERS_VIEW: "/admin/users/view",
  REVIEWS: "/admin/reviews",
  REVIEWS_ALL: "/admin/reviews/",
  REVIEWS_VERIFY: "/admin/reviews/verify",
  SINGLE_REVIEW: "/admin/reviews/:id",
  TRADES: "/admin/trades",
  ORGANIZATIONS: "/admin/organizations",
  COMPANIES: "/admin/organizations/companies",
  AGENCIES: "/admin/organizations/agencies",
  PAYROLLS: "/admin/organizations/payrolls",
  WORKSITES: "/admin/organizations/worksites"
};

export const menuElements = [
  {
    title: "Dashboard",
    icon: "dashboard",
    route: "/"
  },

  {
    title: "Users",
    icon: "team",
    route: "/users",
    items: [
      {
        title: "All Users",
        icon: "team",
        route: "/"
      },
      {
        title: "Verify awaiting users",
        icon: "user-add",
        route: "/verify"
      }
    ]
  },
  {
    title: "Reviews",
    icon: "file-search",
    route: "/reviews",
    items: [
      {
        title: "All Reviews",
        icon: "file-search",
        route: "/"
      },
      {
        title: "Verify awaiting reviews",
        icon: "file-done",
        route: "/verify"
      }
    ]
  },
  {
    title: "Trades",
    icon: "shop",
    route: "/trades"
  },
  {
    title: "Organizations",
    icon: "bank",
    route: "/organizations",
    items: [
      {
        title: "Companies",
        icon: "trademark",
        route: "/companies"
      },
      {
        title: "Worksites",
        icon: "tool",
        route: "/worksites"
      },
      {
        title: "Agencies",
        icon: "team",
        route: "/agencies"
      },
      {
        title: "Payrolls",
        icon: "pay-circle",
        route: "/payrolls"
      }
    ]
  }
];
