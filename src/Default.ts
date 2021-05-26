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
        this.formIdleDown = "Default/idleDown";
        this.formIdleUp = "Default/idleUp";
        this.formIdleLeft = "Default/idleLeft";
        this.formIdleRight = "Default/idleRight";

        //walk animations
        this.formWalkUp = "Default/walkUp";
        this.formWalkDown = "Default/walkDown";
        this.formWalkLeft = "Default/walkLeft";
        this.formWalkRight = "Default/walkRight";

        //attack animations
        this.formAttackUp = "Default/attack";
        this.formAttackDown = "Default/attack";
        this.formAttackLeft = "Default/attack";
        this.formAttackRight = "Default/attack";
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
        this.sprite.gotoAndPlay("Default/death");
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