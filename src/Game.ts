// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, MAX_ARROWS_ON_SCREEN, PLAYER_SPEED, ARROW_RELOAD } from "./Constants";
import AssetManager from "./AssetManager";
import Player from "./Player";
import Map from "./Map";
import World from "./World";
import Arrow from "./Arrow";
import HUD from "./HUD";
import { radiusHit } from "./ToolBox";

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;

let player:Player;

let arrowCoolDown:number = 0;
let maxArrowsOnScreen:Arrow[] = [];

let map:Map;
let world:World;

let hud:HUD;
// assetmanager object
let assetManager:AssetManager;

let left:boolean = false;
let right:boolean = false;
let up:boolean = false;
let down:boolean = false;
let shoot:boolean = false;
// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    // construct game objects/sprites
    // ...
    
    player = new Player(stage, assetManager);
    world = new World(stage, assetManager, player);

    for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
        maxArrowsOnScreen[i] = new Arrow(stage, assetManager, world, player);
    }
    map = new Map(stage, assetManager, world);
    hud = new HUD(stage, assetManager, player);
    
    map.LoadMap();
    player.SpawnPlayer(200, 200);
    hud.ShowHUD();
    
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

    arrowCoolDown--;
    if (arrowCoolDown <=0){arrowCoolDown = 0;}
    // This is your game loop :)
    // ...
    MonitorCollisions();
    MonitorKeys();
    player.Update();
    world.Update();
    map.Update();
    for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
        maxArrowsOnScreen[i].Update();
    }
    hud.Update();
    // update the stage!
    stage.update();
}
function MonitorCollisions():void{
    // if (radiusHit(player.sprite, 1, map.map, 500)){
    //     player.canWalk = true;
    // }
    // else{
    //     player.canWalk = false;
    // }

}
function OnKeyDown(e:KeyboardEvent):void{
    if (e.key == "a"){if (player.movement == Player.IDLE){left = true;} else{return;}}
    else if (e.key == "w"){if (player.movement == Player.IDLE){up = true} else{return;}}
    else if (e.key == "d"){if (player.movement == Player.IDLE){right = true;} else{return;}}
    else if (e.key == "s"){if (player.movement == Player.IDLE){down = true;} else{return;}}
    else if (e.key == " "){shoot = true;}
}
function OnKeyUp(e:KeyboardEvent):void{
    if (e.key == "a"){left = false;}
    else if (e.key == "w"){up = false}
    else if (e.key == "d"){right = false;}
    else if (e.key == "s"){down = false;}
    else if (e.key == " "){shoot = false}
}
function MonitorKeys():void{
    for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
        if (left)
        { 
            player.movement = Player.LEFT; 
            if (maxArrowsOnScreen[i].used == true){maxArrowsOnScreen[i].sprite.x = maxArrowsOnScreen[i].sprite.x + PLAYER_SPEED;}
        }
        else if (right)
        {
            player.movement = Player.RIGHT;
            if (maxArrowsOnScreen[i].used == true){maxArrowsOnScreen[i].sprite.x = maxArrowsOnScreen[i].sprite.x - PLAYER_SPEED;}
        }
        else if (up)
        {
            player.movement = Player.UP;
            if (maxArrowsOnScreen[i].used == true){maxArrowsOnScreen[i].sprite.y = maxArrowsOnScreen[i].sprite.y + PLAYER_SPEED;}
        }
        else if (down)
        {
            player.movement = Player.DOWN;
            if (maxArrowsOnScreen[i].used == true){maxArrowsOnScreen[i].sprite.y = maxArrowsOnScreen[i].sprite.y - PLAYER_SPEED;}
        }
        else{player.movement = Player.IDLE;}
    }
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