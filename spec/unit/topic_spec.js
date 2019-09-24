const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("..//../src/db/models").User;

describe("Post", () => {
  beforeEach(done => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      }).then(user => {
        this.user = user; //store the user

        Topic.create(
          {
            title: "Expeditions to Alpha Centauri",
            description:
              "A compilation of reports from recent visits to the star system.",

            posts: [
              {
                title: "My first visit to Proxima Centauri b",
                body: "I saw some rocks.",
                userId: this.user.id
              }
            ]
          },
          {
            include: {
              model: Post,
              as: "posts"
            }
          }
        ).then(topic => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        });
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
