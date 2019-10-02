const Topic = require("./models").Topic;
const Post = require("./models").Post;

module.exports = {
  //#1
  getAllTopics(callback) {
    console.log("getAllTopics ran");
    return (
      Topic.all()

        //#2
        .then(topics => {
          console.log("getAllTopics = " + topics);
          callback(null, topics);
        })
        .catch(err => {
          console.log("getAllTopics error: " + err);
          callback(err);
        })
    );
  },
  getTopic(id, callback) {
    console.log("getTopic ran");
    return Topic.findById(id, {
      include: [
        {
          model: Post,
          as: "posts"
        }
      ]
    })
      .then(topic => {
        console.log("getTopic = " + topic);
        callback(null, topic);
      })
      .catch(err => {
        console.log("getTopic error: " + err);
        callback(err);
      });
  },
  addTopic(newTopic, callback) {
    console.log("addTopic ran");
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
      .then(topic => {
        console.log("addTopic = " + topic);
        callback(null, topic);
      })
      .catch(err => {
        console.log("addTopic error: " + err);
        callback(err);
      });
  },
  deleteTopic(req, callback) {
    // #1
    return Topic.findById(req.params.id)
      .then(topic => {
        // #2
        const authorized = new Authorizer(req.user, topic).destroy();

        if (authorized) {
          // #3
          topic.destroy().then(res => {
            callback(null, topic);
          });
        } else {
          // #4
          req.flash("notice", "You are not authorized to do that.");
          callback(401);
        }
      })
      .catch(err => {
        callback(err);
      });
  },
  updateTopic(req, updatedTopic, callback) {
    // #1
    return Topic.findById(req.params.id).then(topic => {
      // #2
      if (!topic) {
        return callback("Topic not found");
      }

      // #3
      const authorized = new Authorizer(req.user, topic).update();

      if (authorized) {
        // #4
        topic
          .update(updatedTopic, {
            fields: Object.keys(updatedTopic)
          })
          .then(() => {
            callback(null, topic);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        // #5
        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    });
  }
};
