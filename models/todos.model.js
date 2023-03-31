module.exports = (sequelize, Sequelize) => {
  const Todos = sequelize.define("todos", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN
    }
  });
  return Todos;
};