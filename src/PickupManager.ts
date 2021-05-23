import AssetManager from "./AssetManager";
import { MAX_PICKUPS } from "./Constants";
import HealthPotion from "./HealthPotion";
import Key from "./Key";
import Map from "./Map";
import Pickup from "./Pickup";
import Player from "./Player";
import Quiver from "./Quiver";
import Sheild from "./Sheild";
import { boxHit } from "./ToolBox";

export default class PickupManager{

    public pickups:Pickup[] = [];

    private player:Player;
    private map:Map;
    private assetManager:AssetManager;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map){
        this.stage = stage;
        this.player = player;
        this.map = map;
        this.assetManager = assetManager;
    }
    
    public InitMainPickups():void{
        for (let i:number = 0; i <= MAX_PICKUPS; i++){
            this.pickups[i] = null;
        }
        this.pickups[0] = new Key(this.stage, this.assetManager, 20, 30, this.player);
    }

    public SpawmPickups():void{
        for (let i:number = 0; i <= MAX_PICKUPS; i++){
            if (this.pickups[i] == null){}
            else{
                this.pickups[i].Spawn();
            }
        }
    }

    public MonitorCollisions(interact:boolean):void{
        for (let p:number = 0; p <= MAX_PICKUPS; p++){
            if (this.pickups[p] == null){return;}
            if (boxHit(this.player.sprite, this.pickups[p].sprite)){
                if (this.pickups[p].used == false && interact == true){
                    this.pickups[p].UsePickup();
                }
            }
        }
    }
}