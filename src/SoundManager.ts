import AssetManager from "./AssetManager";

export default class SoundManager{

    private stage:createjs.StageGL
    private titlePlaying:boolean = false;
    private audio = new Audio("./lib/sounds/titlemusic.wav");

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;
        createjs.Sound.setVolume(0.20);
    }

    //methods for each sound... could add more to each method for more effect...
    public PlayArrowShoot():void{
        createjs.Sound.play("arrowFire");
    }
    public PlayItemPickup():void{
        createjs.Sound.play("itemPickup");
    }
    public PlayPlayerHurt():void{
        createjs.Sound.play("playerHurt");
    }
    public PlayPlayerDeath():void{
        createjs.Sound.play("playerDeath");
    }
    public PlayEnemyHurt():void{
        createjs.Sound.play("enemyHurt");
    }
    public PlayEnemyDeath():void{
        createjs.Sound.play("enemyDeath");
    }
    public PlayEnemyAttack():void{
        createjs.Sound.play("enemyAttack");
    }
    public PlayBossHurt():void{
        createjs.Sound.play("bossHurt");
    }
    public PlayBossDeath():void{
        createjs.Sound.play("bossDeath");
    }
    public PlayBossAttack():void{
        createjs.Sound.play("bossAttack");
    }
    public PlayTitleMusic():void{
        createjs.Sound.stop();
        //loops sound...
        createjs.Sound.play("titleMusic").loop = Infinity;
    }
    public PlayGameMusic():void{
        createjs.Sound.stop();
        createjs.Sound.play("mainLevelMusic").loop = Infinity;
    }
    public PlayBossMusic():void{
        createjs.Sound.stop();
        createjs.Sound.play("bossMusic").loop = Infinity;
    }
    public PlayWinMusic():void{
        createjs.Sound.stop();
        createjs.Sound.play("gameWin").loop = Infinity;
    }
    public PlayLossMusic():void{
        createjs.Sound.stop();
        createjs.Sound.play("gameLoss").loop = Infinity;
    }
    public StopMusic():void{
        createjs.Sound.stop();
    }

}