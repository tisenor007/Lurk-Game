import AssetManager from "./AssetManager";
import { GENERAL_MAP_SIZE } from "./Constants";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Default extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, xLoc, yLoc, player, soundManager)
        this.sightRange = 60;
        this.attackSpeed = 15;
        this.speed = 1;
        this.attackDamage = 5;
        this.health = 50;

        //idle animations
        this.formIdleDown = "Default/Default";
        this.formIdleUp = "Default/Default";
        this.formIdleLeft = "Default/Default";
        this.formIdleRight = "Default/Default";

        //walk animations
        this.formWalkUp = "Default/Default";
        this.formWalkDown = "Default/Default";
        this.formWalkLeft = "Default/Default";
        this.formWalkRight = "Default/Default";

        //attack animations
        this.formAttackUp = "Default/Default";
        this.formAttackDown = "Default/Default";
        this.formAttackLeft = "Default/Default";
        this.formAttackRight = "Default/Default";
    }

    public Spawn():void{
        super.Spawn();
    }

    public KillMe():void{
        super.KillMe();
        this.soundManager.PlayEnemyDeath();
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.stage.removeChild(this.sprite);
            this.stage.removeChild(this.healthBar);
            this.stage.removeChild(this.healthBarBack);
        }, this, true)
        this.sprite.gotoAndPlay("Default/Default");
    }
    public TakeDamage(damage:number):void{
        super.TakeDamage(damage);
        this.soundManager.PlayEnemyHurt();
    }

    public Update():void{
        super.Update();
        
        if (this.attackCoolDown == this.attackSpeed){
            this.soundManager.PlayEnemyAttack();
        }
    }
}