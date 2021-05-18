import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Player from "./Player";

export default class Boss extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player)
        this.sightRange = 12000;
        this.attackSpeed = 150;
        this.form = "Enemy/Boss";
        this.speed = 1;
        this.attackDamage = 30;
        this.health = 300;
    }

    public Spawn():void{
        super.Spawn();
        this.health = 300;
    }

    public Update():void{
        super.Update();
    }

}