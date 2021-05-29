import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123', 10),
    isAdmin: true,
  },
  {
    name: 'Dan',
    email: 'dan@example.com',
    password: bcrypt.hashSync('123', 10),
  },
  {
    name: 'Theo',
    email: 'theo@example.com',
    password: bcrypt.hashSync('123', 10),
  },
];

export default users;
