/* получаем элементы из дерева document */
const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');

/* получаем/записываем данные статистику игрока */
const play = {
    set record(val) {
        this.Record = val;
        record.textContent = this.Record;
    },
    set shot(val) {
        this.Shot = val;
        shot.textContent = this.Shot;
    },
    set hit(val) {
        this.Shot = val;
        hit.textContent = this.Shot;
    },
    set dead(val) {
        this.Dead = val;
        dead.textContent = this.Dead;
    },
    get record() {
        return Number(record.textContent);
    },
    get shot() {
        return Number(shot.textContent);
    },
    get hit() {
        return Number(hit.textContent);
    },
    get dead() {
        return Number(dead.textContent);
    }
    /* ---------------- */
};

/* меняем отображение объекта */
const show = {
    ShowClass: {
        miss: 'miss',
        hit: 'hit',
        dead: 'dead'
    },
    hit(elem) {

    },
    miss(elem) {
        this.changeClass(elem, this.ShowClass.miss);
    },
    dead(elem) {

    },
    changeClass(elem, pClass) {
        if (!elem.classList.contains(pClass)) {
            elem.className = pClass;
            play.shot += 1;
        }
    }
}

/* выстрел игрока */
const fire = (event) => {
    show.miss(event.target);
}

/* инциализация, перелавливаем события элементов */
const init = () => {
    enemy.addEventListener('click', fire);
}

init();