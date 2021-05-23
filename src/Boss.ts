import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";

export default class Boss extends Enemy{

    public eventBossKilled:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player);
        this.eventBossKilled = new createjs.Event("gameWon", true, false);
        this.sightRange = 12000;
        this.attackSpeed = 50;
        this.speed = 1;
        this.attackDamage = 30;
        this.health = 300;
        //idle animations
        this.formIdleDown = "Boss/Boss";
        this.formIdleUp = "Boss/Boss";
        this.formIdleLeft = "Boss/Boss";
        this.formIdleRight = "Boss/Boss";

        //walk animations
        this.formWalkUp = "Boss/Boss";
        this.formWalkDown = "Boss/Boss";
        this.formWalkLeft = "Boss/Boss";
        this.formWalkRight = "Boss/Boss";

        //attack animations
        this.formAttackUp = "Boss/Boss";
        this.formAttackDown = "Boss/Boss";
        this.formAttackLeft = "Boss/Boss";
        this.formAttackRight = "Boss/Boss";
    }

    public Spawn():void{
        super.Spawn();
        this.health = 300;
    }

    public KillMe():void{
        super.KillMe();
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.stage.removeChild(this.sprite);
            this.stage.removeChild(this.healthBar);
            this.stage.removeChild(this.healthBarBack);
            this.stage.dispatchEvent(this.eventBossKilled);
        }, this, true)
        this.sprite.gotoAndPlay("Boss/Boss");
    }

    public Update():void{
        super.Update();
    }

}