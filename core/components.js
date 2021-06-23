function render(component){
    const template = document.createElement('template');
    template.innerHTML = component.trim();
    return template.content.firstChild;
}

class BaseComponent{
    template() {}
    bindEvents() {}
    appendChild(element){}
    render(){
        const element = render(this.template());
        this.bindEvents(element);
        this.appendChild(element);
        return element;
    }
}

export { BaseComponent, render };
