import AssetManager from "./AssetManager";
import Player from "./Player";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import World from "./World";
import Camera from "./Camera";

export default class Map{

    public map:createjs.Sprite;
    public northWall:createjs.Sprite;
    public southWall:createjs.Sprite;
    public westWall:createjs.Sprite;
    public eastWall:createjs.Sprite;
    public centerWallOne:createjs.Sprite;
    private stage:createjs.StageGL;
    private assetManager:AssetManager;
    private camera:Camera;

    private mainLoaded:boolean;
    private bossLoaded:boolean;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, camera:Camera){
        this.stage = stage;
        this.camera = camera;
        this.assetManager = assetManager;
    }

    public LoadMain():void{
        this.mainLoaded = true;
        this.bossLoaded = false;
        this.stage.removeAllChildren();
        this.map = this.assetManager.getSprite("assets", "other/tempMap");
        this.northWall = this.assetManager.getSprite("assets", "other/NorthWall");
        this.southWall = this.assetManager.getSprite("assets", "other/SouthWall");
        this.eastWall = this.assetManager.getSprite("assets", "other/EastWall");
        this.westWall = this.assetManager.getSprite("assets", "other/WestWall");
        this.centerWallOne = this.assetManager.getSprite("assets", "other/WallOne");
        this.stage.addChild(this.map);
        this.stage.addChild(this.northWall);
        this.stage.addChild(this.southWall);
        this.stage.addChild(this.eastWall);
        this.stage.addChild(this.westWall);
        this.stage.addChild(this.centerWallOne);
    }

    public Update():void{
        this.map.x = this.camera.offsetX;
        this.map.y = this.camera.offsetY;
        this.northWall.x = this.camera.offsetX;
        this.northWall.y = this.camera.offsetY - 600;
        this.southWall.x = this.camera.offsetX;
        this.southWall.y = this.camera.offsetY + 600;
        this.eastWall.x = this.camera.offsetX + 600;
        this.eastWall.y = this.camera.offsetY;
        this.westWall.x = this.camera.offsetX - 600;
        this.westWall.y = this.camera.offsetY;
        this.centerWallOne.x = this.camera.offsetX - 400;
        this.centerWallOne.y = this.camera.offsetY - 400;
    }
    public IsCollidingWithWall(character:createjs.Sprite, direction:number, wall:createjs.Sprite):boolean {
       
        let width1:number = character.getBounds().width;
        let height1:number = character.getBounds().height;
        let width2:number = wall.getBounds().width;
        let height2:number = wall.getBounds().height;
        if (direction == 4) {
            if ((character.x + width1/2 + 3 > wall.x - width2/2) &&
                (character.y + height2/2 > wall.y - height2/2) &&
                (character.x - width1/2 + 3 < wall.x + width2 / 2) &&
                (character.y - height1/2 < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        }
        if (direction == 3) {
            if ((character.x + width1/2 - 3 > wall.x - width2/2) &&
                (character.y + height2/2 > wall.y - height2/2) &&
                (character.x - width1/2 - 3 < wall.x + width2 / 2) &&
                (character.y - height1/2 < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        } 
        if (direction == 2) {
            if ((character.x + width1/2 > wall.x - width2/2) &&
                (character.y + height2/2 + 3 > wall.y - height2/2) &&
                (character.x - width1/2  < wall.x + width2 / 2) &&
                (character.y - height1/2 + 3 < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        } 
        if (direction == 1) {
            if ((character.x + width1/2 > wall.x - width2/2) &&
                (character.y + height2/2 - 3 > wall.y - height2/2) &&
                (character.x - width1/2  < wall.x + width2 / 2) &&
                (character.y - height1/2 - 3 < wall.y + height2 /2)) {
                return true;
            } 
            else {
                return false;
            }
        }
        return false; 
    }
}