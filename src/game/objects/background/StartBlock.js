import {GameObject} from "../GameObject.js";
import Hero from "../interactive/Hero.js";
import store from "../../../store/store.js";

class StartBlock extends GameObject{
    constructor(props) {
        super(props);
    }

    createHero(container){
        return new Hero({ container, position: this.position });
    }

    template() {
        return `
            <div class="block start"></div>
        `;
    }
}

export default StartBlock;
