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

    //animation system I created to prevent AI copying
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
        super(stage, assetManager, "Default/idleUp", soundManager)
        this.player = player;
        this.healthBar = assetManager.getSprite("assets", "other/health_green");
        this.healthBarBack = assetManager.getSprite("assets", "other/health_red");
        //eqaution that sets enemy on map location rather than screen location.....
        this.originPointX = +(player.originPointX - GENERAL_MAP_SIZE/2) + xLoc;
        this.originPointY = +(player.originPointY - GENERAL_MAP_SIZE/2) + yLoc;
        this.attackCoolDown = 0;
        //no shield on any enemy
        this.shield = 0;
        //enemies have 0 lives to burn
        this.lives = 0;
    }

    public Spawn():void{
        //when it spawns it is alive
        this.vitalStatus = GameCharacter.ALIVE;
        this.isDying = false;
        //default spawning position.......
        this.sprite.gotoAndStop(this.formIdleDown);
        //anytime they spawn they will always go back to their origin point....
        this.sprite.x = this.originPointX;
        this.sprite.y = this.originPointY;
        this.healthBarBack.scaleX = this.health * 0.02;
        //enemy is added on spawn.....
        this.stage.addChild(this.sprite);
        this.stage.addChild(this.healthBarBack);
        this.stage.addChild(this.healthBar);
        //state instantly set to roaming.....
        this.state = Enemy.ROAMING;
    }

    public KillMe():void{
        //on kill me enemy vital status will be set to dead and attack cooldown is set to 0, to prevent attack sound playing when dead bug.....
        this.attackCoolDown = 0;
        this.vitalStatus = GameCharacter.DEAD;
    }
    public TakeDamage(damage:number):void{
        super.TakeDamage(damage);
    }

    //AI
    Update():void{
        super.Update();

        this.healthBar.x = this.sprite.x;
        this.healthBar.y = this.sprite.y - this.sprite.getBounds().height / 2 - 20;
        this.healthBarBack.x = this.sprite.x;
        this.healthBarBack.y = this.sprite.y - this.sprite.getBounds().height / 2 - 20;
        this.healthBar.scaleX = this.health * 0.02;

        //boolean created and used so that death animation only plays once.....
        if (this.isDying == false){
            if (this.vitalStatus == GameCharacter.DEAD){
                this.KillMe();
                this.isDying = true;
            }
        }
        //AI won't even happen unless enemy is alive.....
        if (this.vitalStatus == GameCharacter.ALIVE){
        
            if (this.state == Enemy.ROAMING){
                if (this.isIdle == true){
                    //picks random direction
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
                    //picks random number of how long it will move in that direction
                    this.stateDuration = randomNum(50, 100);
                    this.wallHitUp = false;
                    this.wallHitDown = false;
                    this.wallHitRight = false;
                    this.wallHitLeft = false;
                    //booleans I also created so animations will play once
                    this.isWalking = false;
                    this.isAttacking = false;
                }
            }
            //for each direction it will choose correct animation and move in that direction....
            else if (this.state == GameCharacter.DOWN){
                this.direction = 1;
                //if wall collision is detected, enemy will stop until a different diretion is chosen to move away from the wall.....
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
            //if enemy is retreating it will go back to roaming.....
            else if (this.state == Enemy.RETREATING)
            {
                this.attackCoolDown = 0;
                this.isIdle = true;
                this.state = Enemy.ROAMING;
                this.isWalking = false;
                this.isAttacking = false;
            }
            
            //if enemy is chasing it will move in any direction the player is in......
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
            //if enemy is attacking player will take damage....
            else if (this.state == Enemy.ATTACKING){
                this.isWalking = false;
                //cooldown made to prevent rapid attacking...
                //cooldown duration will vary on enemy type.....
                if (this.attackCoolDown >= 1){
                    this.attackCoolDown--;
                }
                else if (this.attackCoolDown == 0 && this.player.vitalStatus == GameCharacter.ALIVE){
                    this.attackCoolDown = this.attackSpeed;
                    this.player.TakeDamage(this.attackDamage);
                }
                if (this.direction == 1){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackUp);this.isAttacking = true;}}
                if (this.direction == 2){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackDown);this.isAttacking = true;}}
                if (this.direction == 4){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackRight);this.isAttacking = true;}}
                if (this.direction == 3){if(this.isAttacking == false){this.sprite.gotoAndPlay(this.formAttackLeft);this.isAttacking = true;}}
            }
            //when state duration hits 0 or less, enemy goes back to roaming to choose different direction.
            //this what I call AI loop.....
            if (this.stateDuration <= 0){
                this.state = Enemy.ROAMING;
            }
            //state duration constantly goes down...
            this.stateDuration--;
        }
    }
    
}