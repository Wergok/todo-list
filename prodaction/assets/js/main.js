import { FetchQuery } from "./components/FetchQuery.min.js";

const form = document.querySelector(".header__form");
const button = document.querySelector(".header__button");
const listTodo = document.querySelector(".todo__inner");

button.addEventListener("click", async (event) => {
   event.preventDefault();
   const formData = new FormData(form);
   const fetchQuery = new FetchQuery("server/newTodoItem.php", formData);
   const result = await fetchQuery.query();
   console.log(result);
   form.reset();

   listTodo.insertAdjacentHTML("beforeend", result)
});