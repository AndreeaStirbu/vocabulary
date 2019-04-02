class API {
  

    constructor(){
        this.url = 'http://localhost:3000/words';
    }

   getWords() {
       return fetch(this.url)
       .then(res => res.json())
   }
   getWord(id) {
    return fetch(`${this.url}/${id}`)
    .then(res => res.json())
   }

  

   updateWord(id, word, def, example) {
    var formData = new FormData();
    formData.append('WordID', id);
    formData.append('Word', word);
    formData.append('Meaning', def);
    formData.append('Example', example);

    fetch(url, {
        method: 'PUT',
        body: formData
      })
   }

   
}