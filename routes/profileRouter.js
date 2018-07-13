const express = require('express');
const controller = require('../controllers/profileController');
const auth = require('../middlewares/checkAuthentication');

const router = express.Router();

router.route('/profile/password')
  .get((req, res) => res.render('password'))
  .post(controller.changePassword);

router.route('/:id/profile')
  .get(auth, controller.getProfile)
  .put(auth, controller.updateProfile)
  .delete(auth, controller.removeProfile);


module.exports = router;
