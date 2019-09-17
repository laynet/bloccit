const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next) {
    res.send("TODO: list all advertisements");
  },
  new(req, res, next) {
    res.render("advertisements/new");
  },
  create(req, res, next) {
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

// const topicQueries = require("../db/queries.topics.js");

// module.exports = {
//   index(req, res, next) {
//     topicQueries.getAllTopics((err, topics) => {
//       if (err) {
//         res.redirect(500, "static/index");
//       } else {
//         res.render("topics/index", { topics });
//       }
//     });
//   },
//   new(req, res, next) {
//     res.render("topics/new");
//   },
