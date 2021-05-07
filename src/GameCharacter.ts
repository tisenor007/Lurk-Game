import AssetManager from "./AssetManager";

export default class GameCharacter{

    public static DEAD:number = 0;
    public static ALIVE:number = 1;

    public health:number;
    public shield:number;
    public lives:number;
    public vitalStatus:number;
    public stage:createjs.StageGL;
    public sprite:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, animation:string){
        this.stage = stage;
        this.vitalStatus = GameCharacter.ALIVE;
        this.sprite = assetManager.getSprite("assets", animation);
    }
}