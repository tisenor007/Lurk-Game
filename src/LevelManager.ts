import AssetManager from "./AssetManager";
import Camera from "./Camera";
import { PLAYER_MAX_HEALTH, PLAYER_MAX_SHIELD, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import EnemyManager from "./EnemyManager";
import HUD from "./HUD";
import Map from "./Map";
import Player from "./Player";
import { randomNum } from "./ToolBox";
import World from "./World";

export default class LevelManager{

    public gameLoaded:boolean = false;
    private stage:createjs.StageGL;
    private player:Player;
    private map:Map;
    private enemyManager:EnemyManager;
    private hud:HUD;

    private loadingScreen:createjs.Sprite;
    private darkOverlay:createjs.Sprite;
    private loadingDuration:number;
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map, enemyManager:EnemyManager, hud:HUD){
        this.stage = stage;
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager
        this.hud = hud;
        this.darkOverlay = assetManager.getSprite("assets", "other/darkness",STAGE_WIDTH/2, STAGE_HEIGHT/2)
        this.loadingScreen = assetManager.getSprite("assets", "other/loading", STAGE_WIDTH/2, STAGE_HEIGHT/2);
    }

    public LoadMainLevel():void{
        this.stage.removeAllChildren();
        this.gameLoaded = false;
        this.loadingDuration = randomNum(50, 100);
        this.map.LoadMain();
        this.player.health = PLAYER_MAX_HEALTH;
        this.player.shield = PLAYER_MAX_SHIELD;
        this.player.SpawnPlayer(20, 30);
        this.enemyManager.InitMainEnemies();
        this.enemyManager.SpawmEnemies();
        this.stage.addChild(this.darkOverlay);
        this.hud.ShowHUD();
        this.stage.addChild(this.loadingScreen);
        this.loadingScreen.play();
    }

    public LoadBossLevel():void{
        this.stage.removeAllChildren();
        this.gameLoaded = false;
        this.loadingDuration = randomNum(50, 100);
        this.map.LoadBoss();
        this.player.SpawnPlayer(100, 100);
        this.enemyManager.InitBossEnemies();
        this.enemyManager.SpawmEnemies();
        this.stage.addChild(this.darkOverlay);
        this.hud.ShowHUD();
        this.stage.addChild(this.loadingScreen);
        this.loadingScreen.play();
    }

    public UpdateLoadingScreen():void{
        this.loadingDuration--;
        if (this.loadingDuration == 0){
            this.gameLoaded = true;
            this.loadingScreen.on("animationend", (e:createjs.Event) => {
                this.stage.removeChild(this.loadingScreen);
            }, this, true)
        }
    }
}