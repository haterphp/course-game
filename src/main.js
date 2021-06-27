import store from "./store/store.js";
import {listenEvent} from "../core/event.js";
import {
    GET_APP_MAPS,
    UPDATE_APP_PAGE, UPDATE_APP_PAUSE,
    UPDATE_APP_SELECT_MAP,
} from "./store/actions/application.js";
import {SelectMap} from "./interface/SelectMap.js";
import {
    UPDATE_GAME_ELEMENTS,
    UPDATE_GAME_END, UPDATE_GAME_ENEMIES,
    UPDATE_GAME_HP,
    UPDATE_GAME_TIME, UPDATE_GAME_TRAPS,
    UPDATE_GAME_USERNAME
} from "./store/actions/game.js";
import Game from "./game/Game.js";
import {getTimeFormat} from "./interface/Timer.js";


function changePageVisible(page){
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => page.style.display = 'none');
    document.querySelector(`[data-page=${page}]`).style.display = '';
}

const game = new Game();


listenEvent("UPDATE_APP_PAGE", ({ detail }) => {
    const { payload } = detail;
    switch (payload.page){
        case "select-map":
            UPDATE_APP_SELECT_MAP(null);
            changePageVisible('select-map');

            const selectMapComponent = new SelectMap({ maps: store.getState('app').maps });
            const element = selectMapComponent.render();

            document.querySelector('#select_map_container').innerHTML = "";
            document.querySelector('#select_map_container').append(element);
            selectMapComponent.renderMap();

            break;
        case "enter-username":
            changePageVisible('enter-username');

            break;
        case "game":
            changePageVisible('game');

            UPDATE_APP_PAUSE(false);
            UPDATE_GAME_END(false);
            UPDATE_GAME_TIME(120);
            UPDATE_GAME_HP(5);
            UPDATE_GAME_ELEMENTS([]);
            UPDATE_GAME_ENEMIES(0);
            UPDATE_GAME_TRAPS(0);

            game.start();
            break;
        case "finish-page":
            changePageVisible('finish-page');
            game.stop();

            const { time, hp, enemies, traps } = store.getState('game');
            document.querySelector('#result__time').innerHTML = getTimeFormat(time);
            document.querySelector('#result__hp').innerHTML = hp;
            document.querySelector('#result__enemy').innerHTML = enemies;
            document.querySelector('#result__traps').innerHTML = traps;

            break;
    }
});

/* --------------------- GAME PAGE ---------------------- */


document.addEventListener('keydown', ev => {
    const { pause, page } = store.getState('app');
    if(ev.key === "Escape" && page === 'game' ) UPDATE_APP_PAUSE(!pause);
})

/* --------------------- FINISH PAGE ---------------------- */


document.querySelector('#restart')
    .addEventListener('click', () => {
        console.log(123)
        UPDATE_APP_PAGE('game');
    });


/* -------------------- ENTER USERNAME PAGE ------------------- */


const root = document.querySelector('#username-form');
root.addEventListener('submit', ev => ev.preventDefault());
const elements = {
    input: root.querySelector('.form-username'),
    start: root.querySelector('.btn-start'),
    back: root.querySelector('.btn-back'),
};

elements.input.addEventListener('input', ev => UPDATE_GAME_USERNAME(ev.target.value));
listenEvent('UPDATE_GAME_USERNAME', function({ detail }){
    const { payload } = detail;
    elements.start.disabled = !payload.username.length;
})
elements.start.addEventListener('click', () => UPDATE_APP_PAGE('game'));
elements.back.addEventListener('click', () => UPDATE_APP_PAGE('select-map'));


window.onload = async () => {
    await GET_APP_MAPS();
    UPDATE_APP_PAGE('select-map');
}
