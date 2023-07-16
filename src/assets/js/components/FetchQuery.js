export default class FetchQuery {
   constructor(url, formData) {
      this.url = url;
      this.formData = formData;
   }

   async query() {
      const response = await fetch(this.url, {
         method: "post",
         body: this.formData,
      });

      if (response.ok) {
         const result = await response.json();
         return result.message;
      } else {
         return false;
      }
   }
}
