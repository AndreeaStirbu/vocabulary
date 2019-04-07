const api = new API();
const wordTemplate = (word) => `

<section class="word-listing">
  <a href="#/words/${word.WordID}">
    <h3 class="name">${word.Word}</h3>
    <section>
      <p>${word.Meaning}</p>
      <p>${word.Example}</p>
    </section>
  </a>
  <a href="#/words/update/${word.WordID}"><button data-update-button-id="${word.WordID}" class="updateBtn">Edit</button></a>
  <a href="#/words/delete/${word.WordID}"><button data-delete-button-id="${word.WordID}" class="deleteBtn">Delete</button></a>
</section>
`;

// app.addComponent({
//     name: 'word',
//     model: {
//         word: {}
//     },
//     view(model) {
      
//         return wordTemplate(model.word);
//     },
//     controller(model) {
//         api
//             .getWord(router.params[1])
//             .then(result => {
//                 model.word = result[0];
//             }); 
        
//     }
// });

const wordListComponent = new Component('wordsList', {wordList: []});
wordListComponent.view = function() {
    const wordsHTML = this.model.wordList.reduce((html, word) => html + `<li>${wordTemplate(word)}</li>`, '')
            return `
                <ul class = "words">
                    ${wordsHTML}
                </ul>
            `;
};
wordListComponent.controller = function() {
    api
    .getWords()
    .then(result => {
        this.model.wordList = result;           
    })
}

export default wordListComponent;