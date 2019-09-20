const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next) {
    // get call -> /advertisements
    advertisementQueries.getAllAdvertisements((err, advertisements) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("advertisements/index", { advertisements });
      }
    });
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
  },
  show(req, res, next) {
    // console.log("show advertisement ran");
    advertisementQueries.getAdvertisement(
      req.params.id,
      (err, advertisement) => {
        if (err || advertisement == null) {
          // console.log("error: " + err);
          res.redirect(404, "/");
        } else {
          res.render("advertisements/show", { advertisement });
          // console.log(advertisement);
        }
      }
    );
  },

  destroy(req, res, next) {
    advertisementQueries.deleteAdvertisement(
      req.params.id,
      (err, advertisement) => {
        if (err) {
          res.redirect(500, `/advertisements/${advertisement.id}`);
        } else {
          res.redirect(303, "/topics");
        }
      }
    );
  },
  edit(req, res, next) {
    // console.log("edit advertisement ran");
    advertisementQueries.getAdvertisement(
      req.params.id,
      (err, advertisement) => {
        if (err || advertisement == null) {
          // console.log("error: " + err);
          res.redirect(404, "/");
        } else {
          res.render("advertisements/edit", { advertisement });
          // console.log(advertisement);
        }
      }
    );
  },
  update(req, res, next) {
    //#1
    advertisementQueries.updateAdvertisement(
      req.params.id,
      req.body,
      (err, advertisement) => {
        //#2
        if (err || advertisement == null) {
          res.redirect(404, `/advertisements/${req.params.id}/edit`);
        } else {
          res.redirect(`/advertisements/${advertisement.id}`);
        }
      }
    );
  }
};
