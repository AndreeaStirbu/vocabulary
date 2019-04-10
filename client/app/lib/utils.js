const initContainer = function(selector, component) {
    const container = new Container(selector);
    container.addComponent(component);
    container.updateContainer();
    return container;
}

const flipOnClick = function(container, elementClass, component) {
    let fliped = false;
    document.addEventListener('click', function (event) {

      // If the clicked element doesn't have the right selector, bail
      if (!event.target.matches(elementClass)) return;
      
      // Don't follow the link
      event.preventDefault();
    
      // Log the clicked element in the console
      event.target.classList.toggle('flip');
    //   fliped = true;
    //   fliped === true ? false : true;
    //   container.showComponent(component.name, {fliped});
    });
}

export {initContainer, flipOnClick};