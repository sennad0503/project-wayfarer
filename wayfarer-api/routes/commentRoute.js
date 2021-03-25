const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.comment.index);
router.post('/', controllers.comment.create);
router.get('/:id', controllers.comment.show);
router.put('/:id', controllers.comment.update);
router.delete('/:id', controllers.comment.remove);

module.exports = router
