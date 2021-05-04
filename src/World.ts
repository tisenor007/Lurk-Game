import AssetManager from "./AssetManager";
import Player from "./Player";

export default class World{

    public offsetX:number;
    public offsetY:number;
    private player:Player;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        this.stage = stage;
        this.player = player;
    }

    public Update():void{
        this.offsetX = this.player.xLoc;
        this.offsetY = this.player.yLoc; 
    }
}