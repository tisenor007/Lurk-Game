import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Player from "./Player";

export default class Default extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player)
        this.sightRange = 60;
        this.attackSpeed = 50;
        this.form = "Enemy/Default";
        this.speed = 1;
        this.attackDamage = 5;
        this.health = 50;
    }

    public Spawn():void{
        super.Spawn();
    }

    public Update():void{
        super.Update();
    }
}