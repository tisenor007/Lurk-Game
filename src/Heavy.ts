import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";

export default class Heavy extends Enemy{
    

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player)
        this.sightRange = 90;
        this.attackSpeed = 40;
        this.speed = 0.5;
        this.attackDamage = 10;
        this.health = 75;

        //idle animations
        this.formIdleDown = "Heavy/Heavy";
        this.formIdleUp = "Heavy/Heavy";
        this.formIdleLeft = "Heavy/Heavy";
        this.formIdleRight = "Heavy/Heavy";

        //walk animations
        this.formWalkUp = "Heavy/Heavy";
        this.formWalkDown = "Heavy/Heavy";
        this.formWalkLeft = "Heavy/Heavy";
        this.formWalkRight = "Heavy/Heavy";

        //attack animations
        this.formAttackUp = "Heavy/Heavy";
        this.formAttackDown = "Heavy/Heavy";
        this.formAttackLeft = "Heavy/Heavy";
        this.formAttackRight = "Heavy/Heavy";
    }

    public Spawn():void{
        super.Spawn();
    }
    
    public KillMe():void{
        super.KillMe();
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.stage.removeChild(this.sprite);
            this.stage.removeChild(this.healthBar);
            this.stage.removeChild(this.healthBarBack);
        }, this, true)
        this.sprite.gotoAndPlay("Heavy/Heavy");
    }

    public Update():void{
        super.Update();
    }
}