import AssetManager from "./AssetManager";
import Pickup from "./Pickup";
import Player from "./Player";

export default class Key extends Pickup{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, xLoc, yLoc, player);
        this.form = "Item/key";
    }

    public UsePickup():void{
        super.UsePickup();
        if (this.used == false){
            this.player.hasKey = true;
            this.used = true;
        }
    }
}