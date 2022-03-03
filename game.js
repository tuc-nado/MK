import { arenas, createPlayer, generateLogs, showResult } from './interfaceFunc.js';
import { form, playerAttack } from './atacks.js';
import Player from './player.js';
import { LOGS } from './consts.js';

class Game{

    getPlayer = async () => {
        const player = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

        return player
    }

    start = async () => {
        const player1 = new Player({
            ...JSON.parse(localStorage.getItem('player1')),
            player: 1, 
        });

        const pl2 = await this.getPlayer();
        const player2 = new Player({
            ...pl2,
            player: 2, 
        });

        form.addEventListener('submit', async (e)=>{
            e.preventDefault();
            let enemy, player;
            const atacksObj = playerAttack();
            await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit:  atacksObj.hit,
                    defence: atacksObj.defence,
                })
            }).then(res => res.json()).then(res => {
                enemy = res['player2'];
                player = res['player1'];
            });

        
            if(enemy.hit !== player.defence){
                player1.changeHp(enemy.value);
                player1.renderHp(player1.elHp());
                generateLogs(LOGS, 'hit', player2, player1, enemy.value)
            } else{
                generateLogs(LOGS, 'defence', player2, player1)
            }
            if(player.hit !== enemy.defence){
                player2.changeHp(player.value);
                player2.renderHp(player2.elHp());
                generateLogs(LOGS, 'hit', player1, player2, player.value)
            } else{
                generateLogs(LOGS, 'defence', player1, player2)
            }
        
            showResult(player1, player2);
        }); 

        generateLogs(LOGS, 'start', player2, player1);
        arenas.appendChild(createPlayer(player1));
        arenas.appendChild(createPlayer(player2));

        
    }
}


export default Game;