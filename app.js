/* eslint-disable func-names */

const formContainer = document.querySelector('#container');
const form = document.querySelector('#form');
const newBook = document.querySelector('#new-book');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close');
const bookshelf = document.querySelector('.bookshelf');
const books = JSON.parse(localStorage.getItem('books')) || [];
let formOpen = false;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

function formOpenOrClosed() {
  if (formOpen) {
    formContainer.style.transform = 'scale(0)';
    newBook.style.transform = 'rotate(0)';
    form.reset();
    overlay.style.opacity = 0;
    formOpen = false;
  } else {
    formContainer.style.transform = 'scale(1)';
    newBook.style.transform = 'rotate(45deg)';
    overlay.style.opacity = 1;
    formOpen = true;
  }
}

function closeModal() {
  formContainer.style.transform = 'scale(0)';
  overlay.style.opacity = 0;
  newBook.style.transform = 'rotate(0)';
  form.reset();
  formOpen = false;
}

function addBook(i) {
  const bookNode = document.createElement('div');
  bookNode.classList.add('book');
  bookNode.setAttribute('data-index', `${i}`);

  const title = document.getElementById('title').value;
  const titleNode = document.createElement('h2');
  titleNode.innerHTML = `Title: ${title}`;

  const author = document.getElementById('author').value;
  const authorNode = document.createElement('h3');
  authorNode.innerHTML = `Author: ${author}`;

  const pages = document.getElementById('pages').value;
  const pageNode = document.createElement('h3');
  pageNode.innerHTML = `Pages: ${pages}`;

  const read = document.getElementById('read').value;
  const readNode = document.createElement('h3');
  readNode.innerHTML = `Read the book? ${read}${read === 'Yes' ? '😃' : '😢'}`;

  const updateNode = document.createElement('button');
  updateNode.classList = 'update';
  updateNode.innerHTML = 'Update <i class=\'fas fa-pen\'></i>';

  const trashNode = document.createElement('button');
  trashNode.classList = 'trash';
  trashNode.innerHTML = 'Delete <i class=\'fas fa-trash-alt\'>';

  const book = new Book(title, author, pages, read);
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  bookNode.appendChild(titleNode);
  bookNode.appendChild(authorNode);
  bookNode.appendChild(pageNode);
  bookNode.appendChild(readNode);
  bookNode.appendChild(updateNode);
  bookNode.appendChild(trashNode);
  bookshelf.appendChild(bookNode);
  formOpenOrClosed();
  form.reset();

  updateNode.addEventListener('click', () => {
    if (readNode.innerHTML === 'Read the book? No😢') {
      readNode.innerHTML = 'Read the book? Yes😃';
      book.read = 'Yes';
      localStorage.setItem('books', JSON.stringify(books));
    } else {
      readNode.innerHTML = 'Read the book? No😢';
      book.read = 'No';
      localStorage.setItem('books', JSON.stringify(books));
    }
  });

  trashNode.addEventListener('click', () => {
    bookshelf.removeChild(bookNode);
    books.splice(bookNode, 1);
    localStorage.setItem('books', JSON.stringify(books));
  });
}

function getBooks() {
  books.forEach((book, i) => {
    const bookNode = document.createElement('div');
    bookNode.classList.add('book');
    bookNode.setAttribute('data-index', `${i}`);

    const titleNode = document.createElement('h2');
    titleNode.innerHTML = `Title: ${book.title}`;

    const authorNode = document.createElement('h3');
    authorNode.innerHTML = `Author: ${book.author}`;

    const pageNode = document.createElement('h3');
    pageNode.innerHTML = `Pages: ${book.pages}`;

    const readNode = document.createElement('h3');
    readNode.innerHTML = `Read the book? ${book.read}${
      book.read === 'Yes' ? '😃' : '😢'
    }`;

    const updateNode = document.createElement('button');
    updateNode.classList = 'update';
    updateNode.innerHTML = 'Update <i class=\'fas fa-pen\'></i>';

    const trashNode = document.createElement('button');
    trashNode.classList = 'trash';
    trashNode.innerHTML = 'Delete <i class=\'fas fa-trash-alt\'>';

    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    bookshelf.appendChild(bookNode);

    updateNode.addEventListener('click', () => {
      if (readNode.innerHTML === 'Read the book? No😢') {
        readNode.innerHTML = 'Read the book? Yes😃';
        book.read = 'Yes';
        localStorage.setItem('books', JSON.stringify(books));
      } else {
        readNode.innerHTML = 'Read the book? No😢';
        book.read = 'No';
        localStorage.setItem('books', JSON.stringify(books));
      }
    });

    trashNode.addEventListener('click', () => {
      bookshelf.removeChild(bookNode);
      books.splice(bookNode, 1);
      localStorage.setItem('books', JSON.stringify(books));
    });
  });
}

window.addEventListener('load', getBooks);
newBook.addEventListener('click', formOpenOrClosed);
closeButton.addEventListener('click', closeModal);
form.addEventListener('submit', (e, i) => {
  e.preventDefault();
  addBook(i);
});
