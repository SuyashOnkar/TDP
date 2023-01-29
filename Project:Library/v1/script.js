const addBookButton = document.getElementById("addBook");
const overlayElem = document.getElementById("overlay");
const addBookForm = document.getElementById("addBookForm");
const bookContainer = document.getElementById("books");

/*Method to close box when clicking out of the div 

https://stackoverflow.com/questions/34621987/check-if-clicked-element-is-descendant-of-parent-otherwise-remove-parent-elemen

2 Methods 

*/

// document.addEventListener("click", (e) => {
//   console.log(e.target.parentNode);

//   if (
//     addBookForm.classList.contains("display") &&
//     e.target != addBookForm &&
//     !addBookForm.contains(e.target)
//   ) {
//     overlayElem.classList.remove("overlay");
//     addBookForm.classList.remove("display");
//   } else {
//     if (e.target == addBookButton) {
//       overlayElem.classList.add("overlay");
//       addBookForm.classList.add("display");
//     }
//   }
// });

document.addEventListener("click", (e) => {
  if (
    addBookForm.classList.contains("display") &&
    !e.target.matches("#addBookForm,#addBookForm *")
  ) {
    overlayElem.classList.remove("overlay");
    addBookForm.classList.remove("display");
  } else {
    if (e.target == addBookButton) {
      overlayElem.classList.add("overlay");
      addBookForm.classList.add("display");
    }
  }
});

/*Library System */

let library = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  let read = false;
  if (document.getElementById("read").checked) {
    read = true;
  }

  const book = new Book(author, title, pages, read);
  library.push(book);
}

function displayBook() {
  let b = library[library.length - 1];
  const book = document.createElement("div");
  book.classList.add("book");
  book.innerHTML =
    "<h5>" +
    b.author +
    "</h5>" +
    "<h4>" +
    b.title +
    "</h4>" +
    "<p>" +
    b.pages +
    " pages" +
    "</p>" +
    "<p>" +
    b.read +
    "</p>" +
    '<button class="delete" id="delete"><span class="material-symbols-outlined">delete</span></button>';

  bookContainer.append(book);
}

// Delete
function trash() {
  const trashButtons = document.getElementsByClassName("delete");
  Array.from(trashButtons).forEach((e) => {
    e.addEventListener("click", (elem) => {
      elem.target.parentElement.parentElement.remove();
    });
  });
}

// Read Status
function readStatus() {
  const readCheckboxes = document.getElementsByClassName("checkRead");
  Array.from(readCheckboxes).forEach((e) => {
    if (e.checked) {
    }
  });
}

const submitBook = document.getElementById("submitBook");

submitBook.addEventListener("click", () => {
  addBookToLibrary();
  overlayElem.classList.remove("overlay");
  addBookForm.classList.remove("display");
  displayBook();
  trash();
});
