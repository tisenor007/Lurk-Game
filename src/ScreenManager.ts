import AssetManager from "./AssetManager";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import LevelManager from "./LevelManager";
import Light from "./Light";
import SoundManager from "./SoundManager";

export default class ScreenManager{
    
    
    public levelManager:LevelManager;
    public eventStartGame:createjs.Event;
    public eventRestartGame:createjs.Event;

    private stage:createjs.StageGL;

    private introScreen:createjs.Container;
    private infoScreen:createjs.Container;
    private gameOverScreen:createjs.Container;
    private gameWinScreen:createjs.Container;
    private soundManager:SoundManager;

    
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, levelManager:LevelManager, soundManager:SoundManager){

        this.stage = stage;
        this.levelManager = levelManager;
        this.soundManager = soundManager;

        this.introScreen = new createjs.Container();
        this.introScreen.addChild(assetManager.getSprite("assets", "other/MainMenu", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.infoScreen = new createjs.Container();
        this.infoScreen.addChild(assetManager.getSprite("assets", "other/infoScreen", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.gameOverScreen = new createjs.Container();
        this.gameOverScreen.addChild(assetManager.getSprite("assets", "other/GameOverScreen", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.gameWinScreen = new createjs.Container();
        this.gameWinScreen.addChild(assetManager.getSprite("assets", "other/WinScreen", STAGE_WIDTH/2, STAGE_HEIGHT/2));

        this.eventStartGame = new createjs.Event("gameStart", true, false);
        this.eventRestartGame = new createjs.Event("gameRestart", true, false);
    }

    public ShowIntroScreen():void{
        this.levelManager.gameLoaded = false;
        this.soundManager.PlayTitleMusic();
        this.stage.removeAllChildren();
        this.stage.addChild(this.introScreen);
        this.introScreen.on("click", this.ShowInfoScreen, this);
    }

    public ShowInfoScreen():void{
        this.levelManager.gameLoaded = false;
        this.soundManager.PlayTitleMusic();
        this.stage.removeAllChildren();
        this.stage.addChild(this.infoScreen);
        this.infoScreen.on("click", (e) =>{ this.stage.dispatchEvent(this.eventStartGame);}, this, true);
    }

    public ShowGameOverScreen():void{
        this.levelManager.gameLoaded = false;
        this.soundManager.PlayLossMusic();
        //this.stage.removeAllChildren();
        this.stage.children.forEach(child => this.stage.removeChild(child));
        this.stage.addChild(this.gameOverScreen);
        this.gameOverScreen.on("click", (e) =>{ this.stage.dispatchEvent(this.eventRestartGame);}, this, true);
    }

    public ShowGameWinScreen():void{
        this.levelManager.gameLoaded = false;
        this.soundManager.PlayWinMusic();
        //this.stage.removeAllChildren();
        this.stage.children.forEach(child => this.stage.removeChild(child));
        this.stage.addChild(this.gameWinScreen);
        this.gameWinScreen.on("click", (e) =>{ this.stage.dispatchEvent(this.eventRestartGame);}, this, true);
    }
}