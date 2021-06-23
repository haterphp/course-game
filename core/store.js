import {dispatchEvent} from "./event.js";

class Store{
    constructor(reducers) {
        this.reducers = reducers;
        this.states = this.makeStates();
    }

    dispatch (action) {
        this.states = this.observeStore(this.states, action);
        dispatchEvent(action.type, action);
    }

    makeStates() {
        const action = { type: "INIT_STORE" };
        return this.observeStore({}, action);
    }

    observeStore (states, action = null) {
        Object.entries(this.reducers).forEach(([key, func]) => {
            let args = { action };
            if (states[key]) args = { ...args, state: states[key] };
            states[key] = func(args);
        });
        return states;
    }

    getState(name){
        return this.states[name];
    }
}

function createStore (reducers) {
    return new Store(reducers);
}

export { createStore };
