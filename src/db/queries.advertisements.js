const Advertisement = require("./models").Advertisement;

module.exports = {
  //#1
  getAllAdvertisements(callback) {
    return (
      Advertisement.findAll()

        //#2
        .then(advertisements => {
          callback(null, advertisements);
        })
        .catch(err => {
          callback(err);
        })
    );
  },
  getAdvertisement(id, callback) {
    // console.log("get advertisement ran");
    return Advertisement.findById(id)
      .then(advertisement => {
        // console.log(advertisement);
        callback(null, advertisement);
      })
      .catch(err => {
        // console.log("err: " + err);
        callback(err);
      });
  },

  addAdvertisement(newAdvertisement, callback) {
    // console.log("new advertisement ran");
    return Advertisement.create({
      title: newAdvertisement.title,
      description: newAdvertisement.description
    })
      .then(advertisement => {
        // console.log(advertisement);
        callback(null, advertisement);
      })
      .catch(err => {
        // console.log("error: " + err);
        callback(err);
      });
  },

  deleteAdvertisement(id, callback) {
    return Advertisement.destroy({
      where: { id }
    })
      .then(advertisement => {
        callback(null, advertisement);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateAdvertisement(id, updatedAdvertisement, callback) {
    return Advertisement.findById(id).then(advertisement => {
      if (!advertisement) {
        return callback("Advertisement not found");
      }

      //#1
      advertisement
        .update(updatedAdvertisement, {
          fields: Object.keys(updatedAdvertisement)
        })
        .then(() => {
          callback(null, advertisement);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
