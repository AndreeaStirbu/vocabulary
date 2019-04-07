const initContainer = function(selector, component) {
    const container = new Container(selector);
    container.addComponent(component);
    container.showComponent(component.name);
    return container;
}

export default initContainer;