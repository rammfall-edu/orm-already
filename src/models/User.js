import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      nullable: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      nullable: false,
    },
    password: {
      type: DataTypes.STRING,
      nullable: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
