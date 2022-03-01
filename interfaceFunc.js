import { createElement,getRandom } from './helpsFunc.js';
import { LOGS } from './main.js';

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
        window.location.reload();
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

export function generateLogs(logs, type, { name: name1 }, { name: name2 }){
    let text;
    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', name1).replace('[player2]', name2).replace('[time]', `${new Date().getHours()}:${new Date().getMinutes()}`);
            break;
        case 'end':
            text = logs[type][getRandom(3) - 1].replace('[playerWins]', name1).replace('[playerLose]', name2);
            break;
        case 'hit':
            text = logs[type][getRandom(18) - 1].replace('[playerKick]', name1).replace('[playerDefence]', name2);
            break;
        case 'defence':
            text = logs[type][getRandom(8) - 1].replace('[playerKick]', name1).replace('[playerDefence]', name2);
            break;
    }
    const el = `<p>${text}</p>`;
    chat.insertAdjacentHTML('afterbegin', el)
}