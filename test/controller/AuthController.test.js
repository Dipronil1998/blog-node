const logger = require("../../src/utils/logger");
const request = require("supertest");
const app = require("../../config/app");
jest.setTimeout(60000);
const User = require('../../src/model/user')

describe("POST /auth/signup", () => {
  beforeEach(async() => {
    await User.deleteMany()
  });
  test("Create a User", async () => {
    const createUser = {
      name: "Dipronil Das",
      email: "dipronildas.net@gmail.com",
      password: "Dip@12345",
      confirm_password: "Dip@12345",
    };
    const response = await request(app).post("/auth/signup").send(createUser);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(201);
    expect(response.status).not.toEqual(200);
  });
});
