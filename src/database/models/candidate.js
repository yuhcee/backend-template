
('use strict');
module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define(
    'Candidate',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      phone: DataTypes.STRING,
      level: {
        type: DataTypes.ENUM,
        values: ['entry', 'experienced'],
        allowNull: false,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {}
  );
  Candidate.associate = function (models) {
    // associations can be defined here
    const { Personal, Work } = models;
    Candidate.hasOne(Personal);
    Candidate.hasOne(Work);
  };

  
  return Candidate;
};