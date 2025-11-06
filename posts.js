const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); // single('image')
const ctrl = require('../controllers/postController');

router.post('/', auth, upload.single('image'), ctrl.createPost);
router.get('/', ctrl.getFeed);
router.get('/:id', ctrl.getPost);
router.post('/:id/like', auth, ctrl.toggleLike);

module.exports = router;
