import AssetManager from "./AssetManager";
import GameCharacter from "./GameCharacter";
import { GENERAL_MAP_SIZE, MAX_ARROWS_ON_SCREEN, PLAYER_MAX_HEALTH, PLAYER_MAX_LIVES, PLAYER_MAX_SHIELD, PLAYER_SPEED, STAGE_HEIGHT, STAGE_WIDTH, STARTING_ARROW_AMOUNT } from "./Constants";
import Arrow from "./Arrow";

export default class Player extends GameCharacter{

    public playerKilled:createjs.Event;
    public isWalking:boolean;
    public movement:number;
    public xLoc:number;
    public yLoc:number;
    public availableArrows:number;

    constructor(stage:createjs.StageGL, assetmanager:AssetManager){
        super(stage, assetmanager, "Player/Idle_down");
        this.playerKilled = new createjs.Event("pKilled", true, false);
        this.isDying = false;
        this.canWalk = true;
        this.lives = PLAYER_MAX_LIVES;
        this.health = PLAYER_MAX_HEALTH;
        this.shield = PLAYER_MAX_SHIELD;
        this.speed = PLAYER_SPEED;
        this.attackDamage = 10;
        this.sprite.x = STAGE_WIDTH / 2;
        this.sprite.y = STAGE_HEIGHT / 2;
        this.availableArrows = STARTING_ARROW_AMOUNT;
    }

    public SpawnPlayer(xLoc:number, yLoc:number):void{
        this.originPointX = -xLoc + GENERAL_MAP_SIZE/2 + STAGE_WIDTH/2;
        this.originPointY = -yLoc + GENERAL_MAP_SIZE/2 + STAGE_WIDTH/2;
        this.direction = 2;
        this.isDying = false;
        this.canWalk = true;
        this.vitalStatus = GameCharacter.ALIVE;
        this.availableArrows = STARTING_ARROW_AMOUNT;
        this.xLoc = this.originPointX;
        this.yLoc = this.originPointY;
        this.stage.addChild(this.sprite);
    }
    public KillMe():void{
        this.lives = this.lives - 1;
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.stage.removeChild(this.sprite);
            this.stage.dispatchEvent(this.playerKilled);
        }, this, true)
        this.sprite.gotoAndPlay("Player/death");
    }

    public Update():void{
        super.Update();
        if (this.isDying == false){
            if (this.vitalStatus == GameCharacter.DEAD){
                this.isDying = true;
                this.KillMe();
            }
        }
        if (this.vitalStatus == GameCharacter.ALIVE){
            if (this.canWalk == false){
                this.movement = GameCharacter.IDLE
            }
            if (this.canWalk == true)
            {   
                if (this.movement == Player.UP){
                    this.yLoc = this.yLoc + this.speed;
                    if (this.isWalking == true){return;}
                    this.sprite.gotoAndPlay("Player/walk_up");
                    this.direction = 1;
                    this.isWalking = true;
                }
                else if (this.movement == Player.DOWN){
                    this.yLoc = this.yLoc - this.speed;
                    if (this.isWalking == true){return;}
                    this.sprite.gotoAndPlay("Player/walk_down");
                    this.direction = 2;
                    this.isWalking = true;
                }
                else if (this.movement == Player.LEFT){
                    this.xLoc = this.xLoc + this.speed;
                    if (this.isWalking == true){return;}
                    this.sprite.gotoAndPlay("Player/walk_left");
                    this.direction = 3;
                    this.isWalking = true;
                }
                else if (this.movement == Player.RIGHT){
                    this.xLoc = this.xLoc - this.speed;
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
                if (this.direction == 1){this.sprite.gotoAndStop("Player/Idle_up");}
                if (this.direction == 2){this.sprite.gotoAndStop("Player/Idle_down");}
                if (this.direction == 3){this.sprite.gotoAndStop("Player/Idle_left");}
                if (this.direction == 4){this.sprite.gotoAndStop("Player/Idle_right");}
            }
        }
    }
}