import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import User from './User';

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      nullable: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      nullable: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      nullable: false,
      foreignKey: true,
    },
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: false,
  }
);

Project.belongsTo(User, {
  foreignKey: 'userId',
});

export default Project;
