import store from "../store/store.js";
import {listenEvent} from "../../core/event.js";
import {Timer} from "../interface/Timer.js";
import {Map as MapGenerator} from "./Map.js";
import StartBlock from "./objects/background/StartBlock.js";
import {UPDATE_GAME_ELEMENTS, UPDATE_GAME_END} from "../store/actions/game.js";
import {UPDATE_APP_PAGE, UPDATE_APP_PAUSE} from "../store/actions/application.js";
import EndBlock from "./objects/background/EndBlock.js";
import Enemy from "./objects/interactive/Enemy.js";
import Trap from "./objects/interactive/Trap.js";
import Ground from "./objects/background/Ground.js";
import {randomInt} from "../../core/funcitonHelpers.js";

class Game {
    constructor() {

        this.settings = {}
        this.container = null;
        this.gameElements = [];
        this.pause = false;
        this.timer = new Timer();

    }

    getSettings(){
        this.settings = store.getState('game')
    }

    watchGameSettings(){
        listenEvent('UPDATE_GAME_TIME', ({ detail }) => {
            this.settings.time = detail.payload.time;
        });
        listenEvent('UPDATE_GAME_HP', ({ detail }) => {
            this.settings.hp = detail.payload.hp;
            this.drawHP();
            if(this.settings.hp <= 0) UPDATE_APP_PAGE('finish-page');
        });
        listenEvent('UPDATE_GAME_ELEMENTS', ({ detail }) => {
            this.gameElements = detail.payload.elements.filter(item => !(item instanceof Ground
                || item instanceof StartBlock
                || item instanceof EndBlock));
        });
    }

    start(){
        console.log(123)
        this.getSettings();
        this.watchGameSettings();
        this.init();
    }

    stop(){
        UPDATE_APP_PAUSE(true);
        UPDATE_GAME_END(true);
        this.settings = {}
        this.container = null;
        this.gameElements = [];
        this.pause = false;
        this.generator = null;
    }

    init(){
        this.container = document.querySelector('#game-container');
        this.container.innerHTML = '';

        listenEvent("UPDATE_APP_PAUSE", ({ detail }) => {
            const { payload } = detail;
            this.pause = payload.pause;
        });

        this.drawTimer();
        this.drawHP();
        this.drawUsername();
        this.initMap();
        this.loop();
        this.spawnControl();
    }

    drawTimer(){
        document.querySelector('#timer').innerHTML = '';
        document.querySelector('#timer').append(this.timer.render());
    }

    drawHP(){
        document.querySelector('#hp').innerHTML = `HP: ` + this.settings.hp;
    }

    drawUsername(){
        document.querySelector('#username').innerHTML = this.settings.username;
    }

    initMap(){
        const { selectedMap } = store.getState('app');
        this.generator = new MapGenerator({ map: selectedMap.map});
        this.container.append(this.generator.render());
        this.generator.mapRender();

        this.generator.childs.forEach(child => child.getPosition(this.generator.element));
        const hero = this.generator.childs.find(item => item instanceof StartBlock).createHero(this.generator.element);
        this.gameElements.push(hero);

        UPDATE_GAME_ELEMENTS([...this.generator.childs, hero]);

        this.generator.element.append(hero.draw());
        hero.events();
    }

    spawnControl(){
        const spawnControl = new Map()
            .set(Enemy, 10)
            .set(Trap, 2);

        const spawnQueue = Array.from({ length: 12 }, (_, i) => {
            return this.getRandomEnemy(spawnControl);
        });

        listenEvent("UPDATE_GAME_END", ({detail}) => {
            const {payload} = detail;
            if(payload.end) clearInterval(spawnInterval);
        });

        this.makeObject(spawnQueue);
        const spawnInterval = setInterval(() => this.makeObject(spawnQueue), 3000);
    }

    getRandomEnemy(rules){
        const enemies = [Enemy, Trap];
        let obj = enemies[Math.round(Math.random())];

        if (rules.get(obj) <= 0) return this.getRandomEnemy(rules);

        let newValue = rules.get(obj);
        rules.set(obj, --newValue)
        return obj;
    }

    makeObject(spawnQueue){
        let obj = spawnQueue.shift();

        const { elements } = store.getState('game');
        const availableElements = elements.filter(item => item instanceof Ground)
        const block = availableElements[randomInt(availableElements.length)];
        obj = new obj({ position: block.position, container: this.generator.element });

        this.generator.element.append(obj.draw());
        obj.getPosition(this.generator.element);

        this.gameElements.push(obj);
        UPDATE_GAME_ELEMENTS([...this.generator.childs, ...this.gameElements]);

    }

    loop(){

        if(!this.pause){
            this.gameElements.forEach(element => {
                element.update()
                element.draw();
            })
        }

        if(!store.getState('game').end) requestAnimationFrame(() => this.loop());
    }

}

export default Game;
