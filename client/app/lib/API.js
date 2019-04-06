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
        data = {
            "id": id,
            "word": word,
            "def": def,
            "example": example
        }
        fetch("http://localhost:3000/words/update", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
   }

   deleteWord(id) {
        data = {"id": id}
        fetch("http://localhost:3000/words/delete", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
   }

   
}