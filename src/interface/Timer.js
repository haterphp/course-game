import {BaseComponent} from "../../core/components.js";
import store from "../store/store.js";
import {listenEvent} from "../../core/event.js";
import {UPDATE_GAME_TIME} from "../store/actions/game.js";

function leadingZero(number){
    return number >= 10 ? number : `0${number}`
}

function getTimeFormat(time){
    const minute = leadingZero(Math.trunc(time / 60 % 60));
    const seconds = leadingZero(Math.trunc(time % 60));
    return `
        ${minute}:${seconds}
    `;
}

class Timer extends BaseComponent{

    constructor() {
        super();
        this.pause = false;
    }

    bindEvents() {
        console.log(this)
        listenEvent("UPDATE_APP_PAUSE", ({ detail }) => {
           const { payload } = detail;
           this.pause = payload.pause;
        });

        listenEvent("UPDATE_GAME_END", ({detail}) => {
            const {payload} = detail;
            if(payload.end) clearInterval(timerInterval);
        });

        const timerInterval = setInterval(() => {
            if(!this.pause) this.calcTime();
        }, 1000);
    }

    calcTime(){
        let { time } = store.getState('game');
        time--;
        if(time < 0) return;
        UPDATE_GAME_TIME(time);
        this.getTime();
    }

    getTime(){
        const { time } = store.getState('game');
        this.element.querySelector('.timer-container').innerHTML = getTimeFormat(time);
    }

    appendChild(element) {
        this.getTime();
    }

    template () {
        return `
            <h3 class="timer">Timer <span class="timer-container"></span></h3>
        `;
    }
}

export { Timer, getTimeFormat};
