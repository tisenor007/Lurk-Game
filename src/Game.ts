// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, MAX_ARROWS_ON_SCREEN, PLAYER_SPEED, ARROW_RELOAD, MAX_ENEMIES, PLAYER_MAX_LIVES, MAX_PICKUPS} from "./Constants";
import AssetManager from "./AssetManager";
import Player from "./Player";
import Map from "./Map";
import World from "./World";
import Arrow from "./Arrow";
import HUD from "./HUD";
import { radiusHit, boxHit } from "./ToolBox";
import GameCharacter from "./GameCharacter";
import Enemy from "./Enemy";
import Heavy from "./Heavy";
import Default from "./Default";
import Light from "./Light";
import Boss from "./Boss";
import EnemyManager from "./EnemyManager";
import Camera from "./Camera";
import LevelManager from "./LevelManager";
import ScreenManager from "./ScreenManager";
import PickupManager from "./PickupManager";
import GameManager from "./GameManager";
import SoundManager from "./SoundManager";

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;

let player:Player;

//let testEnemy:Enemy;

let arrowCoolDown:number = 0;
let maxArrowsOnScreen:Arrow[] = [];

let map:Map;
let world:World;
let camera:Camera;

let hud:HUD;
// assetmanager object
let assetManager:AssetManager;
let levelManager:LevelManager;
let enemyManager:EnemyManager;
let screenManager:ScreenManager;
let pickupManager:PickupManager;
let gameManager:GameManager;
let soundManager:SoundManager;

let left:boolean = false;
let right:boolean = false;
let up:boolean = false;
let down:boolean = false;
let shoot:boolean = false;
let interact:boolean = false;
// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    // construct game objects/sprites
    // ...
    soundManager = new SoundManager(stage, assetManager);
    player = new Player(stage, assetManager, soundManager);
    camera = new Camera(stage, assetManager, player);
    map = new Map(stage, assetManager, camera);
    enemyManager = new EnemyManager(stage, assetManager, player, map, soundManager);
    pickupManager = new PickupManager(stage, assetManager, player, map, soundManager);
    for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){maxArrowsOnScreen[i] = new Arrow(stage, assetManager, world, player, soundManager);}
    world = new World(stage, assetManager, player, maxArrowsOnScreen, enemyManager.enemies, pickupManager.pickups);
    hud = new HUD(stage, assetManager, player);
    levelManager = new LevelManager(stage, assetManager, player, map, enemyManager, pickupManager, hud, soundManager);
    screenManager = new ScreenManager(stage, assetManager, levelManager, soundManager);
    gameManager = new GameManager(stage, assetManager, levelManager, screenManager, player, enemyManager, pickupManager, maxArrowsOnScreen, map);

    screenManager.ShowIntroScreen();

    document.onkeydown = OnKeyDown;
    document.onkeyup = OnKeyUp;

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);     
    console.log(">> game ready");
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    
    if (levelManager.gameLoaded == true){
        arrowCoolDown--;
        if (arrowCoolDown <=0){arrowCoolDown = 0;}
        enemyManager.UpdateEnemies();
        player.Update();
        map.Update();
        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){maxArrowsOnScreen[i].Update();}
        hud.Update();
        camera.Update();
        MonitorKeys();
        gameManager.MonitorCollisions(interact);
    }
    else{//nothing
    }
    if (levelManager.gameLoaded == false){
        levelManager.UpdateLoadingScreen();
    }
    // update the stage!
    stage.update();
    
}

function OnKeyDown(e:KeyboardEvent):void{
    if (e.key == "a"){if (player.movement == GameCharacter.IDLE){left = true;} else{return;}}
    else if (e.key == "w"){if (player.movement == GameCharacter.IDLE){up = true} else{return;}}
    else if (e.key == "d"){if (player.movement == GameCharacter.IDLE){right = true;} else{return;}}
    else if (e.key == "s"){if (player.movement == GameCharacter.IDLE){down = true;} else{return;}}
    else if (e.key == " "){shoot = true;}
    else if (e.key == "e"){interact = true;}
}

function OnKeyUp(e:KeyboardEvent):void{
    if (e.key == "a"){left = false;}
    else if (e.key == "w"){up = false}
    else if (e.key == "d"){right = false;}
    else if (e.key == "s"){down = false;}
    else if (e.key == " "){shoot = false}
    else if (e.key == "e"){interact = false;}
}

function MonitorKeys():void{

    if (left)
    { 
        player.direction = 3;
        if (player.canWalk == true){
        player.movement = GameCharacter.LEFT;
        world.OffSetWorld();
        }   
    }
    else if (right)
    {
        player.direction = 4;
        if (player.canWalk == true){
        player.movement = GameCharacter.RIGHT;
        world.OffSetWorld();
        }
    }
    else if (up)
    {
        player.direction = 1;
        if (player.canWalk == true){
        player.movement = GameCharacter.UP;
        world.OffSetWorld();
        }
    }
    else if (down)
    {
        player.direction = 2;
        if (player.canWalk == true){
        player.movement = GameCharacter.DOWN;
        world.OffSetWorld();
        }
    }
    else{player.movement = GameCharacter.IDLE;}
    
    if (shoot){for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
        if (maxArrowsOnScreen[i].used == false){
            if (arrowCoolDown == 0){
                maxArrowsOnScreen[i].Shoot();
                arrowCoolDown = ARROW_RELOAD;
            }
        }
    }}
}
// --------------------------------------------------- main method
function main():void {
    console.log(">> initializing");

    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();