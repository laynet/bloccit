module.exports = {
  index(req, res, next) {
    res.send("TODO: list all advertisements");
  },
  new(req, res, next) {
    res.render("advertisement/new");
  }
};
