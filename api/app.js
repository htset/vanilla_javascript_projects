const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/books');

// Define a Book model
const Book = mongoose.model('Book', {
  author: String,
  title: String,
  pages: Number
});

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    console.log(books);
    res.json(books);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } 
  catch (error) {
    res.status(404).json({ error: 'Book not found' });
  }
});

// POST a new book
app.post('/api/books', async (req, res) => {
  const { author, title, pages } = req.body;
  console.log(req.body);

  try {
    const newBook = new Book({ author, title, pages });
    await newBook.save();
    console.log(newBook);
    res.json(newBook);
  } 
  catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT/update a specific book by ID
app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await 
      Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } 
  catch (error) {
    res.status(404).json({ error: 'Book not found' });
  }
});

// DELETE a specific book by ID
app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }  
});

// Catch-all route to serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
