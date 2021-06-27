import {MovableGameObject} from "../GameObject.js";
import store from "../../../store/store.js";
import EndBlock from "../background/EndBlock.js";
import {UPDATE_APP_PAGE} from "../../../store/actions/application.js";
import Enemy from "./Enemy.js";
import Trap from "./Trap.js";
import {
    UPDATE_GAME_ELEMENTS,
    UPDATE_GAME_ENEMIES,
    UPDATE_GAME_HP,
    UPDATE_GAME_TRAPS
} from "../../../store/actions/game.js";

class Hero extends MovableGameObject {
    constructor(props) {
        super(props);
        this.speed = 10;
        this.container = props.container;
        this.keys = new Map()
            .set("ArrowUp", false)
            .set("ArrowDown", false)
            .set("ArrowLeft", false)
            .set("ArrowRight", false);
    }

    events() {
        addEventListener('keydown', ev => {
            if (this.keys.has(ev.key)) this.keys.set(ev.key, true);
        });
        addEventListener('keyup', ev => this.keys.set(ev.key, false));
    }

    update() {
        this.move();
        this.collisions();
    }

    hpUpdate(element) {
        let {elements, hp} = store.getState('game');

        element.remove();
        elements.splice(elements.indexOf(element), 1);

        UPDATE_GAME_HP(--hp);
        UPDATE_GAME_ELEMENTS(elements);
    }

    collisions() {
        const collisions = new Map()
            .set("EndBlock", () => {
                UPDATE_APP_PAGE("finish-page");
            })
            .set("Enemy", (element) => {
                let { enemies } = store.getState('game');
                UPDATE_GAME_ENEMIES(++enemies);
                this.hpUpdate(element)
            })
            .set("Trap", (element) => {
                let { traps } = store.getState('game');
                UPDATE_GAME_TRAPS(++traps);
                this.hpUpdate(element)
            })

        const { elements } = store.getState('game');
        const end = elements.filter(item => item instanceof EndBlock);
        const enemies = elements.filter(item => item instanceof Enemy);
        const traps = elements.filter(item => item instanceof Trap);
        const collisionElements = [ ...end, ...enemies, ...traps ];

        collisionElements.forEach(el => {
            if(this.checkCollision(el)) collisions.get(el.constructor.name).bind(this, el).call();
        });

    }

    move() {
        const vectors = {
            "ArrowUp": ["top", -1],
            "ArrowDown": ["top", 1],
            "ArrowLeft": ["left", -1],
            "ArrowRight": ["left", 1],
        };
        let key = null;
        for(let [k, value] of this.keys.entries()) {
            if (value) {
                key = k;
                break;
            }
        }

        if(vectors[key]){
            const [vector, velocity] = vectors[key];
            const container = this.container.getBoundingClientRect();
            const nextPosition = this.position[vector] + this.speed * velocity;
            console.log(this.speed)
            if(nextPosition >= 0
                && nextPosition <= container[vector === 'left' ? 'width' : 'height'] - this.position.width){
                this.position[vector] += 1 * velocity;
            }
        }
    }

    template() {
        return `<div class="movable hero"></div>`
    }

}

export default Hero;
