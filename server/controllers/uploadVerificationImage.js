module.exports = (req, res) => {
  console.log(req.file);
  res.json(req.file);
};
