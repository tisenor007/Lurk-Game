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
        this.form = "Enemy/Boss";
        this.speed = 1;
        this.attackDamage = 30;
        this.health = 300;
    }

    public Spawn():void{
        super.Spawn();
        this.health = 300;
    }

    public KillMe():void{
        super.KillMe();
        this.stage.dispatchEvent(this.eventBossKilled); 
    }

    public Update():void{
        super.Update();
    }

}