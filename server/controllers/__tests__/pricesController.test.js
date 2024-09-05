const Prices = require("../../database/models/pricesModel");
const pricesController = require("../pricesController");
const mongoose = require("../../database").mongoose;
//jest.mock("mongoose");

// to create unit tests for prices controller, we want to mock the database behavior
// so that we can test the controller without actually interacting with the database

// to be tested:

// updatePrices
// createPrices
describe("pricesController", () => {
  // getPrices unit tests
  describe("getPrices", () => {
    it("returns prices for a user on the res.locals object", async () => {
      // create mock user and prices

      const testPrices = {
        username: "TestUser2",
        gold: 2,
        silver: 3,
        copper: 4,
      };
      // create mock request, response objects and next function
      const mReq = { query: "TestUser2" };
      const mRes = { locals: {} };
      const mNext = jest.fn();

      // create mock for prices model find
      const mockFind = jest.spyOn(Prices, "findOne");
      mockFind.mockResolvedValueOnce(testPrices);
      await pricesController.getPrices(mReq, mRes, mNext);
      expect(mRes.locals.prices).toEqual(testPrices);
    });
  });

  // TODO: updatePrices unit tests
  //   describe("updatePrices", () => {
  //     it("returns updated prices for a user on the res.locals object", async () => {
  //       // create mock user and prices

  //       const testPrices = {
  //         gold: 2,
  //         silver: 3,
  //         copper: 4,
  //       };

  //       const testUpdate = {
  //         gold: 3,
  //         silver: 3,
  //         copper: 4,
  //       }
  //       // create mock request, response objects and next function
  //       const mReq = { body: { username: "TestUser2", prices: testUpdate } };
  //       const mRes = { locals: {} };
  //       const mNext = jest.fn();

  //       // create mock for prices model updateOne
  //       const mockUpdateOne = jest.spyOn(Prices, "updateOne");
  //       mockUpdateOne.mockImplementationOnce(({username}, { $set: updates }) =>{
  //         if(username == )
  //       });
  //       // create mock for prices model findOne
  //       const mockFindOne = jest.spyOn(Prices, "findOne");
  //       mockFindOne.mockImplementationOnce(() => Promise.resolve(testPrices));

  //       await pricesController.updatePrices(mReq, mRes, mNext);
  //       expect(mRes.locals.prices.gold).toEqual(testPrices.gold+1);

  //     });
  //   });
  // TODO: createPrices unit tests
});
