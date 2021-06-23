import {BaseComponent, render} from "../../core/components.js";
import store from "../store/store.js";
import {UPDATE_APP_PAGE, UPDATE_APP_SELECT_MAP} from "../store/actions/application.js";

class SelectMapItem extends BaseComponent{
    constructor(props) {
        super();
        this.children = props.children || null;
        this.name = props.name;
        this.map = props.map;
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
    }

    appendChild(element){
        this.maps.forEach(map => {
            element.append(new SelectMapItem(map).render());
        });
    }

    template () {
        return `
            <div class="maps__container"></div>
        `
    }
}

export { SelectMap };
