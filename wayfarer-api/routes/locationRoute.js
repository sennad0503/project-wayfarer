const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.location.index);
router.post('/', controllers.location.create);
router.get('/:id', controllers.location.show);
router.get('/getposts/:id', controllers.location.getPosts)
router.put('/:id', controllers.location.update);
// router.delete('/:id', controllers.location.remove);
module.exports = router
