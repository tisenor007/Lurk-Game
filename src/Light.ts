import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import GameCharacter from "./GameCharacter";
import Map from "./Map";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Light extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, xLoc, yLoc, player, soundManager)
        this.sightRange = 50;
        this.attackSpeed = 5;
        this.speed = 1.5;
        this.attackDamage = 2;
        this.health = 25;

        //idle animations
        this.formIdleDown = "Light/idleDown";
        this.formIdleUp = "Light/idleUp";
        this.formIdleLeft = "Light/idleLeft";
        this.formIdleRight = "Light/idleRight";

        //walk animations
        this.formWalkUp = "Light/floatUp";
        this.formWalkDown = "Light/floatDown";
        this.formWalkLeft = "Light/floatLeft";
        this.formWalkRight = "Light/floatRight";

        //attack animations
        this.formAttackUp = "Light/attack";
        this.formAttackDown = "Light/attack";
        this.formAttackLeft = "Light/attack";
        this.formAttackRight = "Light/attack";
    }

    public Spawn():void{
        super.Spawn();
    }

    public KillMe():void{
        super.KillMe();
        this.soundManager.PlayEnemyDeath();
        //enemy is removed when killed....
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.stage.removeChild(this.sprite);
            this.stage.removeChild(this.healthBar);
            this.stage.removeChild(this.healthBarBack);
        }, this, true)
        this.sprite.gotoAndPlay("Light/death");
    }

    //plays hurt sound when damage is taken...
    public TakeDamage(damage:number):void{
        super.TakeDamage(damage);
        this.soundManager.PlayEnemyHurt();
    }

    public Update():void{
        super.Update();

        //attack sound is played when enemy attacks
        if (this.attackCoolDown == this.attackSpeed){
            this.soundManager.PlayEnemyAttack();
        }
    }
}