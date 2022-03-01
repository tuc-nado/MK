import { getRandom } from './helpsFunc.js';
export const form = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

/**
* @returns {Object}
*/
export function enemyAttack(){
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
export function playerAttack(){
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
export function changeHp(hp){
    if(this.hp - hp > 0){
       this.hp -= hp;
    } else{
        this.hp = 0;
    }
}

/**
* @returns {HTMLElement}
*/
export function elHp(){
    return document.querySelector('.player' + this.player + ' .life');
}

/**
* @param {HTMLElement} playerLife 
*/
export function renderHp(playerLife){
    playerLife.style.width = this.hp + '%';
}