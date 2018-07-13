const { Profile, User } = require('../models');
const validateBody = require('../services/validateBody');

module.exports = {
  getProfile(req, res) {
    const { id } = req.params;

    Profile.findOne({ where: { id }, include: [{ model: User, attributes: ['login', 'email'], required: true }] })
      .then((userProfile) => {
        if (!userProfile) {
          return res.status(404).json({ message: `User not found with id ${id}` });
        }
        return res.status(200).json(userProfile);
      })
      .catch(error => res.status(404).json({ message: `Something went wrong with id ${id}, ${error}` }));
  },

  updateProfile(req, res) {
    if (!validateBody(req)) {
      return res.status(400).json({ message: 'Wrong request body' });
    }
    const { id } = req.params;

    return Profile.findById(id).then((userProfile) => {
      if (!userProfile) {
        return res.status(404).json({ message: `UserProfile with id ${id} not found.` });
      }

      return userProfile.update(req.body)
        .then(() => res.status(200).json({ message: 'UserProfile updated successfully.' }));
    })
      .catch(error => res.status(404).json({ message: `Something went wrong with id ${id}, ${error}` }));
  },

  removeProfile(req, res) {
    const { id } = req.params;

    Profile.findById(id)
      .then((userProfile) => {
        if (!userProfile) {
          return res.status(404).json({ message: `User not found with id ${id}` });
        }

        return userProfile.destroy()
          .then(() => res.status(200).end());
      })
      .catch(() => res.status(404).json({ message: `User not found with id ${id}` }));
  },

  changePassword(req, res) {
    const { id } = req.user;
    const { lastPassword, newPassword, repeatPassword } = req.body;

    return User.findById(id).then((user) => {
      if (!user) {
        return res.status(404).json(`User not found with id ${id}`);
      }
      if (!User.comparePassword(lastPassword, user.password)) {
        return res.status(404).json('Incorrect old password');
      }
      if (newPassword !== repeatPassword) {
        return res.status(404).json('Entered password does not match');
      }
      user.update({ password: User.generateHash(newPassword) });
      return res.status(200).json('Password successfully changed');
    });
  },
};
