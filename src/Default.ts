import AssetManager from "./AssetManager";
import { GENERAL_MAP_SIZE } from "./Constants";
import Enemy from "./Enemy";
import Map from "./Map";
import Player from "./Player";

export default class Default extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player)
        this.sightRange = 60;
        this.attackSpeed = 15;
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