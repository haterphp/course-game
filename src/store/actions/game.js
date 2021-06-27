import store from "../store.js";

function UPDATE_GAME_TIME (time){
    store.dispatch(actions.UPDATE_TIME(time));
}

function UPDATE_GAME_HP (hp){
    store.dispatch(actions.UPDATE_HP(hp));
}

function UPDATE_GAME_USERNAME (username) {
    store.dispatch(actions.UPDATE_USERNAME(username));
}

function UPDATE_GAME_ELEMENTS (elements) {
    store.dispatch(actions.UPDATE_GAME_ELEMENTS(elements));
}

function UPDATE_GAME_END (status) {
    store.dispatch(actions.UPDATE_GAME_END(status));
}

function UPDATE_GAME_ENEMIES (status) {
    store.dispatch(actions.UPDATE_ENEMIES(status));
}

function UPDATE_GAME_TRAPS (status) {
    store.dispatch(actions.UPDATE_TRAPS(status));
}

const actions = {
    "UPDATE_TIME": (time) => ({ type: "UPDATE_GAME_TIME", payload: { time } }),
    "UPDATE_HP": (hp) => ({ type: "UPDATE_GAME_HP", payload: { hp } }),
    "UPDATE_USERNAME": (username) => ({ type: "UPDATE_GAME_USERNAME", payload: { username } }),
    "UPDATE_GAME_ELEMENTS": (elements) => ({ type: "UPDATE_GAME_ELEMENTS", payload: { elements } }),
    "UPDATE_GAME_END": (end) => ({ type: "UPDATE_GAME_END", payload: { end } }),
    "UPDATE_ENEMIES": (enemies) => ({ type: "UPDATE_GAME_ENEMIES", payload: { enemies } }),
    "UPDATE_TRAPS": (traps) => ({ type: "UPDATE_GAME_TRAPS", payload: { traps } }),
}

export { UPDATE_GAME_USERNAME, UPDATE_GAME_HP, UPDATE_GAME_TIME, UPDATE_GAME_ELEMENTS, UPDATE_GAME_END, UPDATE_GAME_ENEMIES, UPDATE_GAME_TRAPS };
