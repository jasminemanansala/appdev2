const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const authRoutes = require('./routes/signin-signup-auth');
const authenticateToken = require('./middleware/middleware-auth');
const User = require('./models/User');

dotenv.config();
const app = express();
app.use(express.json());
const port = 3000;

app.use('/api/auth', authRoutes);
app.use('/api/books', authenticateToken);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js, Express and MongoDB');
});

app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Hide password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const sendEmail = require('./middleware/send-email.middleware');

app.post('/api/books', async (req, res) => {
  const { title, author, year } = req.body;
  const newBook = new Book({ title, author, year });
  try {
    const savedBook = await newBook.save();
    await sendEmail(savedBook);
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.patch('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
