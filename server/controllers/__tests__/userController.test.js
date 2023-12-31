// user controller unit tests

// need character model to test if creation and deletion has worked
const { connection } = require("../../database").mongoose;
const User = require("../../database/models/userModel");
const { createUser, authUser } = require("../userController");

// To tie up any test we'll want to close the connection to the database so Jest can exit
afterAll(async () => {
  await connection.close();
});

const testUser = {
  email: "test2@test.test",
  username: "TestUser2",
  password: "test",
};
const mReq = { body: testUser };
const mRes = { locals: {} };
const mNext = jest.fn();

describe("create user middleware", () => {
  it("should invoke the next function", async () => {
    mReq.body.email = `test${Date.now()}`;
    mReq.body.username = `test${Date.now()}`;
    await createUser(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalled();
    // cleanup
    await User.deleteOne({ email: mReq.body.email });
  });

  it("should create a user with email equal to request body email", async () => {
    // generate unique email
    mReq.body.email = `test${Date.now()}`;
    mReq.body.username = `test${Date.now()}`;
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

  it("hashes the original password", async () => {
    // generate unique email
    mReq.body.email = `test${Date.now()}`;
    mReq.body.username = `test${Date.now()}`;

    // invoke createUser
    await createUser(mReq, mRes, mNext);
    // use model.findOne to check for created user based on email
    const foundUser = await User.findOne({ email: mReq.body.email });

    // expect password to be hashed
    expect(foundUser.password).not.toEqual(mReq.body.password);
    // cleanup by deleting user from test dB
    await User.deleteOne({ email: mReq.body.email });
  });

  it("should not allow creation of a duplicate user and instead invoke error handler", async () => {
    mReq.body.email = "test2@test.test";
    await createUser(mReq, mRes, mNext);
    // should call the next function to invoke global error handler
    // expect(mNext).toHaveBeenCalled();
    // expect(mNext.mock.lastCall[0]).toHaveProperty("error");
    expect(mRes.locals.user.auth).toEqual(false);
    expect(mRes.locals.user.username).toEqual(undefined);
    //expect(mNext.lastCall).toBeInstanceOf(Object);
  });
});

describe("user authentication middleware", () => {
  it("checks user password", async () => {
    mReq.body.email = "test2@test.test";

    await authUser(mReq, mRes, mNext);
    expect(mRes.locals.auth.auth).toEqual(true);
  });

  it("returns username when user password is correct, even if not provided", async () => {
    mReq.body.email = "test2@test.test";
    mReq.body.username = "TestUser2";
    await authUser(mReq, mRes, mNext);
    expect(mRes.locals.user.username).toEqual(testUser.username);
  });
});
