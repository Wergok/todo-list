export default class Animation {
   constructor(animationName, elementSelector) {
      this.animationName = animationName;
      this.element = document.querySelector(elementSelector);
   }

   #addAnimationClass() {
      this.element.classList.add(this.animationName);
   }

   #removeAnimationClass() {
      this.element.classList.remove(this.animationName);
   }

   start() {
      this.element.addEventListener("animationend", () => {
         this.#removeAnimationClass();
      });
      this.#addAnimationClass();
   }
}
