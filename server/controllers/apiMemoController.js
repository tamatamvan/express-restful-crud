let Memo = require('../models/Memo.js');

let all = (req, res, next) => {
  Memo.find({}, (err, memos) => {
    if(err) {
      console.log(err);
    } else {
      res.json(memos);
    }
  });
}

let one = (req, res, next) => {
  Memo.findById(req.params.id, (err, memo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(memo);
    }
  });
}

let add = (req, res, next) => {
  Memo.create({
    title: req.body.title,
    message: req.body.message,
    createdAt: new Date(),
    updatedAt: new Date()
  }, (err, memo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(memo);
    }
  });
}

let edit = (req, res, next) => {
  Memo.findOneAndUpdate({
    _id: req.params.id
  },
  {
    title: req.body.title,
    message: req.body.message,
    createdAt: req.body.createdAt,
    updatedAt: new Date()
  }, {new: true}, (err, memo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(memo);
    }
  })
}

let destroy = (req, res, next) => {
  Memo.remove({
    _id: req.params.id
  }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Data deleted!')
    }
  })
}

module.exports = {
  all: all,
  one: one,
  add: add,
  edit: edit,
  destroy: destroy,
}
