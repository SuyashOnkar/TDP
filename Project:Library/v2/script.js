const addBookButton = document.getElementById("addBookButton");
const addBookPopup = document.getElementById("addBookPopup");
const hero = document.getElementById("hero");
const bookContainer = document.getElementById("books");

addBookButton.addEventListener("click", () => {
  addBookPopup.classList.toggle("dnone");
  hero.classList.toggle("dnone");
});

const closeForm = document.getElementById("closeForm");

closeForm.addEventListener("click", () => {
  addBookPopup.classList.toggle("dnone");
  hero.classList.toggle("dnone");
});

/************************************************************************ 
                            Library System
************************************************************************/
Library = [];

function Book(author, title, pages, hasRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.hasRead = hasRead;
}

/*****************************************************
 Retrieve data from the form and push to Library
 *****************************************************/
const submitBook = document.getElementById("submitBook");
const form = document.querySelector("form");

//Initialize count to 0 (to tag the books)
let count = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const book = new Book(author, title, pages, read);

  Library.push(book);
  createBookElements();
  hasReadButton();
  form.reset();
});

// ********************************************************************
// USING TEMPLATE TO CREATE BOOK ELEMENTS FROM LIBRARY ARRAY
// ********************************************************************
function createBookElements() {
  const template = document.getElementById("newBook");
  const books_area = document.getElementById("books");
  let e = Library[Library.length - 1];
  const clone_template = template.content.cloneNode(true);
  const p = clone_template.querySelectorAll("p");
  const b = clone_template.querySelectorAll("button");
  p[0].textContent = e.author;
  p[1].textContent = e.title;
  p[2].textContent = e.pages + " pages";

  if (e.hasRead) {
    b[0].classList.add("read");
    b[0].textContent = "Read";
  } else {
    b[0].classList.add("notRead");
    b[0].textContent = "Not Read";
  }

  books_area.appendChild(clone_template);
}

function hasReadButton() {
  const readButtons = document.querySelectorAll(".hasRead");
  Array.from(readButtons).forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.toggle("notRead");
      e.classList.toggle("read");
      if (e.classList.contains("notRead")) {
        e.textContent = "Not Read";
      } else {
        e.textContent = "Read";
      }
    });
  });
}
