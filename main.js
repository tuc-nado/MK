const arenas = document.getElementsByClassName('arenas')[0];
const randomBtn = document.getElementsByClassName('button')[0];

function changeHp(hp){
    if(this.hp - hp > 0){
       this.hp -= hp;
    } else{
        this.hp = 0;
    }
}

function elHp(){
    return document.querySelector('.player' + this.player + ' .life');
}

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

function ranHp(){
    return Math.floor(Math.random()*20);
}

randomBtn.addEventListener('click', ()=>{
    console.log('click');
    scorp.changeHp(ranHp());
    kitana.changeHp(ranHp());
    scorp.renderHp(scorp.elHp());
    kitana.renderHp(kitana.elHp());

    if(scorp.hp <= 0){
        kitana.hp = 0;
        arenas.appendChild(playerWins(kitana.name));
    }else if(kitana.hp <= 0){
        scorp.hp = 0;
        arenas.appendChild(playerWins(scorp.name));
    } else if(scorp.hp === 0 && kitana === 0) {
        arenas.appendChild(playerWins());
    }
});