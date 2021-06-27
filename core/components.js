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
        this.element = render(this.template());
        this.bindEvents(this.element);
        this.appendChild(this.element);
        return this.element;
    }
}

export { BaseComponent, render };
