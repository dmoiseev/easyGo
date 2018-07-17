module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        city() {
          if (this.city !== 'Kharkiv') {
            throw new Error('This app is only for people from Kharkiv');
          }
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: ['^[a-z]+$', 'i'],
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          arg: ['male', 'female'],
          msg: 'Must be male or female',
        },
      },
    },
    birthday: DataTypes.DATEONLY,
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },

  }, {
    timestamps: true,
    paranoid: true,
    hooks: {
      afterDestroy: (profile) => {
        sequelize.models.User
          .findById(profile.userId)
          .then(value => value.destroy());
      },
      beforeValidate: (profile) => {
        profile.firstName = 'Ringo';
      },
      afterValidate: (profile) => {
        if (profile.country[0] !== profile.country[0].toUpperCase()) {
          throw new Error('');
        }
      },
    },
    validate: {
      FirstOrLastName() {
        if ((this.firstName === null) && (this.lastName === null)) {
          throw new Error('need input firstName or LastName');
        }
      },
    },
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Profile;
};
