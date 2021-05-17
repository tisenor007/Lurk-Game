import AssetManager from "./AssetManager";
import Player from "./Player";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import World from "./World";

export default class Map{

    public map:createjs.Sprite;
    public northWall:createjs.Sprite;
    public southWall:createjs.Sprite;
    public westWall:createjs.Sprite;
    public eastWall:createjs.Sprite;
    public centerWallOne:createjs.Sprite;
    private world:World;
    private stage:createjs.StageGL;
    private assetManager:AssetManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, world:World){
        this.stage = stage;
        this.world = world;
        this.assetManager = assetManager;
    }

    public LoadMain():void{
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
        this.map.x = this.world.offsetX;
        this.map.y = this.world.offsetY;
        this.northWall.x = this.world.offsetX;
        this.northWall.y = this.world.offsetY - 600;
        this.southWall.x = this.world.offsetX;
        this.southWall.y = this.world.offsetY + 600;
        this.eastWall.x = this.world.offsetX + 600;
        this.eastWall.y = this.world.offsetY;
        this.westWall.x = this.world.offsetX - 600;
        this.westWall.y = this.world.offsetY;
        this.centerWallOne.x = this.world.offsetX - 400;
        this.centerWallOne.y = this.world.offsetY - 400;
    }
}