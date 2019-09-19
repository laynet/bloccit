const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next) {
    // get call -> /advertisements
    res.send("TODO: list all advertisements");
  },
  new(req, res, next) {
    // get call -> /advertisements/new
    res.render("advertisements/new");
  },
  create(req, res, next) {
    // post call -> /advertisements
    let newAdvertisement = {
      title: req.body.title,
      description: req.body.description
    };
    advertisementQueries.addAdvertisement(
      newAdvertisement,
      (err, advertisement) => {
        if (err) {
          res.redirect(500, "/advertisements/new");
        } else {
          res.redirect(303, `/advertisements/${advertisement.id}`);
        }
      }
    );
  }
};
