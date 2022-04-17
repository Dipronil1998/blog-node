const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/model/user');

const userOne = {
    // _id: new mongoose.Types.ObjectId(),
    name: 'Dip Das',
    email: 'test@example.com',
    password: '56what!!',
}


const setupDatabase = async () => {
    await new User(userOne).save();
}

module.exports = {
    userOne,
    setupDatabase
}