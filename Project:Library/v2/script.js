const addBookButton = document.getElementById('addBookButton');
const addBookPopup = document.getElementById('addBookPopup');
const hero = document.getElementById('hero');

addBookButton.addEventListener('click', () => {
  addBookPopup.classList.toggle('dnone');
  hero.classList.toggle('dnone');
});

const closeForm = document.getElementById('closeForm');

closeForm.addEventListener('click', () => {
  addBookPopup.classList.toggle('dnone');
  hero.classList.toggle('dnone');
});

/* ***********************************************************************
                            Library System
********************************************************************** */
const Library = [];

/**
function Book(author, title, pages, hasRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.changeReadStatus = function () {
  this.hasRead = !this.hasRead;
};
*/

// Implementing using Classes

class Book {
  constructor(author, title, pages, hasRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  changeReadStatus() {
    this.hasRead = !this.hasRead;
  }
}

// ********************************************************************
// USING TEMPLATE TO CREATE BOOK ELEMENTS FROM LIBRARY ARRAY
// ********************************************************************
const template = document.getElementById('newBook');
const booksArea = document.getElementById('books');

let i = 0;

function createBookElements() {
  const e = Library[Library.length - 1];
  const cloneTemplate = template.content.cloneNode(true);
  const p = cloneTemplate.querySelectorAll('p');
  const b = cloneTemplate.querySelectorAll('button');
  const div = cloneTemplate.querySelector('.book');
  p[0].textContent = e.author;
  p[1].textContent = e.title;
  p[2].textContent = `${e.pages} pages`;

  if (e.hasRead) {
    b[0].classList.add('read');
    b[0].textContent = 'Read';
  } else {
    b[0].classList.add('notRead');
    b[0].textContent = 'Not Read';
  }

  div.setAttribute('data-num', i);
  i += 1;

  booksArea.appendChild(cloneTemplate);
}

function hasReadButton() {
  const readButtons = document.querySelectorAll('.hasRead');
  const last = readButtons[readButtons.length - 1];
  last.addEventListener('click', () => {
    const selectedBookNum = parseInt(
      last.parentNode.getAttribute('data-num'),
      10
    );
    const selectedBook = Library[selectedBookNum];
    selectedBook.changeReadStatus();
    console.log(selectedBook);

    last.classList.toggle('notRead');
    last.classList.toggle('read');
    if (last.classList.contains('notRead')) {
      last.textContent = 'Not Read';
    } else {
      last.textContent = 'Read';
    }
  });
}

function removeButton() {
  const removeButtons = document.querySelectorAll('.remove');
  const last = removeButtons[removeButtons.length - 1];
  last.addEventListener('click', () => {
    const name = last.parentNode.querySelectorAll('p')[1].value;
    const index = Library.findIndex((book) => book.name === name);

    Library.splice(index, 1);
    booksArea.removeChild(last.parentNode);
  });
}

/* ****************************************************
 Retrieve data from the form and push to Library
 ***************************************************** */

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const book = new Book(author, title, pages, read);

  Library.push(book);
  createBookElements();
  hasReadButton();
  removeButton();
  form.reset();
});
