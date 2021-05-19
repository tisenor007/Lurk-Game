import AssetManager from "./AssetManager";
import Player from "./Player";
import { GENERAL_MAP_SIZE, PLAYER_SPEED, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import World from "./World";
import Camera from "./Camera";

export default class Map{

    public floor:createjs.Sprite;
    public northWall:createjs.Sprite;
    public southWall:createjs.Sprite;
    public westWall:createjs.Sprite;
    public eastWall:createjs.Sprite;

    public centerWallOne:createjs.Sprite;
    public centerWallTwo:createjs.Sprite;
    public centerWallThree:createjs.Sprite;
    public centerWallFour:createjs.Sprite;
    public centerWallFive:createjs.Sprite;
    public centerWallSix:createjs.Sprite;
    public centerWallSeven:createjs.Sprite;
    public centerWallEight:createjs.Sprite;

    public mapSize:number;

    private stage:createjs.StageGL;
    private assetManager:AssetManager;
    private camera:Camera;

    private mainLoaded:boolean;
    private bossLoaded:boolean;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, camera:Camera){
        this.stage = stage;
        this.camera = camera;
        this.assetManager = assetManager;

        //General Level Components
        this.floor = this.assetManager.getSprite("assets", "Mainlevel/floor");
        this.northWall = this.assetManager.getSprite("assets", "Mainlevel/NorthWall");
        this.southWall = this.assetManager.getSprite("assets", "Mainlevel/SouthWall");
        this.eastWall = this.assetManager.getSprite("assets", "Mainlevel/EastWall");
        this.westWall = this.assetManager.getSprite("assets", "Mainlevel/WestWall");
        //Main Level Components
        this.centerWallOne = this.assetManager.getSprite("assets", "Mainlevel/wallFive");
        this.centerWallTwo = this.assetManager.getSprite("assets", "Mainlevel/wallSix");
        this.centerWallThree = this.assetManager.getSprite("assets", "Mainlevel/wallEight");
        this.centerWallFour = this.assetManager.getSprite("assets", "Mainlevel/wallSeven");
        this.centerWallFive = this.assetManager.getSprite("assets", "Mainlevel/wallSix");
        this.centerWallFive = this.assetManager.getSprite("assets", "Mainlevel/wallSix");
        this.centerWallSix = this.assetManager.getSprite("assets", "Mainlevel/wallEleven");
        this.centerWallSeven = this.assetManager.getSprite("assets", "Mainlevel/wallTen");
        this.centerWallEight = this.assetManager.getSprite("assets", "Mainlevel/wallNine");
    }

    public LoadMain():void{
        this.mainLoaded = true;
        this.bossLoaded = false;

        this.stage.removeAllChildren();
        
        this.stage.addChild(this.floor);
        this.stage.addChild(this.northWall);
        this.stage.addChild(this.southWall);
        this.stage.addChild(this.eastWall);
        this.stage.addChild(this.westWall);
        this.stage.addChild(this.centerWallOne);
        this.stage.addChild(this.centerWallTwo);
        this.stage.addChild(this.centerWallThree);
        this.stage.addChild(this.centerWallFour);
        this.stage.addChild(this.centerWallFive);
        this.stage.addChild(this.centerWallSix);
        this.stage.addChild(this.centerWallSeven);
        this.stage.addChild(this.centerWallEight);

        this.mapSize = GENERAL_MAP_SIZE;
    }

    public Update():void{
        if (this.mainLoaded == true){

        this.floor.x = this.camera.offsetX;
        this.floor.y = this.camera.offsetY;
        this.northWall.x = this.camera.offsetX;
        this.northWall.y = this.camera.offsetY - (this.mapSize/2 + 19.5);
        this.southWall.x = this.camera.offsetX;
        this.southWall.y = this.camera.offsetY + (this.mapSize/2 + 19.5);
        this.eastWall.x = this.camera.offsetX + (this.mapSize/2 + 19.5);
        this.eastWall.y = this.camera.offsetY + 19.5;
        this.westWall.x = this.camera.offsetX - (this.mapSize/2 + 19.5);
        this.westWall.y = this.camera.offsetY + 19.5;

        this.centerWallOne.x = this.camera.offsetX - 128;
        this.centerWallOne.y = this.camera.offsetY - 192;
        this.centerWallTwo.x = this.camera.offsetX + 256;
        this.centerWallTwo.y = this.camera.offsetY - 192;
        this.centerWallThree.x = this.camera.offsetX - 64;
        this.centerWallThree.y = this.camera.offsetY + 64;
        this.centerWallFour.x = this.camera.offsetX - 192;
        this.centerWallFour.y = this.camera.offsetY + 144;
        this.centerWallFive.x = this.camera.offsetX + 0;
        this.centerWallFive.y = this.camera.offsetY + 256;
        this.centerWallSix.x = this.camera.offsetX + 352;
        this.centerWallSix.y = this.camera.offsetY + 192;
        this.centerWallSeven.x = this.camera.offsetX + 256;
        this.centerWallSeven.y = this.camera.offsetY + 223.5;
        this.centerWallEight.x = this.camera.offsetX + 224;
        this.centerWallEight.y = this.camera.offsetY + 64;
        }
    }
    public IsCollidingWithWall(character:createjs.Sprite, direction:number, wall:createjs.Sprite):boolean {
       
        let width1:number = character.getBounds().width;
        let height1:number = character.getBounds().height;
        let width2:number = wall.getBounds().width;
        let height2:number = wall.getBounds().height;
        if (direction == 4) {
            if ((character.x + width1/2 + PLAYER_SPEED > wall.x - width2/2) &&
                (character.y + height2/5 > wall.y - height2/2) &&
                (character.x - width1/2 + PLAYER_SPEED < wall.x + width2 / 2) &&
                (character.y - height1/5 < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        }
        if (direction == 3) {
            if ((character.x + width1/2 - PLAYER_SPEED > wall.x - width2/2) &&
                (character.y + height2/5 > wall.y - height2/2) &&
                (character.x - width1/2 - PLAYER_SPEED < wall.x + width2 / 2) &&
                (character.y - height1/5 < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        } 
        if (direction == 2) {
            if ((character.x + width1/2 > wall.x - width2/2) &&
                (character.y + height2/5 + PLAYER_SPEED > wall.y - height2/2) &&
                (character.x - width1/2  < wall.x + width2 / 2) &&
                (character.y - height1/5 + PLAYER_SPEED < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        } 
        if (direction == 1) {
            if ((character.x + width1/2 > wall.x - width2/2) &&
                (character.y + height2/5 - PLAYER_SPEED > wall.y - height2/2) &&
                (character.x - width1/2  < wall.x + width2 / 2) &&
                (character.y - height1/5 - PLAYER_SPEED < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        }
        return false; 
    }
}