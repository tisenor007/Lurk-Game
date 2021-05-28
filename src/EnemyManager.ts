import AssetManager from "./AssetManager";
import Boss from "./Boss";
import { MAX_ENEMIES } from "./Constants";
import Default from "./Default";
import Enemy from "./Enemy";
import Heavy from "./Heavy";
import Light from "./Light";
import Map from "./Map";
import Player from "./Player";
import SoundManager from "./SoundManager";
import { boxHit, radiusHit } from "./ToolBox";

export default class EnemyManager{

    public enemies:Enemy[] = [];
    
    private assetManager:AssetManager;
    private stage:createjs.StageGL;
    private player:Player;
    private map:Map;
    private soundManager:SoundManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map, soundManager:SoundManager){
        this.stage = stage;
        this.soundManager = soundManager;
        this.player = player;
        this.map = map;
        this.assetManager = assetManager;
    }   

    //inits enemy based off level.....
    public InitMainEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            this.enemies[i] = null;
        }
        this.enemies[0] = new Default(this.stage, this.assetManager, 200, 50, this.player, this.soundManager);
        this.enemies[1] = new Light(this.stage, this.assetManager, 550, 200, this.player, this.soundManager);
        this.enemies[2] = new Heavy(this.stage, this.assetManager, 400, 400, this.player, this.soundManager);
        this.enemies[3] = new Default(this.stage, this.assetManager, 600, 735, this.player, this.soundManager);
        this.enemies[4] = new Light(this.stage, this.assetManager, 10, 650, this.player, this.soundManager);
        this.enemies[5] = new Default(this.stage, this.assetManager, 10, 350, this.player, this.soundManager);
        this.enemies[6] = new Light(this.stage, this.assetManager, 600, 350, this.player, this.soundManager);
        this.enemies[7] = new Light(this.stage, this.assetManager, 350, 540, this.player, this.soundManager);
        this.enemies[8] = new Default(this.stage, this.assetManager, 400, 50, this.player, this.soundManager);
        this.enemies[9] = new Heavy(this.stage, this.assetManager, 10, 450, this.player, this.soundManager);
        this.enemies[10] = new Default(this.stage, this.assetManager, 250, 720, this.player, this.soundManager);
    }
    public InitBossEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            this.enemies[i] = null;
        }
        this.enemies[0] = new Boss(this.stage, this.assetManager, 300, 300, this.player, this.soundManager);
        this.enemies[1] = new Light(this.stage, this.assetManager, 100, 100, this.player, this.soundManager);
        this.enemies[2] = new Light(this.stage, this.assetManager, 600, 600, this.player, this.soundManager);
    }
    

    //spawns enemies
    public SpawmEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            if (this.enemies[i] == null){}
            else{
                this.enemies[i].Spawn();
            }
        }
    }

    //updates enemies
    public UpdateEnemies():void{
        for (let i:number = 0; i <= MAX_ENEMIES; i++){
            if (this.enemies[i] == null){}
            else{
                this.enemies[i].Update();
            }
        }
    }

    //monitors collision to know when it should attacking the player or not......
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
                
                //wall collision checking.......
                //SUHHUUPER Messy but very accurate
                if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.westWall,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.northWall,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.eastWall,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.southWall,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallOne,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallTwo,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallThree,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallFour,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallFive,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallSix,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallSeven,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
                else if (this.map.IsCollidingWithWall(this.enemies[i].sprite, this.enemies[i].direction, this.map.centerWallEight,  this.enemies[i].speed) == true){
                    if (this.enemies[i].direction == 1){this.enemies[i].wallHitUp = true;}
                    if (this.enemies[i].direction == 2){this.enemies[i].wallHitDown = true;}
                    if (this.enemies[i].direction == 3){this.enemies[i].wallHitLeft = true;}
                    if (this.enemies[i].direction == 4){this.enemies[i].wallHitRight = true;}
                }
            }
        }
    }
}