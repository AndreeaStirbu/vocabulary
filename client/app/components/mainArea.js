export default function createMainArea(componentName, selector){
    const comp = new Component(selector);
    comp.addComponent({
        name: componentName,
        model: {},
        view(model) {return 'Main'},
        controller(model) {}
    });
    const router = new Router(comp);
    router.addRoute(componentName, '#/');
}

