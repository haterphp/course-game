import {GameObject} from "../GameObject.js";

class EndBlock extends GameObject{
    constructor(props) {
        super(props);
    }

    template() {
        return `
            <div class="block end"></div>
        `;
    }
}

export default EndBlock;
