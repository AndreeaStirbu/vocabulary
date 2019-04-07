const api = new API();
const editWordComponent = new editWordComponent('editForm', {word: {}});

editWordComponent.view = function() {
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
}
editWordComponent.controller = function() {
    api
        .getWord(router.params[1])
        .then(result => {
            model.word = result[0];
        });  
}

export default editWordComponent;