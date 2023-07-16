import { marginListChildTodo } from '../constants.js';

export default class DynamicHeightList {
   constructor(listSelector) {
      this.list = document.querySelector(listSelector);
      this.elementsOfList = Array.from(this.list.children);
   }

   getHeightOfAllChild() {
      return this.elementsOfList.reduce((height, element) => {
         return height + element.clientHeight + marginListChildTodo;
      }, 0);
   }

   init() {
      const heightList = this.getHeightOfAllChild();
      this.list.style.height = `${heightList}px`;
   }
}
