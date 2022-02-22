const arenas = document.getElementsByClassName('arenas')[0];
const randomBtn = document.getElementsByClassName('button')[0];
const chat = document.querySelector('.chat');

const form = document.querySelector('.control');
const HIT = {
        head: 30,
        body: 25,
        foot: 20,
    }
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
    };


/**
 * @returns {Object}
 */
function enemyAttack(){
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

/**
 * @returns {Object}
 */
function playerAttack(){
    let attack = {};

    for (const item of form) {
        if(item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if(item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

/**
 * 
 * @param {Number} hp 
 */
function changeHp(hp){
    if(this.hp - hp > 0){
       this.hp -= hp;
    } else{
        this.hp = 0;
    }
}

/**
 * @returns {HTMLElement}
 */
function elHp(){
    return document.querySelector('.player' + this.player + ' .life');
}

/**
 * @param {HTMLElement} playerLife 
 */
function renderHp(playerLife){
    playerLife.style.width = this.hp + '%';
}

const scorp = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'Кунай',
    attack: function(){
        console.log(this.name + ' fight');
    },
    changeHp,
    elHp,
    renderHp
};

const kitana = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: 'Веер',
    attack: function(){
        console.log(this.name + ' fight');
    },
    changeHp,
    elHp,
    renderHp
};

/**
 * 
 * @param {string} tag 
 * @param {string} tagClass 
 * @returns 
 */
function createElement(tag, tagClass){
    let el = document.createElement(tag);
    if(tagClass){
        el.classList.add(tagClass);
    }

    return el
}

/**
 * 
 * @param {object} playerObj 
 * @returns {HTMLElement}
 */
function createPlayer(playerObj){
    let player = createElement('div', 'player' + playerObj.player);

    let progressbar = createElement('div', 'progressbar');
    let life = createElement('div', 'life');
    life.style.width = playerObj.hp + '%';
    let name = createElement('div', 'name');
    name.innerText = playerObj.name;
    progressbar.appendChild(life);
    progressbar.appendChild(name);

    let character = createElement('div', 'character');
    let img = createElement('img');
    img.src = playerObj.img;
    character.appendChild(img);

    player.appendChild(progressbar);
    player.appendChild(character);

    return player;
}
arenas.appendChild(createPlayer(scorp));
arenas.appendChild(createPlayer(kitana));

/**
 * @param {string} name 
 * @returns 
 */
function playerWins(name){
    const loseTitle = createElement('div', 'loseTitle');
    
    if(name){
        loseTitle.innerText = name + ' wins';
    }else {
        loseTitle.innerText = 'draw';
    }
    randomBtn.disabled = true;
    createReloadButton();
    return loseTitle;
}

function createReloadButton(){
    let reloadWrap = createElement('div', 'reloadWrap');
    let btn = createElement('button', 'button');
    btn.innerText = 'Restart';
    reloadWrap.appendChild(btn);

    btn.addEventListener('click', ()=>{
        window.location.reload();
    });

    arenas.appendChild(reloadWrap);
}

/** 
 * @param {number} range 
 * @returns {number}
 */
function getRandom(range){
    return Math.ceil(Math.random()*range);
}

function showResult(){
    if(scorp.hp <= 0){
        kitana.hp = 0;
        arenas.appendChild(playerWins(kitana.name));
        generateLogs('end', kitana, scorp)
    }else if(kitana.hp <= 0){
        scorp.hp = 0;
        arenas.appendChild(playerWins(scorp.name));
        generateLogs('end', scorp, kitana)
    } else if(scorp.hp === 0 && kitana === 0) {
        arenas.appendChild(playerWins());
        generateLogs('draw', scorp, kitana)
    }
}


function generateLogs(type, player1, player2){
    let text;
    console.log('1')
    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', `${new Date().getHours()}:${new Date().getMinutes()}`);
            break;
        case 'end':
            text = logs[type][getRandom(3) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;
        case 'hit':
            text = logs[type][getRandom(18) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;
        case 'defence':
            text = logs[type][getRandom(8) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;
    }
    const el = `<p>${text}</p>`;
    chat.insertAdjacentHTML('afterbegin', el)
}

window.addEventListener('load', ()=>{
    generateLogs('start', kitana, scorp)
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if(enemy.hit !== player.defence){
        scorp.changeHp(enemy.value);
        scorp.renderHp(scorp.elHp());
        generateLogs('hit', kitana, scorp)
    } else{
        generateLogs('defence', kitana, scorp)
    }
    if(player.hit !== enemy.defence){
        kitana.changeHp(player.value);
        kitana.renderHp(kitana.elHp());
        generateLogs('hit', scorp, kitana)
    } else{
        generateLogs('defence', scorp, kitana)
    }

    showResult();
});