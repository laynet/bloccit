const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";

describe("routes : advertisements", () => {
  describe("GET /advertisements", () => {
    it("should return a status code 200", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
  describe("GET /advertisements/new", () => {
    it("should render a new advertisement form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New advertisement");
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
