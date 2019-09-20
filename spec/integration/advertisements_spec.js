const request = require("request");
const server = require("../../src/server");
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

const base = "http://localhost:3000/advertisements/";

describe("routes : advertisements", () => {
  beforeEach(done => {
    this.advertisement;
    sequelize.sync({ force: true }).then(res => {
      Advertisement.create({
        title: "JS Frameworks",
        description: "There is a lot of them"
      })
        .then(advertisement => {
          this.advertisement = advertisement;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("GET /advertisements", () => {
    it("should return a status code 200", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisements");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });
  describe("GET /advertisements/new", () => {
    it("should render a new advertisement form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });
  describe("GET /advertisements/:id", () => {
    it("should render a view with the selected advertisement", done => {
      request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });
  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "advertisement 1",
        description: "advertisement 1 content"
      }
    };

    it("should create a new advertisement and redirect", done => {
      //#1
      request.post(
        options,

        //#2
        (err, res, body) => {
          // use the orm to get the record
          // http method call, to create a record in the controller
          // require the advertisement code
          Advertisement.findOne({ where: { title: "advertisement 1" } })
            .then(advertisement => {
              expect(res.statusCode).toBe(303);
              expect(advertisement.title).toBe("advertisement 1");
              expect(advertisement.description).toBe("advertisement 1 content");
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });
});
