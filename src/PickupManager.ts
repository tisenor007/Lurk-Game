import AssetManager from "./AssetManager";
import { MAX_PICKUPS } from "./Constants";
import HealthPotion from "./HealthPotion";
import Key from "./Key";
import Map from "./Map";
import Pickup from "./Pickup";
import Player from "./Player";
import Quiver from "./Quiver";
import Sheild from "./Sheild";
import SoundManager from "./SoundManager";
import { boxHit } from "./ToolBox";

export default class PickupManager{

    public pickups:Pickup[] = [];

    private player:Player;
    private map:Map;
    private assetManager:AssetManager;
    private stage:createjs.StageGL;
    private soundManager:SoundManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map, soundManager:SoundManager){
        this.stage = stage;
        this.player = player;
        this.map = map;
        this.assetManager = assetManager;
        this.soundManager = soundManager;
    }
    
    public InitMainPickups():void{
        for (let i:number = 0; i <= MAX_PICKUPS; i++){
            this.pickups[i] = null;
        }
        this.pickups[0] = new Key(this.stage, this.assetManager, 30, 680, this.player, this.soundManager);
        this.pickups[1] = new Quiver(this.stage, this.assetManager, 100, 30, this.player, this.soundManager);
        this.pickups[2] = new Quiver(this.stage, this.assetManager, 550, 250, this.player, this.soundManager);
        this.pickups[3] = new Sheild(this.stage, this.assetManager, 20, 300, this.player, this.soundManager);
        this.pickups[4] = new Quiver(this.stage, this.assetManager, 50, 500, this.player, this.soundManager);
        this.pickups[5] = new HealthPotion(this.stage, this.assetManager, 350, 350, this.player, this.soundManager);
        this.pickups[6] = new Quiver(this.stage, this.assetManager, 750, 450, this.player, this.soundManager);
        this.pickups[7] = new Sheild(this.stage, this.assetManager, 500, 30, this.player, this.soundManager);
        this.pickups[8] = new Quiver(this.stage, this.assetManager, 750, 750, this.player, this.soundManager);
        this.pickups[9] = new HealthPotion(this.stage, this.assetManager, 20, 450, this.player, this.soundManager);
        this.pickups[10] = new Sheild(this.stage, this.assetManager, 400, 750, this.player, this.soundManager);
    }
    public InitBossPickups():void{
        for (let i:number = 0; i <= MAX_PICKUPS; i++){
            this.pickups[i] = null;
        }
        this.pickups[0] = new Quiver(this.stage, this.assetManager, 100, 100, this.player, this.soundManager);
        this.pickups[1] = new Quiver(this.stage, this.assetManager, 600, 600, this.player, this.soundManager);
        this.pickups[2] = new Sheild(this.stage, this.assetManager, 100, 600, this.player, this.soundManager);
        this.pickups[3] = new HealthPotion(this.stage, this.assetManager, 600, 100, this.player, this.soundManager);
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