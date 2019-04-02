const app = new App('#app');
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
  <a href="#/words/${word.WordID}/update"><button data-update-button-id="${word.WordID}" class="btn-update">Edit</button></a>
  <a href="#/words/${word.WordID}/delete"><button data-delete-button-id="${word.WordID}" class="btn-delete">Delete</button></a>
</section>
`;

app.addComponent({
    name: 'home',
    model: {},
    view(model){
        return `<a href = "#/words"><h1>List of words</h1></a>
                <a href = "#/words/add"><button>Add a word</button></a>`
    },
    controller(model){}
})

app.addComponent({
    name: 'words',
    model: {
        words: []
    },
    view(model) {
        const wordsHTML = model.words.reduce((html, word) => html + `<li>${wordTemplate(word)}</li>`, '')
        return `
            <ul class = "words">
                ${wordsHTML}
            </ul>
        `;
    },
    controller(model) {
        api
            .getWords()
            .then(result => {
                model.words = result;
                // model.words.forEach(element => {
                //     editBtn = document.querySelector(`[data-update-button-id="${element.WordID}"]`);

                //     editBtn.addEventListener('click', e => {});
                // })
           
            })
    }
});


app.addComponent({
    name: 'word',
    model: {
        word: {}
    },
    view(model) {
      
        return wordTemplate(model.word);
    },
    controller(model) {
        api
            .getWord(router.params[1])
            .then(result => {
                model.word = result[0];
            }); 
            
    }
});

app.addComponent({
    name: 'wordAdd',
    model: {
        word: {}
    },
    view(model) {
        return `<form action="http://localhost:3000/words/add" method="post">
            <input type = "text" name= "id" value= "" >
            <input type = "text" name = "word" value ="">
            <button>Update<button>
        </form>`;                                                                                                                  
    },
    controller(model) {
        api
            .getWord(router.params[1])
            .then(result => {
                model.word = result[0];
            });                                          
    }
});

app.addComponent({
    name: 'wordEdit',
    model: {
        word: {}
    },
    view(model) {
        return ;                                                                                                                  
    },
    controller(model) {
        api
            .getWord(router.params[1])
            .then(result => {
                model.word = result[0];
            });                                          
    }
});

app.addComponent({
    name: 'wordDelete',
    model: {
        word: {}
    },
    view(model) {
        return ;                                                                                                                  
    },
    controller(model) {
        api
            .getWord(router.params[1])
            .then(result => {
                model.word = result[0];
            });                                          
    }
});


const router = new Router(app);
/** Home */
router.addRoute('home', '/index');

/** List of Words */
router.addRoute('words', '^#/words$');

/** Word review */
router.addRoute('word', '^#/words/([0-9]*)$');

/** Word Update */
router.addRoute('wordEdit', '^#/words/([0-9]*/update)$');

/** Word Update */
router.addRoute('wordDelete', '^#/words/([0-9]*/delete)$');

/** Word Add */
router.addRoute('wordAdd', '^#/words/add$');


