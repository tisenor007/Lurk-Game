import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";

export default class Light extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player)
        this.sightRange = 50;
        this.attackSpeed = 5;
        this.form = "Enemy/Light";
        this.speed = 1.5;
        this.attackDamage = 2;
        this.health = 25;
    }

    public Spawn():void{
        super.Spawn();
    }

    public Update():void{
        super.Update();
    }
}