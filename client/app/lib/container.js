class Container {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.components = []; 
    }

    addComponent(component){
        this.components[component.name] = component;
        this.components.push(component);
        //component.model = this.proxify(component.model);
    }
    // showComponent(name) {
    //     this.currentComponent = this.components[name];
    //     if(this.currentComponent) {
    //         this.currentComponent.controller();
    //     }

    //     this.addComponnentToView(this.currentComponent);
    // }
    // addComponnentToView(component) {
    //     this.container.innerHTML += component.view();
    // }
    // updateComponentView(component) {
    //     return component.view();
    // }

    // getRespons(component){
    //     return new Promise(resolve => {
    //         resolve(component.controller());
    //     });
    // }
    // async updateModel(component){
    //     await getRespons(component);
    //     this.container.innerHTML += component.view();
    // }

    updateContainer() {
        for(var i = 0; i < this.components.length; i++) {
            //currentComponent = this.components[this.components[i].name];
            this.components[i].controller()
            .then(() => {
                this.container.innerHTML +=  this.components[i].view();
            });
            
            //updateModel(currentComponent);
        }
        // this.components.foreach(component => {
        //     component.controller();
        //     this.container.innerHTML += component.view();
        // })
    }

    
    updateComponent(component, newView) {
        this.components[component.name].view() = newView;
        updateContaier();
    }

    proxify(model){
        const self = this;
        return new Proxy(model, {
            set(target, property, value) {
                target[property] = value;
                //self.updateContainer();
                return true;
            }
        })
    }
}