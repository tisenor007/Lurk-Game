import AssetManager from "./AssetManager";
import GameCharacter from "./GameCharacter";
import { MAX_ARROWS_ON_SCREEN, PLAYER_SPEED, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import Arrow from "./Arrow";

export default class Player extends GameCharacter{

    public static UP:number = 1;
    public static DOWN:number = 2;
    public static LEFT:number = 3;
    public static RIGHT:number = 4;
    public static IDLE:number = 5;

    public movement:number;
    public xLoc:number;
    public yLoc:number;
    public availableArrows:number = 10;
    public direction:number;

    constructor(stage:createjs.StageGL, assetmanager:AssetManager){
        super(stage, assetmanager, "Player/Idle_down");
        this.sprite.x = STAGE_WIDTH / 2;
        this.sprite.y = STAGE_HEIGHT / 2;
    }

    public SpawnPlayer(xLoc:number, yLoc:number):void{
        this.xLoc = xLoc;
        this.yLoc = yLoc;
        this.stage.addChild(this.sprite);
    }

    public Update():void{
        if (this.movement == Player.UP){
            this.direction = 1;
            this.yLoc = this.yLoc + PLAYER_SPEED;
        }
        else if (this.movement == Player.DOWN){
            this.direction = 2;
            this.yLoc = this.yLoc - PLAYER_SPEED;
        }
        else if (this.movement == Player.LEFT){
            this.xLoc = this.xLoc + PLAYER_SPEED;
            if (this.direction == 3){return;}
            this.sprite.gotoAndPlay("Player/walk_left");
            this.direction = 3;
        }
        else if (this.movement == Player.RIGHT){
            this.xLoc = this.xLoc - PLAYER_SPEED;
            if (this.direction == 4){return;}
            this.sprite.gotoAndPlay("Player/walk_right");
            this.direction = 4;
        }
        if (this.movement == Player.IDLE){
            if (this.direction == 1){this.sprite.gotoAndStop("Player/Idle_up")}
            if (this.direction == 2){this.sprite.gotoAndStop("Player/Idle_down")}
            if (this.direction == 3){this.sprite.gotoAndStop("Player/Idle_left")}
            if (this.direction == 4){this.sprite.gotoAndStop("Player/Idle_right")}
            this.direction = 0;
        }
    }
}