console.log("books");
async function searchBooks(e) {
  e.preventDefault();
  // let bookName = document.getElementById("bookName").value;
  // const res = await axios.get("/books/api/name/" + bookName);
  // console.log(res);
}
//FUNCTION TO UPDATE A BOOK
async function updateBook(e) {
  console.log("update");
  e.preventDefault();
  // const _id = document.getElementById("_id");
  const bookName = document.getElementById("bookName").value;
  const bookAuther = document.getElementById("bookAuther").value;
  const language = document.getElementById("language").value;
  const data = { bookName, bookAuther, language };
  try {
    await axios.patch("/books/6067329c20b8b900e4b76b85", data);
  } catch (error) {
    console.log(error);
  }
}
const btnUpdateBook = document.getElementById("btnUpdateBook");
btnUpdateBook.addEventListener("click", updateBook);

const btnSearchBook = document.getElementById("btnSearchBook");
btnSearchBook.addEventListener("click", searchBooks);
