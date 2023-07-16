export default class DynamicHeader {
   constructor(headerSelector) {
      this.header = document.querySelector(headerSelector);
   }

   getPositionScroll() {
      return window.scrollY || document.documentElement.scrollTop;
   }

   isScrollDown() {
      return this.positionScrollY < this.getPositionScroll() ? true : false;
   }

   isClassHidden() {
      return this.header.classList.contains("hiddenHeader");
   }

   start() {
      window.addEventListener("scroll", () => {
         if (this.isScrollDown() && !this.isClassHidden()) {
            this.header.classList.add("hiddenHeader");
         } else if (!this.isScrollDown() && this.isClassHidden()) {
            this.header.classList.remove("hiddenHeader");
         }
         this.positionScrollY = this.getPositionScroll();
      });
   }
}
