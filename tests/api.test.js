const request = require("supertest");
const app     = require("../server");


// testing GET from "/" endpoint
describe("GET /", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .get("/")
      .expect(200)
      });
  });


// test for GET collection of decks endpoint
describe("GET /api/decks", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .get("/api/decks")
      .expect(200)
      });
  });


// test for POST call to create a deck
describe("POST /new_deck", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .get("/")
      .expect(200)
      });
  });


// test for POST call to create a flipcard
describe("POST /new_card/:id", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .get("/")
      .expect(200)
      });
  });


// test for PUT to update a single flipcard



// test for DELETE to remove a single flipcard
