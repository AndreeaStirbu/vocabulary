const api = new API();

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