let express = require('express');
let router = express.Router();
let api_memo = require('../controllers/apiMemoController');

/* GET users listing. */
router.get('/', api_memo.all);
router.post('/', api_memo.add);
router.put('/:id', api_memo.edit);
router.delete('/:id', api_memo.destroy);
module.exports = router;
