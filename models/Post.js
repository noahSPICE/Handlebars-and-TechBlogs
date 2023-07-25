const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Post extends Model {}
  

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
  },
  {
    sequelize,
    modelName: "post",
  }
);

module.exports = Post;