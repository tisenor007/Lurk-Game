import AssetManager from "./AssetManager";
import Camera from "./Camera";
import { PLAYER_MAX_HEALTH, PLAYER_MAX_SHIELD, STAGE_HEIGHT } from "./Constants";
import EnemyManager from "./EnemyManager";
import HUD from "./HUD";
import Map from "./Map";
import Player from "./Player";
import World from "./World";

export default class LevelManager{

    public gameLoaded:boolean = false;
    private stage:createjs.StageGL;
    private player:Player;
    private map:Map;
    private enemyManager:EnemyManager;
    private hud:HUD;
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, map:Map, enemyManager:EnemyManager, hud:HUD){
        this.stage = stage;
        this.player = player;
        this.map = map;
        this.enemyManager = enemyManager
        this.hud = hud;
    }

    public LoadMainLevel():void{
        this.gameLoaded = true;
        this.stage.removeAllChildren();
        this.map.LoadMain();
        this.player.health = PLAYER_MAX_HEALTH;
        this.player.shield = PLAYER_MAX_SHIELD;
        this.player.SpawnPlayer(20, 30);
        this.enemyManager.InitMainEnemies();
        this.enemyManager.SpawmEnemies();
        this.hud.ShowHUD();
    }

    public LoadBossLevel():void{
        this.gameLoaded = true;
        this.stage.removeAllChildren();
        this.map.LoadBoss();
        this.player.SpawnPlayer(100, 100);
        this.enemyManager.InitBossEnemies();
        this.enemyManager.SpawmEnemies();
        this.hud.ShowHUD();
    }
}