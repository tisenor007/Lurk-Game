import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Heavy extends Enemy{
    

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, xLoc, yLoc, player, soundManager)
        this.sightRange = 90;
        this.attackSpeed = 40;
        this.speed = 0.5;
        this.attackDamage = 10;
        this.health = 75;

        //idle animations
        this.formIdleDown = "Heavy/idleDown";
        this.formIdleUp = "Heavy/idleUp";
        this.formIdleLeft = "Heavy/idleLeft";
        this.formIdleRight = "Heavy/idleRight";

        //walk animations
        this.formWalkUp = "Heavy/walkUp";
        this.formWalkDown = "Heavy/walkDown";
        this.formWalkLeft = "Heavy/walkLeft";
        this.formWalkRight = "Heavy/walkRight";

        //attack animations
        this.formAttackUp = "Heavy/attackUp";
        this.formAttackDown = "Heavy/attackDown";
        this.formAttackLeft = "Heavy/attackLeft";
        this.formAttackRight = "Heavy/attackRight";
    }

    public Spawn():void{
        super.Spawn();
    }
    
    public KillMe():void{
        super.KillMe();
        this.soundManager.PlayEnemyDeath();
        //removes enemy on death.....
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.stage.removeChild(this.sprite);
            this.stage.removeChild(this.healthBar);
            this.stage.removeChild(this.healthBarBack);
        }, this, true)
        this.sprite.gotoAndPlay("Heavy/death");
    }

    //hurt sound for enemy when damage is removed....
    public TakeDamage(damage:number):void{
        super.TakeDamage(damage);
        this.soundManager.PlayEnemyHurt();
    }

    public Update():void{
        super.Update();
        //when enemy is attacking, attack sound plays
        if (this.attackCoolDown == this.attackSpeed){
            this.soundManager.PlayEnemyAttack();
        }
    }
}