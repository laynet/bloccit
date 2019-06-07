"use strict";
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define(
    "Rule",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      topicId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Topics",
          key: "id"
        }
      }
    }
  );
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreingkey: "topicId",
      onDelete: "Cascade"
    });
  };
  return Rule;
};
