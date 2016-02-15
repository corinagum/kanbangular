module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    priority : DataTypes.INTEGER,
    status : DataTypes.STRING,
    description: DataTypes.TEXT,
    assignedTo: DataTypes.STRING,
    createdBy : DataTypes.STRING,
    project : DataTypes.STRING,
    momentFinished : DataTypes.STRING,
    momentCreated : DataTypes.STRING,
    momentDue : DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.User);
      }
    }
  });

  return Task;
};