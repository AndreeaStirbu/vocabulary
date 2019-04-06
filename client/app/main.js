const app = new Component('#app');
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
        update = function(event) {
            event.preventDefault();
            form = document.getElementById('updateForm');
            api.updateWord(form.id.value, form.word.value, form.def.value, form.example.value);
        }

        return `<form id="updateForm" onsubmit="return update(event)">
            <input name="id" value=${model.word.WordID}></input>
            <label>Word</lable>
            <input name="word" value =""></input>
            <label>Meaning</lable>
            <input name="def" value=""></input>
            <label>Example</lable>
            <input name="example" value=""></input>
            <input type="submit" id="updateBtn" value="Update"></input>
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
    name: 'wordDelete',
    model: {
        word: {}
    },
    view(model) {
        return api.wordDelete(model.word.WordID);                                                                                                                  
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

/** List of Words */
router.addRoute('words', '^#/words$');

/** Word review */
router.addRoute('word', '^#/words/([0-9]*)$');

/** Word Update */
router.addRoute('wordEdit', '^#/words/update/([0-9]*)$');

/** Word Update */
router.addRoute('wordDelete', '^#/words/delete/([0-9]*)$');

/** Word Add */
router.addRoute('wordAdd', '^#/words/add$');