import {MovableGameObject} from "../GameObject.js";

class Trap extends MovableGameObject{

    getPosition(container) {
        const { width, height, x, y } = this.element.getBoundingClientRect();
        const pos = container.getBoundingClientRect();
        this.position = {
            width: width * 3,
            height: height * 3,
            left: (x - pos.x) - width,
            top:  (y - pos.y) - height
        }
    }

    draw() {
        const bomb = this.element.querySelector('.bomb');
        bomb.style.width = this.position.width / 3 + 'px';
        bomb.style.height = this.position.height / 3 + 'px';
        return super.draw();
    }

    template() {
        return `
            <div class="block block--static trap">
                <div class="bomb"></div>
            </div>
        `;
    }
}

export default Trap;
