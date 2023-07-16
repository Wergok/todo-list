import Animation from "./Animation.js";
import { marginListChildTodo } from '../constants.js';

export default class AnimationSmoothAppearanceList extends Animation {
   constructor(animationName, elementSelector) {
      super(animationName, elementSelector);

      this.heightOfNewElement = this.element.offsetHeight;
      this.elementsOfList = Array.from(
         document.querySelectorAll(elementSelector)
      );
   }

   start() {
      super.start();

      this.elementsOfList.reduce((height, currentElement) => {
         currentElement.style.top = `${height}px`;
         return height + currentElement.offsetHeight + marginListChildTodo;
      }, 0);
   }
}
