const api = new API();

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