'use strict'
let mongoose = require('mongoose');

let memoSchema = new mongoose.Schema({
  title: String,
  message: String,
},
{timestamps: true});

let memo = mongoose.model('memo', memoSchema)

module.exports = memo
