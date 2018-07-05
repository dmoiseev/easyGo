const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 15],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 15],
      },
    },
  });
  User.associate = (models) => {
    // associations can be defined here
  };
  User.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  User.comparePassword = (candidatePassword, hash) => {
    return bcrypt.compareSync(candidatePassword, hash);
  };
  return User;
};
