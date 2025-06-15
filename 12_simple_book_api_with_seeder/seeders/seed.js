const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('../models/User');
const Book = require('../models/Book');

const seed = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('🧹 Clearing existing users and books...');
    await User.deleteMany();
    await Book.deleteMany();

    const users = [];

    console.log('👤 Creating fake users...');
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = await User.create({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(user);
    }

    console.log('📚 Creating fake books...');
    for (let i = 0; i < 10; i++) {
      await Book.create({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.date.past({ years: 20 }).getFullYear(),
        userId: faker.helpers.arrayElement(users)._id,
      });
    }

    console.log('✅ Seeding complete!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    mongoose.disconnect();
  }
};

seed();
