const api = new API();
const template = `<form action="http://localhost:3000/words/add" method="post">
<input type = "text" name= "id" value= "" >
<input type = "text" name = "word" value ="">
<button>Update<button>
</form>`

const buttonTemplate = `<button id="addBtn">Add Word</button>`;

const addWordComponent = new Component('addForm', {word: {}});
addWordComponent.view = function() {
    return template;
}

const addBtnComponent = new Component('addButton', {});
addBtnComponent.view = function() {
    return buttonTemplate;
}

export {addWordComponent, addBtnComponent};