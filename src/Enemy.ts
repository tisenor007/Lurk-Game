import AssetManager from "./AssetManager";
import { GENERAL_MAP_SIZE } from "./Constants";
import GameCharacter from "./GameCharacter";
import Map from "./Map";
import Player from "./Player";
import SoundManager from "./SoundManager";
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
    public wallHitUp:boolean = false;
    public wallHitDown:boolean = false;
    public wallHitLeft:boolean = false;
    public wallHitRight:boolean = false;
    public isAttacking:boolean = false;
    
    public healthBar:createjs.Sprite;
    public healthBarBack:createjs.Sprite;
    public attackSpeed:number;
    public attackCoolDown:number;
    public sightRange:number;

    //idle animations
    public formIdleDown:string;
    public formIdleUp:string;
    public formIdleLeft:string;
    public formIdleRight:string;

    //walk animations
    public formWalkUp:string;
    public formWalkDown:string;
    public formWalkLeft:string;
    public formWalkRight:string;

    //attack animations
    public formAttackUp:string;
    public formAttackDown:string;
    public formAttackLeft:string;
    public formAttackRight:string;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, xLoc:number, yLoc:number, player:Player, soundManager:SoundManager){
        super(stage, assetManager, "Default/Default", soundManager)
        this.player = player;
        this.healthBar = assetManager.getSprite("assets", "other/health_green");
        this.healthBarBack = assetManager.getSprite("assets", "other/health_red");
        this.originPointX = +(player.originPointX - GENERAL_MAP_SIZE/2) + xLoc;
        this.originPointY = +(player.originPointY - GENERAL_MAP_SIZE/2) + yLoc;
        this.attackCoolDown = 0;
        this.shield = 0;
        this.lives = 1;
    }

    public Spawn():void{
        this.vitalStatus = GameCharacter.ALIVE;
        this.isDying = false;
        this.sprite.gotoAndStop(this.formIdleDown);
        this.sprite.x = this.originPointX;
        this.sprite.y = this.originPointY;
        this.healthBarBack.scaleX = this.health * 0.02;
        this.stage.addChild(this.sprite);
        this.stage.addChild(this.healthBarBack);
        this.stage.addChild(this.healthBar);
        this.state = Enemy.ROAMING;
    }

    public KillMe():void{
        this.vitalStatus = GameCharacter.DEAD;
    }
    public TakeDamage(damage:number):void{
        super.TakeDamage(damage);
    }

    Update():void{
        super.Update();

        this.healthBar.x = this.sprite.x;
        this.healthBar.y = this.sprite.y - this.sprite.getBounds().height / 2 - 20;
        this.healthBarBack.x = this.sprite.x;
        this.healthBarBack.y = this.sprite.y - this.sprite.getBounds().height / 2 - 20;
        this.healthBar.scaleX = this.health * 0.02;

        if (this.isDying == false){
            if (this.vitalStatus == GameCharacter.DEAD){
                this.KillMe();
                this.isDying = true;
            }
        }
        if (this.vitalStatus == GameCharacter.ALIVE){
        
            if (this.state == Enemy.ROAMING){
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
                    this.wallHitUp = false;
                    this.wallHitDown = false;
                    this.wallHitRight = false;
                    this.wallHitLeft = false;
                    this.isWalking = false;
                    this.isAttacking = false;
                }
            }
            else if (this.state == GameCharacter.DOWN){
                this.direction = 1;
                if (this.direction == 1 && this.wallHitUp == true){this.sprite.gotoAndStop(this.formIdleUp);}
                else{
                    this.sprite.y = this.sprite.y + this.speed;
                    if (this.isWalking == false){
                        this.sprite.gotoAndPlay(this.formWalkDown);
                        this.isWalking = true;
                    }
                }
            }
            else if (this.state == GameCharacter.UP){
                this.direction = 2;
                if (this.direction == 2 && this.wallHitDown == true){this.sprite.gotoAndStop(this.formIdleDown);}
                else{
                    this.sprite.y = this.sprite.y - this.speed;
                    if (this.isWalking == false){
                        this.sprite.gotoAndPlay(this.formWalkUp);
                        this.isWalking = true;
                    }
                }
            }
            else if (this.state == GameCharacter.RIGHT){
                this.direction = 3;
                if (this.direction == 3 && this.wallHitLeft == true){this.sprite.gotoAndStop(this.formIdleLeft);}
                else{
                    this.sprite.x = this.sprite.x + this.speed;
                    if (this.isWalking == false){
                        this.sprite.gotoAndPlay(this.formWalkRight);
                        this.isWalking = true;
                    }
                }
            }
            if (this.state == GameCharacter.LEFT){
                this.direction = 4;
                if (this.direction == 4 && this.wallHitRight == true){this.sprite.gotoAndStop(this.formIdleRight);
                }
                else{
                    this.sprite.x = this.sprite.x - this.speed;
                    if (this.isWalking == false){
                        this.sprite.gotoAndPlay(this.formWalkLeft);
                        this.isWalking = true;
                    }
                }
            }
            else if (this.state == Enemy.RETREATING)
            {
                this.attackCoolDown = 0;
                this.isIdle = true;
                this.state = Enemy.ROAMING;
                this.isWalking = false;
                this.isAttacking = false;
            }
            
            if (this.state == Enemy.CHASING){
                this.isAttacking = false;
                this.attackCoolDown = this.attackSpeed - 1;
                if (this.sprite.y > this.player.sprite.y){
                    this.sprite.y = this.sprite.y - this.speed;
                    if (this.direction == 2 || this.direction == 3 || this.direction == 4){
                       this.sprite.gotoAndPlay(this.formWalkUp);
                    }
                    this.direction = 1;
                }
                if (this.sprite.y < this.player.sprite.y){
                    this.sprite.y = this.sprite.y + this.speed;
                    if (this.direction == 1 || this.direction == 3 || this.direction == 4){
                        this.sprite.gotoAndPlay(this.formWalkDown);
                    }
                    this.direction = 2;
                }
                if (this.sprite.x < this.player.sprite.x){
                    this.sprite.x = this.sprite.x + this.speed;
                    if (this.direction == 1 || this.direction == 3 || this.direction == 2){
                        this.sprite.gotoAndPlay(this.formWalkRight);
                    }
                    this.direction = 4;
                }
                if (this.sprite.x > this.player.sprite.x){
                    this.sprite.x = this.sprite.x - this.speed;
                    if (this.direction == 1 || this.direction == 2 || this.direction == 4){
                        this.sprite.gotoAndPlay(this.formWalkLeft);
                    }
                    this.direction = 3;
                }
            }
            else if (this.state == Enemy.ATTACKING){
                this.isWalking = false;
                if (this.attackCoolDown >= 1){
                    this.attackCoolDown--;
                }
                else if (this.attackCoolDown == 0){
                    this.attackCoolDown = this.attackSpeed;
                    this.player.TakeDamage(this.attackDamage);
                }
                if (this.direction == 1){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackUp);this.isAttacking = true;}}
                if (this.direction == 2){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackDown);this.isAttacking = true;}}
                if (this.direction == 3){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackRight);this.isAttacking = true;}}
                if (this.direction == 4){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackLeft);this.isAttacking = true;}}
            }
            if (this.stateDuration <= 0){
                this.state = Enemy.ROAMING;
            }
            
            this.stateDuration--;
        }
    }
    
}