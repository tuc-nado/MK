import { getRandom } from './helpsFunc.js';
import { HIT, ATTACK } from './consts.js';
export const form = document.querySelector('.control');



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
