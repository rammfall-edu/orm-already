import Fastify from 'fastify';

import User from './models/User';
import { hash } from 'bcrypt';
import Project from './models/Project';

const fastify = Fastify({
  logger: true,
});

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/user/create', async (request, reply) => {
  const { email, password } = request.body;

  if (await User.findOne({ where: { email } })) {
    return reply.status(400).send({ info: 'user already exist' });
  }

  const user = new User();
  user.email = email;
  user.password = await hash(password, 10);

  await user.save();

  return reply.send({ email, id: user.id });
});

fastify.get('/users', async (request, reply) => {
  reply.send(await User.findAll());
});

fastify.put('/users/:id', async (request, reply) => {
  const {
    params: { id },
    body: { email, password },
  } = request;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return reply.status(400).send({ info: 'user already not exist' });
  }

  user.email = email;
  user.password = await hash(password, 10);

  await user.save();

  return reply.send({ info: 'updated' });
});

fastify.post('/project/create', async (request, reply) => {
  const { name, description, id } = request.body;

  const project = new Project();

  project.userId = id;
  project.name = name;
  project.description = description;

  await project.save();

  reply.send(project);
});

fastify.get('/projects/:id', async (request, reply) => {
  reply.send(await Project.findAll({ where: { userId: request.params.id } }));
});

export default fastify;
