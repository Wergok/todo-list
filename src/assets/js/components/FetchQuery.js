// import { mainPath } from "./constants.js";

export class FetchQuery {
   constructor(url, formData) {
      this.url = url;
      this.formData = formData;
      for (const value of formData.values()) {
         console.log(value);
      }
   }

   async query() {
      const response = await fetch(this.url, {
         method: "post",
         body: this.formData,
         // headers: {
         //    "Content-Type": "application/x-www-form-urlencoded",
         // },
      });

      if (response.ok) {
         const result = await response.json();
         return result.message;
      } else {
         return false;
      }
   }
}
