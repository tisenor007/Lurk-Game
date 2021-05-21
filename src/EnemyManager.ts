import AssetManager from "./AssetManager";
import Boss from "./Boss";
import { MAX_ENEMIES } from "./Constants";
import Default from "./Default";
import Enemy from "./Enemy";
import Heavy from "./Heavy";
import Light from "./Light";
import Map from "./Map";
import Player from "./Player";
import { boxHit, radiusHit } from "./ToolBox";

export default class EnemyManager{

    private assetManager:AssetManager;
    private stage:createjs.StageGL;
    private player:Player;
    private map:Map;

    public enemies:Enemy[] = [];

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map){
        this.stage = stage;
        this.player = player;
        this.map = map;
        this.assetManager = assetManager;
    }   

    public InitMainEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            this.enemies[i] = null;
        }
        this.enemies[0] = new Default(this.stage, this.assetManager, 200, 50, this.player);
        this.enemies[1] = new Light(this.stage, this.assetManager, 600, 200, this.player);
        this.enemies[2] = new Heavy(this.stage, this.assetManager, 400, 400, this.player);
        this.enemies[3] = new Default(this.stage, this.assetManager, 600, 750, this.player);
    }
    public InitBossEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            this.enemies[i] = null;
        }
        this.enemies[0] = new Boss(this.stage, this.assetManager, 300, 300, this.player);
    }
    

    public SpawmEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            if (this.enemies[i] == null){}
            else{
                this.enemies[i].Spawn();
            }
        }
    }

    public UpdateEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            if (this.enemies[i] == null){}
            else{
                this.enemies[i].Update();
            }
        }
    }

    public MonitorCollisions():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            if (this.enemies[i] == null){}
            else{
                if (radiusHit(this.enemies[i].sprite, this.enemies[i].sightRange, this.player.sprite, this.enemies[i].sightRange) == true){
                    this.enemies[i].isIdle = false;
                    this.enemies[i].state = Enemy.CHASING;
                }
                if (boxHit(this.enemies[i].sprite, this.player.sprite) == true){
                    if (this.enemies[i].isIdle == false){
                        this.enemies[i].state = Enemy.ATTACKING;
                    }
                }
                else if (radiusHit(this.enemies[i].sprite, this.enemies[i].sightRange, this.player.sprite, this.enemies[i].sightRange) == false){
                    if (this.enemies[i].isIdle == false){
                        this.enemies[i].state = Enemy.RETREATING;
                        this.enemies[i].isIdle = true;
                    }
                }
                else if (boxHit(this.enemies[i].sprite, this.player.sprite) == false){
                    if (this.enemies[i].isIdle == false){
                        this.enemies[i].state = Enemy.CHASING;
                    }
                }
                if(this.enemies[i].canWalk == true){
                    if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.floor, this.enemies[i].speed) == false){this.enemies[i].state == Enemy.ROAMING;}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.northWall) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.westWall) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.southWall) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallOne) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallTwo) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallThree) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallFour) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallFive) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallSix) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallSeven) == true){this.enemies[i].TurnAround();}
                    // else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallEight) == true){this.enemies[i].TurnAround();}
                }
            }
        }
    }
}