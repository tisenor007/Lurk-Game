import AssetManager from "./AssetManager";
import Player from "./Player";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import World from "./World";

export default class Map{

    public map:createjs.Sprite;
    private world:World;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, world:World){
        this.stage = stage;
        this.world = world;
        this.map = assetManager.getSprite("assets", "other/tempMap");
    }

    public LoadMap():void{
        this.map.x = STAGE_WIDTH / 2;
        this.map.y = STAGE_HEIGHT / 2;
        this.stage.addChild(this.map);
    }

    public Update():void{
        this.map.x = this.world.offsetX;
        this.map.y = this.world.offsetY;
    }
}