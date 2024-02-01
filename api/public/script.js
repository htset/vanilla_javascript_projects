const addBookFormEl = document.getElementById('addBookForm');
const authorInputEl = document.getElementById('author');
const titleInputEl = document.getElementById('title');
const pagesInputEl = document.getElementById('pages');
const booksListEl = document.getElementById('books');

// Fetch all books and display them on the list
async function fetchBooks() {
  const response = await fetch('/api/books');
  const books = await response.json();

  // Clear the existing book list
  booksListEl.innerHTML = '';

  // Fill the book list
  books.forEach(book => {
    const listItem = document.createElement('li');
    listItem.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;

    // Add a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
      // Make a DELETE request to remove the book
      await fetch(`/api/books/${book._id}`, {
        method: 'DELETE',
      });

      // Fetch the updated list of books after deletion
      await fetchBooks();
    });

    listItem.appendChild(deleteButton);
    booksListEl.appendChild(listItem);
  });
}

// Event haNdler for adding a new book
const submitForm = async (event) => {
  event.preventDefault();

  const author = authorInputEl.value;
  const title = titleInputEl.value;
  const pages = parseInt(pagesInputEl.value);

  // Make a POST request to add a new book
  await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ author, title, pages }),
  });

  // Clear the form and fetch the updated list of books
  addBookFormEl.reset();
  await fetchBooks();
}

addBookFormEl.addEventListener('submit', submitForm);

fetchBooks().then();