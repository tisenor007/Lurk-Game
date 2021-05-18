import AssetManager from "./AssetManager";
import GameCharacter from "./GameCharacter";
import Player from "./Player";
import { radiusHit, randomNum } from "./ToolBox";

export default class Enemy extends GameCharacter{
    
    public static ATTACKING:number = 8;
    public static CHASING:number = 9;
    public static RETREATING:number = 10;
    public static ROAMING:number = 11;

    public state:number;
    public stateDuration:number;
    public player:Player;
    public isIdle:boolean = true;

    public form:string;
    public attackSpeed:number;
    public attackCoolDown:number;
    public sightRange:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player){
        super(stage, assetManager, "Enemy/Default")
        this.player = player;
        this.vitalStatus = GameCharacter.ALIVE;
        this.sprite.x = +(player.xLoc - 600) + xLoc;
        this.sprite.y = +(player.yLoc - 600) + yLoc;
        this.attackCoolDown = 0;
        this.shield = 0;
        this.lives = 1;
    }

    public Spawn():void{
        this.sprite.gotoAndStop(this.form);
        this.stage.addChild(this.sprite);
        this.state = Enemy.ROAMING;
    }
    public TurnAround():void{
        this.canWalk = false;
        if (this.direction == 1){
            this.state = GameCharacter.DOWN;
        }
        if (this.direction == 2){
            this.state = GameCharacter.UP;
        }
        if (this.direction == 3){
            this.state = GameCharacter.RIGHT;
        }
        if (this.direction == 4){
            this.state = GameCharacter.LEFT;
        }
    }

    Update():void{
        super.Update();
        //console.log("🚀 ~ Enemy ~ Update ~ this.isIdle", this.isIdle);
        this.stateDuration--;
        if (this.state == Enemy.ROAMING){
            this.canWalk = true;
            if (this.isIdle == true){
                let movementToBeDetermined:number = randomNum(1, 4);
                if (movementToBeDetermined <= 1){
                    this.state = GameCharacter.UP;
                }
                else if (movementToBeDetermined == 2){
                    this.state = GameCharacter.DOWN;
                }
                else if (movementToBeDetermined == 3){
                    this.state = GameCharacter.LEFT;
                }
                else if (movementToBeDetermined >= 4){
                    this.state = GameCharacter.RIGHT;
                }
                this.stateDuration = randomNum(50, 100);
            }
        }
        else if (this.state == GameCharacter.UP){
            this.sprite.y = this.sprite.y + this.speed;
            this.direction = 1;
        }
        else if (this.state == GameCharacter.DOWN){
            this.sprite.y = this.sprite.y - this.speed;
            this.direction = 2;
        }
        else if (this.state == GameCharacter.LEFT){
            this.sprite.x = this.sprite.x + this.speed;
            this.direction = 3;
        }
        if (this.state == GameCharacter.RIGHT){
            this.sprite.x = this.sprite.x - this.speed;
            this.direction = 4;
        }
        else if (this.state == Enemy.RETREATING){
            this.isIdle = true;
            this.state = Enemy.ROAMING;
        }
        else if (this.state == Enemy.CHASING){
            if (this.sprite.y > this.player.sprite.y){
                this.sprite.y = this.sprite.y - this.speed;
                this.direction = 1;
            }
            if (this.sprite.y < this.player.sprite.y){
                this.sprite.y = this.sprite.y + this.speed;
                this.direction = 2;
            }
            if (this.sprite.x < this.player.sprite.x){
                this.sprite.x = this.sprite.x + this.speed;
                this.direction = 4;
            }
            if (this.sprite.x > this.player.sprite.x){
                this.sprite.x = this.sprite.x - this.speed;
                this.direction = 3;
            }
        }
        else if (this.state == Enemy.ATTACKING){
            if (this.attackCoolDown >= 1){
                this.attackCoolDown--;
            }
            else if (this.attackCoolDown <= 0){
                this.attackCoolDown = this.attackSpeed;
                this.player.TakeDamage(this.attackDamage);
            }
            
        }
        if (this.stateDuration <= 0){
            this.state = Enemy.ROAMING;
        }
        this.stateDuration--;
    }
    
}