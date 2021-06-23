import store from "./store/store.js";
import {listenEvent} from "../core/event.js";
import {
    GET_APP_MAPS,
    UPDATE_APP_PAGE,
    UPDATE_APP_SELECT_MAP,
    UPDATE_APP_USERNAME
} from "./store/actions/application.js";
import {SelectMap} from "./interface/SelectMap.js";

function setSelectMapPageStates(){
    UPDATE_APP_SELECT_MAP(null);
}

function changePageVisible(page){
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => page.style.display = 'none');
    document.querySelector(`[data-page=${page}]`).style.display = '';
}


listenEvent("UPDATE_APP_PAGE", ({ detail }) => {
    const { payload } = detail;
    switch (payload.page){
        case "select-map":
            setSelectMapPageStates();
            changePageVisible('select-map');

            const selectMapComponent = new SelectMap({ maps: store.getState('app').maps });
            const element = selectMapComponent.render();

            document.querySelector('#select_map_container').innerHTML = "";
            document.querySelector('#select_map_container').append(element);

            break;
        case "enter-username":
            changePageVisible('enter-username');

            const root = document.querySelector('#username-form');
            root.addEventListener('submit', ev => ev.preventDefault());
            const elements = {
                input: root.querySelector('.form-username'),
                start: root.querySelector('.btn-start'),
                back: root.querySelector('.btn-back'),
            };

            elements.input.addEventListener('input', ev => UPDATE_APP_USERNAME(ev.target.value));
            listenEvent('UPDATE_APP_USERNAME', function({ detail }){
                const { payload } = detail;
                elements.start.disabled = !payload.username.length;
            })
            elements.start.addEventListener('click', () => UPDATE_APP_PAGE('game'));
            elements.back.addEventListener('click', () => UPDATE_APP_PAGE('select-map'));

            break;
        case "game":
            changePageVisible('game');
            console.log(store)
            break;
    }
});

window.onload = async () => {
    await GET_APP_MAPS();
    UPDATE_APP_PAGE('select-map');
}
