class Container {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.components = []; 
    }

    addComponent(component){
        this.components[component.name] = component;
        component.model = this.proxify(component.model);
    }
    showComponent(name) {
        this.currentComponent = this.components[name];
        if(this.currentComponent) {
            this.currentComponent.controller();
        }
        this.updateView();
    }
    updateView() {
        this.container.innerHTML = this.currentComponent.view();
    }
    proxify(model){
        const self = this;
        return new Proxy(model, {
            set(target, property, value) {
                target[property] = value;
                self.updateView();
                return true;
            }
        })
    }
    clearContainer() {
        this.container.innerHTML = '';
    }
}