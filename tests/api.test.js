const request = require("supertest");
const app     = require("../server");

// describe("GET /", function() {
//   test("should render successfully", function() {
//       return request(app)
//         .get("/")
//         .expect(200);
//   });
// });

describe("GET /api/bro", function() {
  test("should retrieve user id and username successfully", function() {
    return request(app)
      .get("/api/bro")
      .expect(200)
      .then(function(res) {
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
      });
  });
});
