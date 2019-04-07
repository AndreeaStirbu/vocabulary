class Router {
    constructor(component) {
        this.component = component;
        this.routes = [];
        this.hashChange = this.hashChange.bind(this);

        window.addEventListener('hashchange', this.hashChange);
        window.addEventListener('DOMContentLoaded', this.hashChange);
    }
    addRoute(name, url) {
        this.routes.push({
            name, url
        });
    }
    hashChange() {
        const hash = window.location.hash;
        const route = this.routes.filter(route => hash.match(new RegExp(route.url)))[0];
        
        if(route) {
            this.params = new RegExp(route.url).exec(hash);
            this.component.showComponent(route.name);
        } else {
            this.component.showComponent();
        }
    }
}