import { arenas, createPlayer, generateLogs, showResult } from './interfaceFunc.js';
import { form, enemyAttack, playerAttack } from './atacks.js';
import Player from './player.js';
import { LOGS } from './consts.js';

class Game{
    constructor(){
        this.scorp = new Player({
            player: 1,
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        });
        
        this.kitana = new Player({
            player: 2,
            name: 'Kitana',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',  
        });
    }

    start = () => {
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const enemy = enemyAttack();
            const player = playerAttack();
        
            if(enemy.hit !== player.defence){
                this.scorp.changeHp(enemy.value);
                this.scorp.renderHp(this.scorp.elHp());
                generateLogs(LOGS, 'hit', this.kitana, this.scorp, enemy.value)
            } else{
                generateLogs(LOGS, 'defence', this.kitana, this.scorp)
            }
            if(player.hit !== enemy.defence){
                this.kitana.changeHp(player.value);
                this.kitana.renderHp(this.kitana.elHp());
                generateLogs(LOGS, 'hit', this.scorp, this.kitana, player.value)
            } else{
                generateLogs(LOGS, 'defence', this.scorp, this.kitana)
            }
        
            showResult(this.scorp, this.kitana);
        }); 

        generateLogs(LOGS, 'start', this.kitana, this.scorp);
        arenas.appendChild(createPlayer(this.scorp));
        arenas.appendChild(createPlayer(this.kitana));
    }
}


export default Game;