import AssetManager from "./AssetManager";

export default class GameCharacter{

    //enums the gamecharcter share
    public static UP:number = 1;
    public static DOWN:number = 2;
    public static LEFT:number = 3;
    public static RIGHT:number = 4;
    public static IDLE:number = 5;

    //vital statuses
    public static DEAD:number = 6;
    public static ALIVE:number = 7;
    
    public isWalking:boolean;

    public health:number;
    public shield:number;
    public lives:number;
    public vitalStatus:number;
    public speed:number;
    public attackDamage:number;
    public direction:number;
    public originPointX:number;
    public originPointY:number;
    public isDying:boolean;

    public stage:createjs.StageGL;
    public sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, animation:string){
        this.stage = stage;
        this.vitalStatus = GameCharacter.ALIVE;
        this.sprite = assetManager.getSprite("assets", animation);
    }

    public TakeDamage(damage:number):void{
        let remainingDamage:number = damage - this.shield;
        this.shield = this.shield - damage;
        if (this.shield <= 0){
            this.shield = 0;
            this.health = this.health - remainingDamage;
        }
        if (this.health <= 0){
            this.health = 0;
        }
    }
    public RegenHealth(hp:number):void{
        this.health = this.health + hp;
    }
    public RestoreSheild():void{
        this.shield = 50;
    }

    public Update():void{
        if (this.health <= 0){
            this.vitalStatus = GameCharacter.DEAD;
        }
        if (this.health >= 1){
            this.vitalStatus = GameCharacter.ALIVE;
        }
        if (this.lives < 0){
            this.health = 0;
            this.shield = 0;
        }
        //if vitalstatus play dead animation / restart level
    }
}