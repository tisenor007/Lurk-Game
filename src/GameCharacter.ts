import AssetManager from "./AssetManager";
import SoundManager from "./SoundManager";

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
    protected soundManager:SoundManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, animation:string, soundManager:SoundManager){
        this.stage = stage;
        this.soundManager = soundManager;
        this.vitalStatus = GameCharacter.ALIVE;
        this.sprite = assetManager.getSprite("assets", animation);
    }

    //general take damage method for game characters.......
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
    //general health regeneration method
    public RegenHealth(hp:number):void{
        this.health = this.health + hp;
        if (this.health >= 100){this.health = 100;}
    }
    //general restore sheild method
    public RestoreSheild():void{
        this.shield = 50;
    }
    //general remove life method
    public RemoveLife():void{
        this.lives = this.lives - 1;
    }
    //will detect if a game character is dead or alive (bug proofing...)
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
    }
}