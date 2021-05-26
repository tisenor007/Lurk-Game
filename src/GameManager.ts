import Arrow from "./Arrow";
import AssetManager from "./AssetManager";
import { MAX_ARROWS_ON_SCREEN, MAX_ENEMIES, PLAYER_MAX_LIVES, STARTING_ARROW_AMOUNT } from "./Constants";
import EnemyManager from "./EnemyManager";
import GameCharacter from "./GameCharacter";
import LevelManager from "./LevelManager";
import Map from "./Map";
import PickupManager from "./PickupManager";
import Player from "./Player";
import ScreenManager from "./ScreenManager";
import { boxHit, radiusHit } from "./ToolBox";

export default class GameManager{

    private stage:createjs.StageGL;
    private levelManager:LevelManager;
    private screenManager:ScreenManager;
    private enemyManager:EnemyManager;
    private pickupManager:PickupManager;
    private map:Map;
    private player:Player;
    private maxArrowsOnScreen:Arrow[] = [];
    private assetManager:AssetManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, levelManager:LevelManager, screenManager:ScreenManager, player:Player, enemyManager:EnemyManager, pickupManager:PickupManager, maxArrowsOnScreen:Arrow[], map:Map){
        this.stage = stage;
        this.assetManager = assetManager;
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager;
        this.levelManager = levelManager;
        this.screenManager = screenManager;
        this.pickupManager = pickupManager;
        this.maxArrowsOnScreen = maxArrowsOnScreen;
        
        this.stage.on("gameStart", this.OnGameEvent, this);
        this.stage.on("gameRestart", this.OnGameEvent, this);
        this.stage.on("pKilled", this.OnGameEvent, this);
        this.stage.on("gameWon", this.OnGameEvent, this);
        this.stage.on("pHasKey", this.OnGameEvent, this);
    }

    public OnGameEvent(e:createjs.Event):void{
        switch (e.type){
            case "gameStart":
                this.player.lives = PLAYER_MAX_LIVES;
                this.player.availableArrows = STARTING_ARROW_AMOUNT;
                this.levelManager.LoadMainLevel();
                break;
            case "pKilled":
                if (this.player.lives >= 0){this.levelManager.LoadMainLevel();}
                else if (this.player.lives < 0){this.screenManager.ShowGameOverScreen();}
                break;
            case "gameWon":
                this.map.bossStartDoor.gotoAndStop("other/doorOpenDown");
                this.screenManager.ShowGameWinScreen();
                break;
            case "gameRestart":
                this.screenManager.ShowIntroScreen();
                break;
            case "pHasKey" :
                this.map.mainEndDoor.gotoAndStop("other/doorOpenUp");
                break;
        }
    }

    public MonitorCollisions(interact:boolean):void{
        if (this.map.mainLoaded == true){
            if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.eastWall, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.northWall, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.westWall, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.southWall, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallOne, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallTwo, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallThree, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallFour, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallFive, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallSix, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallSeven, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.centerWallEight, this.player.speed) == true){this.player.canWalk = false;}
            else{ this.player.canWalk = true;}
            if (radiusHit(this.player.sprite, 1, this.map.mainEndDoor, 30) && this.player.hasKey == true && interact == true){
                this.levelManager.LoadBossLevel();
            }
        }
        if (this.map.bossLoaded == true){
            if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.eastWall, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.northWall, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.westWall, this.player.speed) == true){this.player.canWalk = false;}
            else if (this.map.IsCollidingWithWall(this.player.sprite, this.player.direction, this.map.southWall, this.player.speed) == true){this.player.canWalk = false;}
            else{ this.player.canWalk = true;}
        }
        else{//nothing
        }
    
        this.pickupManager.MonitorCollisions(interact);
        this.enemyManager.MonitorCollisions();
        
        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
            for (let e:number = 0; e <= MAX_ENEMIES; e++){
                if (this.enemyManager.enemies[e] == null){return;
                }
                if (boxHit(this.maxArrowsOnScreen[i].sprite, this.enemyManager.enemies[e].sprite)){
                    if (this.enemyManager.enemies[e].vitalStatus == GameCharacter.ALIVE && this.maxArrowsOnScreen[i].used == true){
                        this.enemyManager.enemies[e].TakeDamage(this.player.attackDamage);
                        this.maxArrowsOnScreen[i].remove();
                    }
                }
            }
        } 
    
    }
}