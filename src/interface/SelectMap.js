import {BaseComponent, render} from "../../core/components.js";
import store from "../store/store.js";
import {UPDATE_APP_PAGE, UPDATE_APP_SELECT_MAP} from "../store/actions/application.js";
import {Map} from "../game/Map.js";

class SelectMapItem extends BaseComponent{
    constructor(props) {
        super();
        this.children = props.children || null;
        this.name = props.name;
        this.map = props.map;
    }

    appendChild(element) {
        const settings = {
            width: element.getBoundingClientRect().width
        };
        this.generator = new Map({ map: this.map, settings});
        element.append(this.generator.render());
    }

    bindEvents(element) {
        element.addEventListener('click', () => {
            const { name, map } = this;
            UPDATE_APP_SELECT_MAP({ name, map });
            UPDATE_APP_PAGE("enter-username");
        })
    }

    template(){
        const { name } = this;
        return `
            <div class="maps__item">
                <h4>${name}</h4>
            </div>
        `;
    }
}

class SelectMap extends BaseComponent{

    constructor(props) {
        super();
        this.maps = props.maps;
        this.childs = [];
    }

    renderMap () {
        this.childs.forEach(child => child.generator.mapRender())
    }

    appendChild(element){
        this.maps.forEach(map => {
            const item = new SelectMapItem(map);
            this.childs.push(item);
            element.append(item.render());
        });
    }

    template () {
        return `
            <div class="maps__container"></div>
        `
    }
}

export { SelectMap };
