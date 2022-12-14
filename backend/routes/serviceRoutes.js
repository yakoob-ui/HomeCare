import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';
import { isAuth } from '../utils.js';

const serviceRouter = express.Router();

serviceRouter.get('/', async (req, res) => {
  const services = await Service.find();
  res.send(services);
});

serviceRouter.get(
  '/admin',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const user_id = query.user_id || '';
    const user_filter = user_id && user_id !== 'all' ? { user_id } : {};

    const services = await Service.find(user_filter)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countServices = await Service.countDocuments();
    res.send({
      services,
      countServices,
      page,
      pages: Math.ceil(countServices / pageSize),
    });
  })
);

serviceRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newService = new Service({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      category: 'sample category',
      image: '/images/p1.jpg',
      price: 0,
      countInAvailable: 0,
      provider: 'sample provider',
      rating: 0,
      numReviews: 0,
      discription: 'sample description',
    });
    const service = await newService.save();
    res.send({ message: 'Service Created', service });
  })
);

serviceRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (service) {
      service.name = req.body.name;
      service.slug = req.body.slug;
      service.price = req.body.price;
      service.image = req.body.image;
      service.category = req.body.category;
      service.provider = req.body.provider;
      service.countInAvailable = req.body.countInAvailable;
      service.discription = req.body.discription;
      service.user_id = req.body.user_id;
      await service.save();
      res.send({ message: 'Service Updated' });
    } else {
      res.status(404).send({ message: 'Service Not Found' });
    }
  })
);

serviceRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (service) {
      await service.remove();
      res.send({ message: ' Service Deleted' });
    } else {
      res.status(404).send({ message: 'Service Not Found' });
    }
  })
);

const PAGE_SIZE = 3;
serviceRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };
    const dbQuery = {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    };
    const services = await Service.find(dbQuery)
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countServices = await Service.countDocuments(dbQuery);
    res.send({
      services,
      countServices,
      page,
      pages: Math.ceil(countServices / pageSize),
    });
  })
);

serviceRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Service.find().distinct('category');
    res.send(categories);
  })
);

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
