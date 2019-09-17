const Advertisment = require("./models").Advertisement;

module.exports = {
  //#1
  getAllAdvertisements(callback) {
    return (
      Advertisement.all()

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
    return Advertisement.findById(id)
      .then(advertisement => {
        callback(null, advertisement);
      })
      .catch(err => {
        callback(err);
      });
  },
  addAdvertisement(newAdvertisement, callback) {
    return Advertisement.create({
      title: newAdvertisement.title,
      description: newAdvertisemet.description
    })
      .then(advertisement => {
        callback(null, advertisement);
      })
      .catch(err => {
        callback(err);
      });
  }
};
//   deleteTopic(id, callback) {
//     return Topic.destroy({
//       where: { id }
//     })
//       .then(topic => {
//         callback(null, topic);
//       })
//       .catch(err => {
//         callback(err);
//       });
//   },
//   updateTopic(id, updatedTopic, callback) {
//     return Topic.findById(id).then(topic => {
//       if (!topic) {
//         return callback("Topic not found");
//       }
//       topic
//         .update(updatedTopic, {
//           fields: Object.keys(updatedTopic)
//         })
//         .then(() => {
//           callback(null, topic);
//         })
//         .catch(err => {
//           callback(err);
//         });
//     });
//   }
// };
