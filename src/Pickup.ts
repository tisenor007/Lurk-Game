import AssetManager from "./AssetManager";
import { GENERAL_MAP_SIZE } from "./Constants";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Pickup{

    public originPointX:number;
    public originPointY:number;
    public sprite:createjs.Sprite;
    public form:string;
    public used:boolean = false;
    protected player:Player;
    private stage:createjs.StageGL;
    private soundManager:SoundManager;
    

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        this.stage = stage;
        this.player = player;
        this.soundManager = soundManager;
        this.sprite = assetManager.getSprite("assets", this.form);
        this.originPointX = +(player.originPointX - GENERAL_MAP_SIZE/2) + xLoc;
        this.originPointY = +(player.originPointY - GENERAL_MAP_SIZE/2) + yLoc;
    }

    public Spawn():void{
        this.used = false;
        this.sprite.gotoAndPlay(this.form);
        this.sprite.x = this.originPointX;
        this.sprite.y = this.originPointY;
        this.stage.addChild(this.sprite);
    }

    public UsePickup():void{
        this.soundManager.PlayItemPickup();
        this.stage.removeChild(this.sprite);
    }
}