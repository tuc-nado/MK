import { getRandom } from './helpsFunc.js';
import { HIT, ATTACK } from './consts.js';
export const form = document.querySelector('.control');

/**
* @returns {Object}
*/
export function playerAttack(){
    let attack = {};

    for (const item of form) {
        if(item.checked && item.name === 'hit'){
            attack.hit = item.value;
        }
        if(item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}
