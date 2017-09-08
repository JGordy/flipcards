const request = require("supertest");
const app     = require("../server");


// testing GET from "/" endpoint
describe("GET /api", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .get("/api")
      .set({"Authorization": "Basic amdvcmR5Ompnb3JkeQ=="})
      .expect(200)
      });
  });


// test for GET collection of decks endpoint
describe("GET /api/decks", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .get("/api/decks")
      .set({"Authorization": "Basic amdvcmR5Ompnb3JkeQ=="})
      .expect(200)
      });
  });


// test for POST call to create a deck
describe("POST /new_deck", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .post("/new_deck")
      .set({"Authorization": "Basic amdvcmR5Ompnb3JkeQ=="})
      .type('form')
      .send({
        title: "Name",
        description: "Description"
      })
      .expect(200)
      });
  });


// test for POST call to create a flipcard
describe("POST /new_card/:id", function() {
  test("should receive status of 200 successfully", function() {
    return request(app)
      .post("/new_card/:id")
      .set({"Authorization": "Basic amdvcmR5Ompnb3JkeQ=="})
      .type('form')
      .send({
        name: "Name",
        description: "Description"
      })
      .expect(200)
      });
  });


// test for PUT to update a single flipcard



// test for DELETE to remove a single flipcard
