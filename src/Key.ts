import AssetManager from "./AssetManager";
import Pickup from "./Pickup";
import Player from "./Player";
import SoundManager from "./SoundManager";

export default class Key extends Pickup{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, xLoc, yLoc, player, soundManager);
        this.form = "Item/key";
    }

    public UsePickup():void{
        super.UsePickup();
        if (this.used == false){
            this.player.hasKey = true;
            this.stage.dispatchEvent(this.player.playerHasKey);
            this.used = true;
        }
    }
}