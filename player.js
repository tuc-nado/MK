class Player{
    constructor(props){
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }

    /**
    * 
    * @param {Number} hp 
    */
    changeHp = (hp) => {
        if(this.hp - hp > 0){
           this.hp -= hp;
        } else{
            this.hp = 0;
        }
    }
    
    /**
    * @returns {HTMLElement}
    */
    elHp = () =>{
        return document.querySelector('.player' + this.player + ' .life');
    }
    
    /**
    * @param {HTMLElement} playerLife 
    */
    renderHp = (playerLife) => {
        playerLife.style.width = this.hp + '%';
    }

}

export default Player;