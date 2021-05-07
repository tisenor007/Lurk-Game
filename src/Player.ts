import AssetManager from "./AssetManager";
import GameCharacter from "./GameCharacter";
import { MAX_ARROWS_ON_SCREEN, PLAYER_SPEED, STAGE_HEIGHT, STAGE_WIDTH, STARTING_ARROW_AMOUNT } from "./Constants";
import Arrow from "./Arrow";

export default class Player extends GameCharacter{

    public static UP:number = 1;
    public static DOWN:number = 2;
    public static LEFT:number = 3;
    public static RIGHT:number = 4;
    public static IDLE:number = 5;

    public isWalking:boolean;
    public canWalk:boolean;
    public movement:number;
    public xLoc:number;
    public yLoc:number;
    public availableArrows:number;
    public direction:number;

    constructor(stage:createjs.StageGL, assetmanager:AssetManager){
        super(stage, assetmanager, "Player/Idle_down");
        this.health = 100;
        this.lives = 3;
        this.shield = 50;

        this.direction = 2;
        this.sprite.x = STAGE_WIDTH / 2;
        this.sprite.y = STAGE_HEIGHT / 2;
        this.availableArrows = STARTING_ARROW_AMOUNT;
        //temp until map collisions work
        this.canWalk = true;
    }

    public SpawnPlayer(xLoc:number, yLoc:number):void{
        this.xLoc = xLoc;
        this.yLoc = yLoc;
        this.stage.addChild(this.sprite);
    }

    public Update():void{
        if (this.canWalk == true)
        {   
            if (this.movement == Player.UP){
                this.yLoc = this.yLoc + PLAYER_SPEED;
                if (this.isWalking == true){return;}
                this.sprite.gotoAndPlay("Player/walk_up");
                this.direction = 1;
                this.isWalking = true;
            }
            else if (this.movement == Player.DOWN){
                this.yLoc = this.yLoc - PLAYER_SPEED;
                if (this.isWalking == true){return;}
                this.sprite.gotoAndPlay("Player/walk_down");
                this.direction = 2;
                this.isWalking = true;
            }
            else if (this.movement == Player.LEFT){
                this.xLoc = this.xLoc + PLAYER_SPEED;
                if (this.isWalking == true){return;}
                this.sprite.gotoAndPlay("Player/walk_left");
                this.direction = 3;
                this.isWalking = true;
            }
            else if (this.movement == Player.RIGHT){
                this.xLoc = this.xLoc - PLAYER_SPEED;
                if (this.isWalking == true){return;}
                this.sprite.gotoAndPlay("Player/walk_right");
                this.direction = 4;
                this.isWalking = true;
            }
        }
        else{
            this.movement == Player.IDLE
        }
        if (this.movement == Player.IDLE){
            this.isWalking = false;
            if (this.direction == 1){this.sprite.gotoAndStop("Player/Idle_up")}
            if (this.direction == 2){this.sprite.gotoAndStop("Player/Idle_down")}
            if (this.direction == 3){this.sprite.gotoAndStop("Player/Idle_left")}
            if (this.direction == 4){this.sprite.gotoAndStop("Player/Idle_right")}
        }
    }
}