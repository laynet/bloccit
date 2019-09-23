const Post = require("./models").Post;
const Flair = require("./models").Flair;

module.exports = {
  getFlair(id, callback) {
    return this.getFlair
      .findById(id, {
        include: [
          {
            name: this.getFlair,
            as: "flairs"
          }
        ]
      })
      .then(flair => {
        callback(null, topic);
      })
      .catch(err => {
        callback(err);
      });
  }
};
