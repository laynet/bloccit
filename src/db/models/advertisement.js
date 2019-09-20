"use strict";
module.exports = (sequelize, DataTypes) => {
  var Advertisement = sequelize.define(
    "Advertisement",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  Advertisement.associate = function(models) {
    // associations can be defined here
    Advertisement.hasMany(models.Banner, {
      foreignKey: "advertisementId",
      as: "banners"
    });
    Advertisement.hasMany(models.Rule, {
      foreignKey: "advertisementId",
      as: "rules"
    });
  };
  return Advertisement;
};
