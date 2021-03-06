import AssetManager from "./AssetManager";
import Pickup from "./Pickup";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Quiver extends Pickup{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, xLoc, yLoc, player, soundManager);
        this.form = "Item/arrows";
    }

    //acts accordingly....
    public UsePickup():void{
        super.UsePickup();
        if (this.used == false){
            this.player.IncreaseArrows(10);
            this.used = true;
        }
    }
}