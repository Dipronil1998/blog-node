const Post = require('../model/post');
const message = require('../../config/constant');
const fs = require('fs');

exports.create = async (req, res) => {
    try {
        console.log("AA");
        res.send("Aa")
    } catch (error) {
        console.log(error);
    }
}