'use strict'
let mongoose = require('mongoose');

let memoSchema = new mongoose.Schema({
  title: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

let memo = mongoose.model('memo', memoSchema)

module.exports = memo
