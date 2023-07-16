import DynamicHeader from "./components/DynamicHeader.js";

const dynamicHeader = new DynamicHeader(".header");
dynamicHeader.start();

import FetchQuery from "./components/FetchQuery.min.js";
import AnimationSmoothAppearanceList from "./components/AnimationSmoothAppearanceList.min.js";
import DynamicHeightList from "./components/DynamicHeightList.js";

const form = document.querySelector(".header__form");
const button = document.querySelector(".header__button");
const listTodo = document.querySelector(".todo__list");
const createListChild = (html, listTodo) => {
   listTodo.insertAdjacentHTML("afterbegin", html);
   const dynamicHeightList = new DynamicHeightList(".todo__list");
   dynamicHeightList.init();
   const animation = new AnimationSmoothAppearanceList(
      "smoothAppearance",
      ".todo__list-item"
   );
   animation.start();
};
button.addEventListener("click", async (event) => {
   event.preventDefault();
   const formData = new FormData(form);
   const fetchQuery = new FetchQuery("server/newTodoItem.php", formData);
   const result = await fetchQuery.query();
   form.reset();
   createListChild(result, listTodo);
});
