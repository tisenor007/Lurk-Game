import AssetManager from "./AssetManager";
import { ARROW_SPEED, STAGE_HEIGHT, STAGE_WIDTH, } from "./Constants";
import Player from "./Player";
import World from "./World";

export default class Arrow{

    public sprite:createjs.Sprite;
    public aimDirection:number;
    public used:boolean = false;
    private stage:createjs.StageGL;
    private world:World;
    private player:Player;
    
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, world:World, player:Player){
        this.stage = stage;
        this.world = world;
        this.player = player;
        this.sprite = assetManager.getSprite("assets", "Arrow/arrow_up");
        this.sprite.x = STAGE_WIDTH / 2;
        this.sprite.y = STAGE_HEIGHT / 2;
        this.aimDirection = 2;
    }

    public Shoot():void{
        this.stage.addChild(this.sprite);
        this.used = true;
    }

    public remove():void{
        this.stage.removeChild(this.sprite);
        this.used = false;
        this.sprite.x = STAGE_WIDTH / 2;
        this.sprite.y = STAGE_HEIGHT / 2;
    }

    public Update():void{
        if (this.used == true){
            if (this.aimDirection == 1){
                this.sprite.gotoAndStop("Arrow/arrow_up");
                this.sprite.y = this.sprite.y - ARROW_SPEED;
                
            }
            if (this.aimDirection == 2){
                this.sprite.gotoAndStop("Arrow/arrow_down");
                this.sprite.y = this.sprite.y + ARROW_SPEED;
                
            }
            if (this.aimDirection == 3){
                this.sprite.gotoAndStop("Arrow/arrow_left");
                this.sprite.x = this.sprite.x - ARROW_SPEED;
                
            }
            if (this.aimDirection == 4){
                this.sprite.gotoAndStop("Arrow/arrow_right");
                this.sprite.x = this.sprite.x + ARROW_SPEED;
            }
            if (this.sprite.x <= 0){
                this.remove();
            }
            if (this.sprite.y <= 0){
                this.remove();
            }
            if (this.sprite.x >= STAGE_WIDTH){
                this.remove();
            }
            if (this.sprite.y >= STAGE_HEIGHT){
                this.remove();
            }
        }

    }
    
}