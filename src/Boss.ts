import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Boss extends Enemy{

    public eventBossKilled:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, xLoc, yLoc, player, soundManager);
        this.eventBossKilled = new createjs.Event("gameWon", true, false);
        this.sightRange = 12000;
        this.attackSpeed = 50;
        this.speed = 1;
        this.attackDamage = 30;
        this.health = 300;
        //idle animations
        this.formIdleDown = "Boss/idleDown";
        this.formIdleUp = "Boss/idleUp";
        this.formIdleLeft = "Boss/idleLeft";
        this.formIdleRight = "Boss/idleRight";

        //walk animations
        this.formWalkUp = "Boss/floatUp";
        this.formWalkDown = "Boss/floatDown";
        this.formWalkLeft = "Boss/floatLeft";
        this.formWalkRight = "Boss/floatRight";

        //attack animations
        this.formAttackUp = "Boss/attack";
        this.formAttackDown = "Boss/attack";
        this.formAttackLeft = "Boss/attack";
        this.formAttackRight = "Boss/attack";
    }

    public Spawn():void{
        super.Spawn();
        this.health = 300;
    }

    public KillMe():void{
        super.KillMe();
        this.soundManager.PlayBossDeath();
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.stage.removeChild(this.sprite);
            this.stage.removeChild(this.healthBar);
            this.stage.removeChild(this.healthBarBack);
            this.stage.dispatchEvent(this.eventBossKilled);
        }, this, true)
        this.sprite.gotoAndPlay("Boss/death");
    }

    public TakeDamage(damage:number):void{
        super.TakeDamage(damage);
        this.soundManager.PlayBossHurt();
    }

    public Update():void{
        super.Update();

        if (this.attackCoolDown == this.attackSpeed){
            this.soundManager.PlayBossAttack();
        }
    }

}