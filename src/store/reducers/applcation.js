const initStates = {
    page: "",
    maps: [],
    selectedMap: null,
    pause: false
};

function applicationReducer({ state = initStates, action }){
    switch (action.type) {
        case "UPDATE_APP_MAPS": return { ...state, ...action.payload };
        case "UPDATE_APP_PAUSE": return { ...state, ...action.payload };
        case "UPDATE_APP_PAGE": return { ...state, ...action.payload };
        case "UPDATE_APP_SELECT_MAP": return { ...state, selectedMap: action.payload.map };
        default: return state;
    }
}

export default applicationReducer;
