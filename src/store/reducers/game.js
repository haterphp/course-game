const initStates = {
    username: "",
    time: 120,
    hp: 5,
    elements: [],
    end: false,
    enemies: 0,
    traps: 0,
}

function gameReducer({ state = initStates, action }){
    switch (action.type){
        case "UPDATE_GAME_TIME":
        case "UPDATE_GAME_HP":
        case "UPDATE_GAME_USERNAME":
        case "UPDATE_GAME_END":
        case "UPDATE_GAME_ENEMIES":
        case "UPDATE_GAME_TRAPS":
        case "UPDATE_GAME_ELEMENTS": return { ...state, ...action.payload };
        default: return state;
    }
}

export default gameReducer;
