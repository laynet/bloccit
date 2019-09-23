const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {
  beforeEach(done => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({ force: true }).then(res => {
      //#1
      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      }).then(topic => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id
        })
          .then(post => {
            this.post = post;

            Flair.create({
              name: "smol cat",
              color: "white",
              postId: this.post.id
            }).then(flair => {
              this.flair = flair;
            });
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe("GET /posts/:postId/flairs/new", () => {
    it("should render a new flair form", done => {
      request.get(`${base}/${this.post.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });
  });
  describe("POST /posts/:postId/flairs/create", () => {
    it("should create a new post and redirect", done => {
      const options = {
        url: `${base}/${this.post.id}/flairs/create`,
        form: {
          name: "smol cat",
          color: "white"
        }
      };
      request.post(options, (err, res, body) => {
        Flair.findOne({ where: { name: "smol cat" } })
          .then(flair => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe("smol cat");
            expect(flair.color).toBe("white");
            expect(flair.postId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
});
