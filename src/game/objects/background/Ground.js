import {GameObject} from "../GameObject.js";

class Ground extends GameObject{
    constructor(props) {
        super(props);
    }

    template() {
        return `
            <div class="block ground"></div>
        `
    }
}

export default Ground;
