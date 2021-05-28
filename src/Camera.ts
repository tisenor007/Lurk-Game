import AssetManager from "./AssetManager";
import Player from "./Player";

export default class Camera{

    private stage:createjs.StageGL;
    private player:Player;
    public offsetX:number;
    public offsetY:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        this.stage = stage;
        this.player = player;
       
    }

    public Update():void{
        // takes in player location to offset other things in world to fake camera effect......
        this.offsetX = this.player.xLoc;
        this.offsetY = this.player.yLoc;
    }
}