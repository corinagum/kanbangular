module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    priority : DataTypes.INTEGER,
    status : DataTypes.STRING,
    description: DataTypes.TEXT,
    assignedTo: DataTypes.STRING,

  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.User);
      }
    }
  });

  return Task;
};