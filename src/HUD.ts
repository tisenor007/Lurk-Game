import AssetManager from "./AssetManager";
import Player from "./Player";
import {STAGE_HEIGHT, STAGE_WIDTH} from "./Constants";

export default class HUD{
    private stage:createjs.StageGL;
    private player:Player;

    private livesTxt:createjs.BitmapText;
    private livesNumber:createjs.BitmapText;

    private healthTxt:createjs.BitmapText;
    private healthNumber:createjs.BitmapText;

    private shieldTxt:createjs.BitmapText;
    private shieldNumber:createjs.BitmapText;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        this.stage = stage;
        this.player = player;

        this.livesTxt = new createjs.BitmapText("LIVES", assetManager.getSpriteSheet("glyphs"));
        this.livesNumber = new createjs.BitmapText("00", assetManager.getSpriteSheet("glyphs"));

        this.healthTxt = new createjs.BitmapText("HEALTH", assetManager.getSpriteSheet("glyphs"));
        this.healthNumber = new createjs.BitmapText("00", assetManager.getSpriteSheet("glyphs"));

        this.shieldTxt = new createjs.BitmapText("SHIELD", assetManager.getSpriteSheet("glyphs"));
        this.shieldNumber = new createjs.BitmapText("00", assetManager.getSpriteSheet("glyphs"));
    }

    public ShowHUD():void{
        this.livesTxt.x = STAGE_WIDTH - 140;
        this.livesTxt.y = -17;
        this.livesNumber.x = STAGE_WIDTH - 30;
        this.livesNumber.y = -17;

        this.healthTxt.x = 3;
        this.healthTxt.y = STAGE_HEIGHT - 53;
        this.healthNumber.x = 140;
        this.healthNumber.y = STAGE_HEIGHT - 53;

        this.shieldTxt.x = 3;
        this.shieldTxt.y = STAGE_HEIGHT - 83;
        this.shieldNumber.x = 140;
        this.shieldNumber.y = STAGE_HEIGHT - 83;

        this.stage.addChild(this.livesTxt);
        this.stage.addChild(this.livesNumber);
        this.stage.addChild(this.healthTxt);
        this.stage.addChild(this.healthNumber);
        this.stage.addChild(this.shieldTxt);
        this.stage.addChild(this.shieldNumber);
    }

    public Update():void{
        this.livesNumber.text = this.player.lives.toString();
        this.healthNumber.text = this.player.health.toString();
        this.shieldNumber.text = this.player.shield.toString();
    }
}