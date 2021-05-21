import AssetManager from "./AssetManager";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import LevelManager from "./LevelManager";
import Light from "./Light";

export default class ScreenManager{
    
    private stage:createjs.StageGL;
    public levelManager:LevelManager;

    private introScreen:createjs.Container;
    private infoScreen:createjs.Container;
    private gameOverScreen:createjs.Container;
    private gameWinScreen:createjs.Container;

    public eventStartGame:createjs.Event;
    public eventRestartGame:createjs.Event;
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, levelManager:LevelManager){

        this.stage = stage;
        this.levelManager = levelManager;

        this.introScreen = new createjs.Container();
        this.introScreen.addChild(assetManager.getSprite("assets", "other/MainMenu", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.infoScreen = new createjs.Container();
        this.infoScreen.addChild(assetManager.getSprite("assets", "other/InfoScreen", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.gameOverScreen = new createjs.Container();
        this.gameOverScreen.addChild(assetManager.getSprite("assets", "other/GameOverScreen", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.gameWinScreen = new createjs.Container();
        this.gameWinScreen.addChild(assetManager.getSprite("assets", "other/WinScreen", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.eventStartGame = new createjs.Event("gameStart", true, false);
        this.eventRestartGame = new createjs.Event("gameRestart", true, false);
    }

    public ShowIntroScreen():void{
        this.levelManager.gameLoaded = false;
        this.stage.removeAllChildren();
        this.stage.addChild(this.introScreen);
        this.introScreen.on("click", this.ShowInfoScreen, this);
    }

    public ShowInfoScreen():void{
        this.levelManager.gameLoaded = false;
        this.stage.removeAllChildren();
        this.stage.addChild(this.infoScreen);
        this.infoScreen.on("click", (e) =>{ this.stage.dispatchEvent(this.eventStartGame);}, this, true);
    }

    public ShowGameOverScreen():void{
        this.levelManager.gameLoaded = false;
        this.stage.removeAllChildren();
        this.stage.addChild(this.gameOverScreen);
        this.gameOverScreen.on("click", (e) =>{ this.stage.dispatchEvent(this.eventRestartGame);}, this, true);
    }

    public ShowGameWinScreen():void{
        this.levelManager.gameLoaded = false;
        //this.stage.removeAllChildren();
        this.stage.addChild(this.gameWinScreen);
        this.gameWinScreen.on("click", (e) =>{ this.stage.dispatchEvent(this.eventRestartGame);}, this, true);
    }
}