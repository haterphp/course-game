import {createStore} from "../../core/store.js";
import applicationReducer from "./reducers/applcation.js";
import gameReducer from "./reducers/game.js";

const store = createStore({
    app: applicationReducer,
    game: gameReducer
});

export default store;
