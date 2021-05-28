import AssetManager from "./AssetManager";
import Pickup from "./Pickup";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Sheild extends Pickup{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, xLoc, yLoc, player, soundManager);
        this.form = "Item/armor";
    }

    //acts accordingly
    public UsePickup():void{
        super.UsePickup();
        if (this.used == false){
            this.player.RestoreSheild();
            this.used = true;
        }
    }
}