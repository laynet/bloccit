const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {
  beforeEach(done => {
    //#1
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then(res => {
      //#2
      Topic.create({
        title: "Best vampire movies that aren't scary",
        description: "A list of vampire movies that won't keep you up at night."
      })
        .then(topic => {
          this.topic = topic;
          //#3
          Post.create({
            title: "The funniest vampire movie is What We Do In The Shadows",
            body: "It's hilarous",
            //#4
            topicId: this.topic.id
          }).then(post => {
            this.post = post;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("#create()", () => {
    it("should create a topic object with a title and description", done => {
      //#1
      Topic.create({
        title:
          "The best art-house vampire movie is A Girl Walks Home Alone at Night",
        description:
          "It's in black and white and Persian so you'll need subtitles if you don't speak Persian"
      }).then(topic => {
        //#2
        expect(topic.title).toBe(
          "The best art-house vampire movie is A Girl Walks Home Alone at Night"
        );
        expect(topic.description).toBe(
          "It's in black and white and Persian so you'll need subtitles if you don't speak Persian"
        );
        done();
      });
    });
    it("should not create a tpoic with missing title or description", done => {
      Topic.create({
        title:
          "The best art-house vampire movie is A Girl Walks Home Alone at Night",
        description:
          "It's in black and white and Persian so you'll need subtitles if you don't speak Persian"
      })
        .then(topic => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Topic.title cannot be null");
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        });
    });
  });

  describe("#getPosts()", () => {
    it("should return the associated posts", done => {
      this.topic.getPosts().then(associatedPosts => {
        expect(associatedPosts[0].title).toBe(
          "The funniest vampire movie is What We Do In The Shadows"
        );
        done();
      });
    });
  });
});
