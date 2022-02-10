const scorp = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'Кунай',
    attack: function(){
        console.log(this.name + ' fight');
    }
};

const kitana = {
    name: 'Kitana',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: 'Веер',
    attack: function(){
        console.log(this.name + ' fight');
    }
};

const arenas = document.getElementsByClassName('arenas')[0];
// ---------------------------------- TASK#2 ----------------------------------------------
// function createPlayer(playerClass, playerName, hp){
//     let player = document.createElement('div');
//     player.classList.add(playerClass);

//     let progressbar = document.createElement('div');
//     progressbar.classList.add('progressbar');
//     let life = document.createElement('div');
//     life.classList.add('life');
//     life.style.width = '100%';
//     life.innerText = hp
//     let name = document.createElement('div');
//     name.classList.add('name');
//     name.innerText = playerName;
//     progressbar.appendChild(life);
//     progressbar.appendChild(name);

//     let character = document.createElement('div');
//     character.classList.add('character');
//     let img = document.createElement('img');
//     img.src = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif';
//     character.appendChild(img);

//     player.appendChild(progressbar);
//     player.appendChild(character);

//     arenas.appendChild(player);
// }
// createPlayer('player1', 'liukang', 80);


// ---------------------------------- TASK#3 ----------------------------------------------
function createPlayer(playerClass, playerObj){
    let player = document.createElement('div');
    player.classList.add(playerClass);

    let progressbar = document.createElement('div');
    progressbar.classList.add('progressbar');
    let life = document.createElement('div');
    life.classList.add('life');
    life.style.width = '100%';
    life.innerText = playerObj.hp
    let name = document.createElement('div');
    name.classList.add('name');
    name.innerText = playerObj.name;
    progressbar.appendChild(life);
    progressbar.appendChild(name);

    let character = document.createElement('div');
    character.classList.add('character');
    let img = document.createElement('img');
    img.src = playerObj.img;
    character.appendChild(img);

    player.appendChild(progressbar);
    player.appendChild(character);

    arenas.appendChild(player);
}
createPlayer('player1', scorp);
createPlayer('player2', kitana);
