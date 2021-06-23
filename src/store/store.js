import {createStore} from "../../core/store.js";
import applicationReducer from "./reducers/applcation.js";

const store = createStore({
    app: applicationReducer
});

export default store;
