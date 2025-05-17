const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Book Collection
let books = [
  { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
  { id: 2, title: 'Anne of the Green Gables', author: 'L.C. Page & Co. of Boston' },
  { id: 3, title: 'Baka Sakali', author: 'Jonaxx' },
];

// Welcome message
app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js and Express');
});

// GET (ALL BOOKS)
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET (BOOK BY ID)
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// POST (ADD NEW BOOK)
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PATCH (UPDATE A BOOK)
app.patch('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE A BOOK
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
