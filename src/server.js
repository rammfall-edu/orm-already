import fastify from './index';
import { sequelize } from './db';

(async () => {
  try {
    await sequelize.authenticate();
    await fastify.listen(3000);
  } catch (err) {
    console.log(err);
  }
})();
