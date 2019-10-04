const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Authorizer = require("../policies/post");

module.exports = {
  addPost(req, newPost, callback) {
    console.log("queries.post addPost ran");
    // const authorized = new Authorizer(req.user).create();
    // if (authorized) {
    return Post.create(newPost)
      .then(post => {
        callback(null, post);
      })
      .catch(err => {
        console.log("queries.posts addPost err: ", err);
        callback(err);
        console.log("QUERIES>POSTS ERROR:", err);
      });
    // } else {
    //   req.flash("notice", "You are not authorized to do that.");
    //   callback(401);
    // }
  },
  getPost(id, callback) {
    return Post.findById(id)
      .then(post => {
        callback(null, post);
      })
      .catch(err => {
        callback(err);
      });
  },
  deletePost(req, callback) {
    const authorized = new Authorizer(req.user).destroy();
    if (authorized) {
      return Post.destroy({
        where: { id }
      })
        .then(deletedRecordsCount => {
          callback(null, deletedRecordsCount);
        })
        .catch(err => {
          callback(err);
        });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      callback(401);
    }
  },
  updatePost(req, updatedPost, callback) {
    const authorized = new Authorizer(req.user).update();
    if (authorized) {
      return Post.findById(id).then(post => {
        if (!post) {
          return callback("Post not found");
        }

        post
          .update(updatedPost, {
            fields: Object.keys(updatedPost)
          })
          .then(() => {
            callback(null, post);
          })
          .catch(err => {
            callback(err);
          });
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      callback(401);
    }
  }
};
