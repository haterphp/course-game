const initStates = {
    page: "",
    maps: [],
    selectedMap: null,
    username: "",
    time: 120,
    hp: 5
};

function applicationReducer({ state = initStates, action }){
    console.log(action)
    switch (action.type) {
        case "UPDATE_APP_MAPS": return { ...state, ...action.payload };
        case "UPDATE_APP_PAGE": return { ...state, ...action.payload };
        case "UPDATE_APP_USERNAME": return { ...state, ...action.payload };
        case "UPDATE_APP_SELECT_MAP": return { ...state, selectedMap: action.payload.map };
        default: return state;
    }
}

export default applicationReducer;
