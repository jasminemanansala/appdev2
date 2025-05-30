const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const authRoutes = require('./routes/signin-signup-auth');
const authenticateToken = require('./middleware/middleware-auth');

dotenv.config();
const app = express();
app.use(express.json());
const port = 3000;

// Public auth routes and authentication to all book routes

app.use('/api/auth', authRoutes);
app.use('/api/books', authenticateToken);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Welcome Route
app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js, Express and MongoDB');
});

// GET all books
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET one book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// POST create a new book
app.post('/api/books', async (req, res) => {
  const { title, author } = req.body;
  const newBook = new Book({ title, author });
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update a book
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

// DELETE a book
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
