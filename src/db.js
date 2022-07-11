import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5556/todo',
  {
    logging: true,
  }
);
