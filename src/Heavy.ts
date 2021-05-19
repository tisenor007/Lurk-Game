import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";

export default class Heavy extends Enemy{
    

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player)
        this.sightRange = 90;
        this.attackSpeed = 40;
        this.form = "Enemy/Heavy";
        this.speed = 0.5;
        this.attackDamage = 10;
        this.health = 75;
    }

    public Spawn():void{
        super.Spawn();
    }

    public Update():void{
        super.Update();
    }
}