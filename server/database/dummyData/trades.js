const Trade = require("./../models/Trade");

module.exports = async () => {
  const trades = [
    {
      title: "Appointed person",
    }, {
      title: "Audio visual engineer",
    }, {
      title: "Bricklayer",
    }, {
      title: "Carpenter",
    }, {
      title: "Carpet layer",
    }, {
      title: "Chain boy / Assistant to setting out engineer",
    }, {
      title: "Commercial cleaner",
    }, {
      title: "Concierge / Security",
    }, {
      title: "Construction manager",
    }, {
      title: "Electrician",
    },
  ];

  return Trade.create(trades);
};
