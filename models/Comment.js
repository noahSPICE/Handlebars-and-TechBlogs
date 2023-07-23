const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Comment extends Model {}
  

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    commentText: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "comment",
  }
);

module.exports = Comment;