const arenas = document.getElementsByClassName('arenas')[0];
const randomBtn = document.getElementsByClassName('button')[0];

const scorp = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'Кунай',
    attack: function(){
        console.log(this.name + ' fight');
    }
};

const kitana = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: 'Веер',
    attack: function(){
        console.log(this.name + ' fight');
    }
};


function createElement(tag, tagClass){
    let el = document.createElement(tag);
    if(tagClass){
        el.classList.add(tagClass);
    }

    return el
}

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

function changeHp(player){
    const playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.floor(Math.random()*(20 - 1) + 1);
    playerLife.style.width = player.hp + '%';
}

function playerWins(name){
    const loseTitle = createElement('div', 'loseTitle');
    loseTitle.innerText = name + ' wins';
    randomBtn.disabled = true;
    return loseTitle;
}

randomBtn.addEventListener('click', ()=>{
    console.log('click');
    changeHp(scorp);
    changeHp(kitana);
    if(scorp.hp <= 0){
        kitana.hp = 0;
        arenas.appendChild(playerWins(kitana.name));
    }else if(kitana.hp <= 0){
        scorp.hp = 0;
        arenas.appendChild(playerWins(scorp.name));
    }
});