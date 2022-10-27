import express from 'express';
import Service from '../models/serviceModel.js';

const serviceRouter = express.Router();

serviceRouter.get('/', async (req, res) => {
  const services = await Service.find();
  res.send(services);
});

serviceRouter.get('/slug/:slug', async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (service) {
    res.send(service);
  } else {
    res.status(404).send({ message: 'Service Not Found' });
  }
});
serviceRouter.get('/:id', async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    res.send(service);
  } else {
    res.status(404).send({ message: 'Service Not Found' });
  }
});

export default serviceRouter;
