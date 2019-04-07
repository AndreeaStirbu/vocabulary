const searchBar = `<input type="text" id="search-bar" placeholder="Looking for a word?"></input>`;

export default function createSearch(componentName, selector){
    const comp = new Component(selector);
    comp.addComponent({
        name: componentName,
        model: {},
        view(model) {
            return searchBar;                                                                                                                  
        },
        controller(model) {}
    });
    const router = new Router(comp);
    router.addRoute(componentName, '#/search');
}

