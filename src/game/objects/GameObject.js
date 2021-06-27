import {render} from "../../../core/components.js";

class GameObject{
    constructor(props) {
        this.element = null;
        this.position = props.position;
        this.createObject();
    }
    template(){}

    createObject(){
        this.element = render(this.template());
    }

    getPosition(container){
        const { width, height, x, y } = this.element.getBoundingClientRect();
        const pos = container.getBoundingClientRect();
        this.position = {
            width: width,
            height: height,
            left: x - pos.x,
            top:  y - pos.y
        }
    }

    draw(){
        Object.entries(this.position)
            .forEach(([key, value]) => this.element.style[key] = value + 'px');
        return this.element;
    }

    checkCollision(obj){
        const { left, top, width, height } = obj.position;
        const pos = this.position;
        return pos.left < (left + width) && left < (pos.left + pos.width)
            && pos.top < (top + height) && top < (pos.top + pos.height);
    }

    remove(){
        this.element.remove();
    }
}

class StaticGameObject extends GameObject{
    events(){}
}

class MovableGameObject extends GameObject{
    events(){}
    update(){}
}

function CreateGameObject(classname, props = null){
    return new classname(props);
}

export { GameObject, MovableGameObject, CreateGameObject, StaticGameObject };
