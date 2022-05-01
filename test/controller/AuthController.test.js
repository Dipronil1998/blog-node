const logger = require('../../src/utils/logger');
const request = require('supertest');
const app = require('../../config/app');
jest.setTimeout(60000);
const User = require('../../src/model/user');
const Otp = require('../../src/model/otp');
const message = require('../../config/constant');
const {userOne, setupDatabase} = require('../fixtures/db');

describe('POST /auth/signup', () => {
  beforeEach(setupDatabase);

  test('Create a User with valid input', async () => {
    const createUser = {
      name: 'Dipronil Das',
      email: 'dipronildas.net@gmail.com',
      password: 'Dip@12345',
      confirm_password: 'Dip@12345',
    };
    const response = await request(app).post('/auth/signup').send(createUser);
    expect(response.status).toEqual(201);
    expect(response.status).not.toEqual(200);
  });

  test('User Registration with mismacth password and confirm password', async () => {
    const createUser = {
      name: 'Test Example',
      email: 'test1@example.com',
      password: 'Dip@12345',
      confirm_password: 'Dip@12347',
    };
    const response = await request(app).post('/auth/signup').send(createUser);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(400);
    expect(jsonResponse.status).toEqual(false);
    expect(jsonResponse.message).toEqual(message.passwordMismatched);
    expect(response.status).not.toEqual(200);
  });

  test('User Registration with already register email', async () => {
    const createUser = {
      name: 'Test Example',
      email: 'test@example.com',
      password: 'Dip@12345',
      confirm_password: 'Dip@12345',
    };
    const response = await request(app).post('/auth/signup').send(createUser);
    const jsonResponse = JSON.parse(response.text);
    expect(response.status).toEqual(404);
    expect(jsonResponse.status).toEqual(false);
    expect(jsonResponse.message).toEqual('User Already Exists');
    expect(response.status).not.toEqual(200);
  });

  test('Verify User With Incorrect OTP', async () => {
    const id = (await User.find({email: 'dipronildas.net@gmail.com'}, '_id').exec())[0];
    const getCorrectOTP = (await Otp.find({'user_id': id}, 'OTP').exec())[0];
    const verifyOtp = {
      otp: 123456,
    };
    const response = await request(app).put('/auth/verifyotp/'+ id._id).send(verifyOtp);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.status).toEqual(false);
    expect(jsonResponse.message).toEqual('Your OTP is Invalid');
    expect(response.status).toEqual(404);
    expect(response.status).not.toEqual(201);
  });


  test('Verify User With Correct OTP', async () => {
    const id = (await User.find({email: 'dipronildas.net@gmail.com'}, '_id').exec())[0];
    const getCorrectOTP = (await Otp.find({'user_id': id}, 'OTP').exec())[0];
    const verifyOtp = {
      otp: getCorrectOTP.OTP,
    };
    const response = await request(app).put('/auth/verifyotp/'+ id._id).send(verifyOtp);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.message).toEqual(message.createSuccessfull);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Login With Correct Creendial', async () => {
    const loginData = {
      email: 'dipronildas.net@gmail.com',
      password: 'Dip@12345',
    };
    const response = await request(app).post('/auth/login').send(loginData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.message).toEqual(message.loginSuccessfully);
    expect(response.status).toEqual(200);
    expect(response.status).not.toEqual(201);
  });

  test('Login With Wrong Creendial', async () => {
    const loginData = {
      email: 'dipronildas.net@gmail.com',
      password: 'Dip@123456',
    };
    const response = await request(app).post('/auth/login').send(loginData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.message).toEqual(message.invalidCredientials);
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  test('Login With Not Verified Account', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'Dip@12345',
    };
    const response = await request(app).post('/auth/login').send(loginData);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.message).toEqual('Please Veriry Your Account');
    expect(response.status).toEqual(400);
    expect(response.status).not.toEqual(201);
  });

  afterAll(async () => {
    await User.deleteMany();
    await Otp.deleteMany();
  });
});
