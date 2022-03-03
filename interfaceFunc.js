import { createElement,getRandom } from './helpsFunc.js';
import { LOGS } from './consts.js';

export const arenas = document.getElementsByClassName('arenas')[0];
const randomBtn = document.getElementsByClassName('button')[0];
const chat = document.querySelector('.chat');

/**
 * 
 * @param {object} playerObj 
 * @returns {HTMLElement}
 */
export function createPlayer({ player, hp, name, img }){
    let playerBlock = createElement('div', 'player' + player);

    let progressbar = createElement('div', 'progressbar');
    let life = createElement('div', 'life');
    life.style.width = hp + '%';
    let nameBlock = createElement('div', 'name');
    nameBlock.innerText = name;
    progressbar.appendChild(life);
    progressbar.appendChild(nameBlock);

    let character = createElement('div', 'character');
    let imgTag = createElement('img');
    imgTag.src = img;
    character.appendChild(imgTag);

    playerBlock.appendChild(progressbar);
    playerBlock.appendChild(character);

    return playerBlock;
}

/**
 * @param {string} name 
 * @returns 
 */
function playerWins({ name }){
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
        window.location.pathname = 'index.html';
    });

    arenas.appendChild(reloadWrap);
}

export function showResult(player1, player2){
    if(player1.hp <= 0){
        player2.hp = 0;
        arenas.appendChild(playerWins(player2));
        generateLogs(LOGS, 'end', player2, player1)
    }else if(player2.hp <= 0){
        player1.hp = 0;
        arenas.appendChild(playerWins(player1));
        generateLogs(LOGS, 'end', player1, player2)
    } else if(player1.hp === 0 && player2.hp === 0) {
        arenas.appendChild(playerWins());
        generateLogs(LOGS, 'draw', player1, player2)
    }
}

function getTime(){
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}

function getTextLog(logs, type, name1, name2){
    switch (type) {
        case 'start':
            return logs[type].replace('[player1]', name1).replace('[player2]', name2).replace('[time]', getTime());
            break;
        case 'end':
            return logs[type][getRandom(3) - 1].replace('[playerWins]', name1).replace('[playerLose]', name2);
            break;
        case 'hit':
            return logs[type][getRandom(18) - 1].replace('[playerKick]', name1).replace('[playerDefence]', name2);
            break;
        case 'defence':
            return logs[type][getRandom(8) - 1].replace('[playerKick]', name1).replace('[playerDefence]', name2);
            break;
    }
}

export function generateLogs(logs, type, player1, player2, valueAttack){
    let text = getTextLog(logs, type, player1.name, player2.name);
    switch (type) {
        case 'hit':
            text = `${getTime()} ${text} -${valueAttack} [${player2.hp}]/100`;
            break;
        case 'defence':
        case 'end':
        case 'draw':
            text = `${getTime()} ${text}`;
            break
    }
    if(type === 'hit'){
    }
    const el = `<p>${text}</p>`;
    chat.insertAdjacentHTML('afterbegin', el)
}