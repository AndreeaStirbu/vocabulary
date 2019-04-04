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
  <a href="#/words/update/${word.WordID}"><button data-update-button-id="${word.WordID}" class="btn-update">Edit</button></a>
  <a href="#/words/delete/${word.WordID}"><button data-delete-button-id="${word.WordID}" class="btn-delete">Delete</button></a>
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
        word: {},
        wordUpdate(id, word, def, example) {
            data = {
                "id": id,
                "word": word,
                "def": def,
                "example": example
            }
            fetch("http://localhost:3000/words/update", {
                method: 'PUT',
                body: JSON.stringify(data)
            })
        }
    },
    view(model) {
        update = function(event) {
            //alert('helloooo');
            event.preventDefault();
            form = document.getElementById('updateForm');
            model.wordUpdate(form.id.value, form.word.value, form.def.value, form.example.value);
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
        return ;                                                                                                                  
    },
    controller(model) {
        api
            .getWord(router.params[0])
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
router.addRoute('wordEdit', '^#/words/update/([0-9]*)$');

/** Word Update */
router.addRoute('wordDelete', '^#/words/delete/([0-9]*)$');

/** Word Add */
router.addRoute('wordAdd', '^#/words/add$');

// const updateCallback = function() {
//     var form = false;
//     var length = document.forms.length;
//     for(var i = 0; i < length; i++) {
//         if(form.id == "updateForm") {
//             form = document.forms[i];
//         }
//     }

//     id = form.id.value;
//     word =  form.word.value;
//     def =  form.def.value;
//     example =  form.example.value;

//     var button = document.getElementById("updateBtn");
//     button.onclick = function() {
//         api.updateWord(id, word, def, example)
//     }
// }