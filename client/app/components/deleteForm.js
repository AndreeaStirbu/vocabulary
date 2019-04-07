const api = new API();

const deleteWordComponent = new Component('deleteForm', {word: {}})
deleteWordComponent.view = function() {
    return api.wordDelete(model.word.WordID);   
}
deleteWordComponent.controller = function() {
    api
        .getWord(router.params[1])
        .then(result => {
            model.word = result[0];
        });  
}

export default deleteWordComponent;