/* получаем элементы из дерева document */
const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header');

const lsSetBattleRecord = 'setBattleRecord';
const gameEnd = 'Игра окончена';

/* получаем/записываем данные по статистике игрока */
const play = {
    set record(val) {
        record.textContent = val;
    },
    set shot(val) {
        shot.textContent = val;
    },
    set hit(val) {
        hit.textContent = val;
    },
    set dead(val) {
        dead.textContent = val;
    },
    set header(val) {
        header.textContent = val;
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
    },
    get header() {
        return String(header.textContent);
    }
    /* ---------------- */
};

const game = {
    ships: [
        {
            location: ['26', '36', '46', '56'],
            hit: ['', '', '', '']
        },
        {
            location: ['11', '12', '13'],
            hit: ['', '', '']
        },
        {
            location: ['69', '68'],
            hit: ['', '']
        },
        {
            location: ['32'],
            hit: ['']
        }
    ]
}

/* меняем отображение объекта на странице */
const show = {
    ShowClass: {
        miss: 'miss',
        hit: 'hit',
        dead: 'dead'
    },
    hit(elem) {
        if ((!elem.classList.contains(this.ShowClass.hit)) 
        && (elem.tagName == 'TD')) {
            play.hit += 1;
            this.changeClass(elem, this.ShowClass.hit); 
        }   
    },
    miss(elem) {
        if ((!elem.classList.contains(this.ShowClass.miss)) 
            && (elem.tagName == 'TD')) {
            play.shot += 1;
            this.changeClass(elem, this.ShowClass.miss);
        }
    },
    dead(elem) {
        this.changeClass(elem, this.ShowClass.dead);
    },
    changeClass(elem, pClass) {
        elem.className = pClass;
    }
}

/* выстрел игрока */
const fire = (event) => {
    // запрещаем выстрелы если игра закончина
    if (play.header === gameEnd) return;
    // выстрел
    if (index = -1) show.miss(event.target);
    // проверяем попадание по кораблю
    for (let i = 0; i < game.ships.length; i++) {
        const ship = game.ships[i];
        const index = ship.location.indexOf(event.target.id);
        if (index > -1) {
            show.hit(event.target);
            ship.hit[index] = 'X';
            // проверяем потапили ли мы корабль
            const life = ship.hit.indexOf('');
            if (life <0) {
                play.dead += 1;
                for (const id of ship.location) {
                    show.dead(document.getElementById(id));
                }
            }
        }
    }
    // проверяем завершение игры
    if (game.ships.length <= play.dead) {
        play.header = gameEnd;
        header.style.color = 'red';

        if (play.shot < play.record || play.record === 0) {
            localStorage.setItem(lsSetBattleRecord, play.shot);
            play.record = play.shot;
        }
    }
}

/* инциализация, перелавливаем события элементов */
const init = () => {
    enemy.addEventListener('click', fire);
    play.record = localStorage.getItem(lsSetBattleRecord) || 0;
    // перезапус игры
    again.addEventListener('click', () => {
        location.reload();
    });
}

init();