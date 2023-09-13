// user controller unit tests

// need character model to test if creation and deletion has worked
const mongoose = require("mongoose");
const User = require("../../database/models/userModel");
const { createUser } = require("../userController");

// To tie up any test we'll want to close the connection to the database so Jest can exit
afterAll(() => {
  mongoose.connection.close();
  console.log("closed database connection");
});

const mReq = { body: { email: "test", username: "test", password: "test" } };
const mRes = { locals: {} };
const mNext = jest.fn();

describe("create user middleware", () => {
  it("should invoke the next function", async () => {
    mReq.body.email = `test${Date.now()}`;
    await createUser(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalled();
    // cleanup
    await User.deleteOne({ email: mReq.body.email });
  });

  it("should create a user with email equal to request body email", async () => {
    // generate unique email
    mReq.body.email = `test${Date.now()}`;
    // invoke createUser
    await createUser(mReq, mRes, mNext);
    // use model.findOne to check for created user based on email
    const foundUser = await User.findOne({ email: mReq.body.email });
    // expect the email to be found in database
    expect(foundUser.email).toEqual(mReq.body.email);
    // expect password to be hashed
    expect(foundUser.password).not.toEqual(mReq.body.password);
    // cleanup by deleting user from test dB
    await User.deleteOne({ email: mReq.body.email });
  });
});
