export default [
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
        route: "/add"
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
