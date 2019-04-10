const api = new API();
const wordComplexTemplate = (word) => `

<section class="word-listing">
    <h3 class="name">${word.Word}</h3>
    <section>
      <p>${word.Meaning}</p>
      <p>${word.Example}</p>
    </section>
  <button data-update-button-id="${word.WordID}" class="updateBtn">Edit</button>
  <button data-delete-button-id="${word.WordID}" class="deleteBtn">Delete</button>
</section>
`;

const wordSimpleTemplate = (word) => `${word.Word}`;

const wordComponent = new Component('word', {word: {}});
wordComponent.view = function() {
  return wordTemplate(model.word);
};
wordComponent.controller = function() {
  api
    .getWord(router.params[1])
    .then(result => {
      model.word = result[0];
    }); 
}

const wordListComponent = new Component('wordsList', {wordList: []});
wordListComponent.view = function() {
    const wordsHTML = this.model.wordList.reduce((html, word) => html + `<li class="card">${wordSimpleTemplate(word)}</li>`, '');

    return `
      <ul id="listWords">
        ${wordsHTML}
      </ul>`;
     
};
wordListComponent.controller = function() {
    api
    .getWords()
    .then(result => {
        this.model.wordList = result;           
    })
    .catch(error => {
      console.log(error);
    });
        
}

export {wordComponent, wordListComponent};