const Trade = require("./../models/Trade");

module.exports = async () => {
  const trades = [
    {
      title: "Appointed person",
    },
    {
      title: "Audio visual engineer",
    },
    {
      title: "Bricklayer",
    },
    {
      title: "Carpenter",
    },
    {
      title: "Carpet layer",
    },
    {
      title: "Chain boy / Assistant to setting out engineer",
    },
    {
      title: "Commercial cleaner",
    },
    {
      title: "Concierge / Security",
    },
    {
      title: "Construction manager",
    },
    {
      title: "Crane and tower operator",
    },
    {
      title: "Data engineer",
    },
    {
      title: "Domestic cleaner",
    },
    {
      title: "Drainage",
    },
    {
      title: "Dryliner",
    },
    {
      title: "Electrician",
    },
    {
      title: "Elevator installer",
    },
    {
      title: "Fencing",
    },
    {
      title: "Fire protection",
    },
    {
      title: "Floor installer",
    },
    {
      title: "Ganger",
    },
    {
      title: "Gardener",
    },
    {
      title: "Gate keeper / Traffic marshal",
    },
    {
      title: "General builder",
    },
    {
      title: "General labourer",
    },
    {
      title: "Glass fitter",
    },
    {
      title: "Groundworker",
    },
    {
      title: "Handyman",
    },
    {
      title: "Hoist operator",
    },
    {
      title: "Landscaper",
    },
    {
      title: "Lift supervisor",
    },
    {
      title: "Lookout / Track operative",
    },
    {
      title: "Mastic man",
    },
    {
      title: "Mobile crane operator",
    },
    {
      title: "Painter and decorator",
    },
    {
      title: "Pest control",
    },
    {
      title: "Pipe fitter",
    },
    {
      title: "Plant operator",
    },
    {
      title: "Plasterer",
    },
    {
      title: "Plumber",
    },
    {
      title: "Renderer",
    },
    {
      title: "Roofer",
    },
    {
      title: "Safety critical staff",
    },
    {
      title: "Scaffolder",
    },
    {
      title: "Setting out engineer",
    },
    {
      title: "Sheet metal worker",
    },
    {
      title: "Shop fitter",
    },
    {
      title: "SIA gate person (Security Authority Trained)",
    },
    {
      title: "Signalling engineer",
    },
    {
      title: "Site supervisor",
    },
    {
      title: "Slinger / Banksman",
    },
    {
      title: "Steel fixer",
    },
    {
      title: "Steel frame installer",
    },
    {
      title: "Stone mason",
    },
    {
      title: "Tape and joiner",
    },
    {
      title: "Tile fitter",
    },
    {
      title: "Tower crane operator",
    },
    {
      title: "Ventilation / Ducting",
    },
    {
      title: "Waterproofer",
    },
    {
      title: "Welder",
    },
    {
      title: "Window fitter",
    },
  ];

  return Trade.create(trades);
};
