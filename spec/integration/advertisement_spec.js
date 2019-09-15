const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement/";

describe("routes : advertisement", () => {
  describe("GET /advertisement", () => {
    it("should return a status code 200", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
  describe("POST /advertisement/create", () => {
    it("should create a new advertisement", done => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Advertisement 1",
          description: "Advertisement 1 content"
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Advertisement.findOne({
          where: { title: "Advertisement 1" }
        }).then(advertisement => {
          expect(advertisement.title).toBe("Advertisement 1");
          done();
        });
      });
    });
  });
});
