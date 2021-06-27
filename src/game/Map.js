import {BaseComponent} from "../../core/components.js";
import Ground from "./objects/background/Ground.js";
import {CreateGameObject} from "./objects/GameObject.js";
import StartBlock from "./objects/background/StartBlock.js";
import EndBlock from "./objects/background/EndBlock.js";

const initSettings = {
    0: Ground,
    1: StartBlock,
    2: EndBlock
}

class MapGenerator {
    constructor(settings) {
        this.blocks = settings.blocks;
        this.container = settings.container;
    }

    render(map) {
        const { blocks, container } = this;
        console.log(map)
        return map.flat().map(item => {
            const blockSize = container.getBoundingClientRect().width / map[0].length;
            const position = {
                width: blockSize,
                height: blockSize
            }
            return CreateGameObject(blocks[item], { position });
        });
    }
}

class Map extends BaseComponent {
    constructor(props) {
        super();
        this.map = props.map;
        this.settings = props.settings || {};
        this.childs = [];
    }

    mapRender () {
        const generator = new MapGenerator({ blocks: initSettings, container: this.element});
        generator.render(this.map).forEach(obj => {
            this.childs.push(obj);
            this.element.append(obj.draw());
        });
    }

    render() {
        const element = super.render();
        this.element = element;
        return element;
    }

    template() {
        return `
            <div class="canvas"></div>
        `;
    }
}

export {Map};
