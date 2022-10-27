import express from 'express';
import data from '../data.js';
import Service from '../models/serviceModel.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Service.deleteMany({});
  const createdServices = await Service.insertMany(data.services);
  await User.deleteMany({});
  const createdUser = await User.insertMany(data.users);
  res.send({ createdServices, createdUser });
});
export default seedRouter;
