import ArrowManager from "./ArrowManager";
import AssetManager from "./AssetManager";
import Camera from "./Camera";
import { PLAYER_MAX_HEALTH, PLAYER_MAX_SHIELD, STAGE_HEIGHT, STAGE_WIDTH, STARTING_ARROW_AMOUNT } from "./Constants";
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
    private arrowManager:ArrowManager;
    private loadingScreen:createjs.Sprite;
    private darkOverlay:createjs.Sprite;
    private loadingDuration:number;
    private soundManager:SoundManager;
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map, enemyManager:EnemyManager, pickupManager:PickupManager, hud:HUD, arrowManager:ArrowManager, soundManager:SoundManager){
        this.stage = stage;
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager;
        this.pickupManager = pickupManager;
        this.hud = hud;
        this.arrowManager = arrowManager;
        this.soundManager = soundManager;
        this.darkOverlay = assetManager.getSprite("assets", "other/darkness",STAGE_WIDTH/2, STAGE_HEIGHT/2)
        this.loadingScreen = assetManager.getSprite("assets", "other/loading", STAGE_WIDTH/2, STAGE_HEIGHT/2);
    }

    //loads everything in main level.....
    public LoadMainLevel():void{
        this.soundManager.StopMusic();
        this.stage.removeAllChildren();
        //will load loading screen for random amount of time.....
        this.gameLoaded = false;
        this.loadingDuration = randomNum(50, 100);
        
        this.arrowManager.ResetArrows();
        this.player.ResetStats();
        this.map.LoadMain();
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

    //loads everything in boss level.....
    public LoadBossLevel():void{
        this.soundManager.StopMusic();
        this.stage.removeAllChildren();
        this.gameLoaded = false;
        this.loadingDuration = randomNum(50, 100);

        this.arrowManager.ResetArrows();
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
            //plays music based on level....
            if (this.map.mainLoaded == true){
                this.soundManager.PlayGameMusic();
            }
            if (this.map.bossLoaded == true){
                this.soundManager.PlayBossMusic();
            }
            //removes screen a little after game is loaded...
            this.loadingScreen.on("animationend", (e:createjs.Event) => {
                this.stage.removeChild(this.loadingScreen);
            }, this, true)
        }
    }
}