import AssetManager from "./AssetManager";
import Camera from "./Camera";
import { PLAYER_MAX_HEALTH, PLAYER_MAX_SHIELD, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import EnemyManager from "./EnemyManager";
import HUD from "./HUD";
import Map from "./Map";
import PickupManager from "./PickupManager";
import Player from "./Player";
import SoundManager from "./SoundManager";
import { randomNum } from "./ToolBox";
import World from "./World";

export default class LevelManager{

    public gameLoaded:boolean = false;
    private stage:createjs.StageGL;
    private player:Player;
    private map:Map;
    private enemyManager:EnemyManager;
    private pickupManager:PickupManager;
    private hud:HUD;

    private loadingScreen:createjs.Sprite;
    private darkOverlay:createjs.Sprite;
    private loadingDuration:number;
    private soundManager:SoundManager;
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map, enemyManager:EnemyManager, pickupManager:PickupManager, hud:HUD, soundManager:SoundManager){
        this.stage = stage;
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager;
        this.pickupManager = pickupManager;
        this.hud = hud;
        this.soundManager = soundManager;
        this.darkOverlay = assetManager.getSprite("assets", "other/darkness",STAGE_WIDTH/2, STAGE_HEIGHT/2)
        this.loadingScreen = assetManager.getSprite("assets", "other/loading", STAGE_WIDTH/2, STAGE_HEIGHT/2);
    }

    public LoadMainLevel():void{
        this.soundManager.StopMusic();
        this.stage.removeAllChildren();
        this.gameLoaded = false;
        this.loadingDuration = randomNum(50, 100);
        this.map.LoadMain();
        this.player.health = PLAYER_MAX_HEALTH;
        this.player.shield = PLAYER_MAX_SHIELD;
        this.player.SpawnPlayer(20, 30);
        this.enemyManager.InitMainEnemies();
        this.enemyManager.SpawmEnemies();
        this.pickupManager.InitMainPickups();
        this.pickupManager.SpawmPickups();
        this.stage.addChild(this.darkOverlay);
        this.hud.ShowHUD();
        this.stage.addChild(this.loadingScreen);
        this.loadingScreen.play();
    }

    public LoadBossLevel():void{
        this.soundManager.StopMusic();
        this.stage.removeAllChildren();
        this.gameLoaded = false;
        this.loadingDuration = randomNum(50, 100);
        this.map.LoadBoss();
        this.player.SpawnPlayer(380, 650);
        this.enemyManager.InitBossEnemies();
        this.enemyManager.SpawmEnemies();
        this.pickupManager.InitBossPickups();
        this.pickupManager.SpawmPickups();
        this.stage.addChild(this.darkOverlay);
        this.hud.ShowHUD();
        this.stage.addChild(this.loadingScreen);
        this.loadingScreen.play();
    }

    public UpdateLoadingScreen():void{
        this.loadingDuration--;
        if (this.loadingDuration == 0){
            this.gameLoaded = true;
            if (this.map.mainLoaded == true){
                this.soundManager.PlayGameMusic();
            }
            if (this.map.bossLoaded == true){
                this.soundManager.PlayBossMusic();
            }
            this.loadingScreen.on("animationend", (e:createjs.Event) => {
                this.stage.removeChild(this.loadingScreen);
            }, this, true)
        }
    }
}