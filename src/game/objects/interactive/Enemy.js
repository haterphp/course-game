import {MovableGameObject} from "../GameObject.js";
import {randomInt} from "../../../../core/funcitonHelpers.js";
import store from "../../../store/store.js";
import {UPDATE_GAME_ELEMENTS, UPDATE_GAME_HP} from "../../../store/actions/game.js";

class Enemy extends MovableGameObject{

    constructor(props) {
        super(props);
        this.container = props.container;
        this.vector = this.getRandomVector();
        this.speed = 0.5;
    }

    getRandomVector(){
        const vectors = [
            ["top", -1],
            ["top", 1],
            ["left", -1],
            ["left", 1]
        ]
        return vectors[randomInt(3)];
    }

    update() {
        const [key, vector] = this.vector;
        const container = this.container.getBoundingClientRect();
        this.position[key] += this.speed * vector;
        if((this.position[key] + this.position.width) < 0 || this.position[key] > container[key === 'left' ? 'width' : 'height']) {
            let {elements} = store.getState('game');

            this.remove();
            elements.splice(elements.indexOf(this), 1);

            UPDATE_GAME_ELEMENTS(elements);
        }
    }

    template() {
        return `
            <div class="movable enemy"></div>
        `;
    }
}

export default Enemy;
