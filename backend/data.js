import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Yakoob',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      roleName: 'admin',
    },
    {
      name: 'Hamad',
      email: 'provider@example.com',
      password: bcrypt.hashSync('123456'),
      roleName: 'provider',
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      roleName: 'user',
    },
  ],

  services: [
    {
      // _id: '1',
      name: 'Leaks maintenance',
      slug: 'Leaks-maintenance',
      category: 'plumbing',
      image: '/images/p1.jpg',
      price: 1000,
      countInAvailable: 10,
      provider: 'John',
      rating: 4.5,
      numReviews: 10,
      discription: 'Professional and high-quality maintenance of leaks',
    },
    {
      //_id: '2',
      name: 'Drain blockage maintenance',
      slug: 'drain-blockage-maintenance',
      category: 'plumbing',
      image: '/images/p2.jpg',
      price: 500,
      countInAvailable: 20,
      provider: 'Savy',
      rating: 3.5,
      numReviews: 25,
      discription: 'Professional and high-quality maintenance',
    },
    {
      // _id: '3',
      name: 'Kitchen maintenance',
      slug: 'kitchen-maintenance',
      category: 'Kitchen',
      image: '/images/p3.jpg',
      price: 800,
      countInAvailable: 0,
      provider: 'Khalid',
      rating: 3.0,
      numReviews: 2,
      discription: 'Professional and high-quality maintenance',
    },
    {
      // _id: '4',
      name: 'Faucets maintenance',
      slug: 'faucets-maintenance',
      category: 'plumbing',
      image: '/images/p4.jpg',
      price: 200,
      countInAvailable: 30,
      provider: 'Ahmed',
      rating: 5,
      numReviews: 30,
      discription: 'Professional and high-quality maintenance',
    },
  ],
};

export default data;
