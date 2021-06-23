import store from "../store.js";

function GET_APP_MAPS (callback) {
    return fetch("./src/maps.json")
        .then(res => res.json())
        .then(data => store.dispatch(actions.UPDATE_MAPS(data)));
}

function UPDATE_APP_PAGE (page) {
    store.dispatch(actions.UPDATE_PAGE(page));
}

function UPDATE_APP_SELECT_MAP(map) {
    store.dispatch(actions.UPDATE_SELECT_MAP(map));
}

function UPDATE_APP_USERNAME (username) {
    store.dispatch(actions.UPDATE_USERNAME(username));
}

const actions = {
    "UPDATE_MAPS": (maps) =>  ({ type: "UPDATE_APP_MAPS", payload: { maps } }),
    "UPDATE_PAGE": (page) => ({ type: "UPDATE_APP_PAGE", payload: { page } }),
    "UPDATE_SELECT_MAP": (map) => ({ type: "UPDATE_APP_SELECT_MAP", payload: { map } }),
    "UPDATE_USERNAME": (username) => ({ type: "UPDATE_APP_USERNAME", payload: { username } }),
}

export { GET_APP_MAPS, UPDATE_APP_PAGE, UPDATE_APP_SELECT_MAP, UPDATE_APP_USERNAME };
