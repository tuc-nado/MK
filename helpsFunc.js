/**
 * 
 * @param {string} tag 
 * @param {string} tagClass 
 * @returns 
 */
export const createElement = (tag, tagClass) => {
    let el = document.createElement(tag);
    if(tagClass){
        el.classList.add(tagClass);
    }
    return el;
}

/** 
* @param {number} range 
* @returns {number}
*/
export const getRandom = (range) => {
    return Math.ceil(Math.random()*range);
}
