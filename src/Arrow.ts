import AssetManager from "./AssetManager";
import { ARROW_SPEED, STAGE_HEIGHT, STAGE_WIDTH, } from "./Constants";
import Player from "./Player";
import SoundManager from "./SoundManager";
import World from "./World";

export default class Arrow{

    public sprite:createjs.Sprite;
    public aimDirection:number;
    public used:boolean = false;
    private stage:createjs.StageGL;
    private player:Player;
    private soundManager:SoundManager
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, world:World, player:Player, soundManager:SoundManager){
        this.stage = stage;
        this.player = player;
        this.soundManager = soundManager
        this.sprite = assetManager.getSprite("assets", "Arrow/arrow_up");
        //set the arrow to always start at the middle of the screen AKA character location
        this.sprite.x = STAGE_WIDTH / 2;
        this.sprite.y = STAGE_HEIGHT / 2;
        this.aimDirection = 2;
    }

    public Shoot():void{
        if (this.player.availableArrows <= 0){
            //no arrows available.....
        }
        else{
            this.soundManager.PlayArrowShoot();
            //based off character direction it will be placed at the player location + a little extra so the arrow doesn't seem like its coming directly out of the character.....
            if (this.player.direction == 1){
                this.sprite.x = STAGE_WIDTH / 2;
                this.sprite.y = STAGE_HEIGHT / 2 - 25;
                this.aimDirection = 1;
            }
            if (this.player.direction == 2){
                this.sprite.x = STAGE_WIDTH / 2;
                this.sprite.y = STAGE_HEIGHT / 2 + 15;
                this.aimDirection = 2;
            }
            if (this.player.direction == 3){
                this.sprite.x = STAGE_WIDTH / 2 - 12;
                this.sprite.y = STAGE_HEIGHT / 2;
                this.aimDirection = 3;
            }
            if (this.player.direction == 4){
                this.sprite.x = STAGE_WIDTH / 2 + 12;
                this.sprite.y = STAGE_HEIGHT / 2;
                this.aimDirection = 4;
            }
            //on shoot arrow is added and is used, also players availble arrows go down
            this.stage.addChild(this.sprite);
            this.player.availableArrows = this.player.availableArrows - 1;
            this.used = true;
        }
    }

    public remove():void{
        //on remove, removes arrow and is set to not used, also returns to the center of screen.....
        this.stage.removeChild(this.sprite);
        this.used = false;
        this.sprite.x = STAGE_WIDTH / 2;
        this.sprite.y = STAGE_HEIGHT / 2;
    }

    public Update():void{
        //arrow wil only update if it is on visible AKA used......
        if (this.used == true){
            //based on direction arrow will fire in that direction and display as that direction.....
            if (this.aimDirection == 1){
                this.sprite.gotoAndStop("Arrow/arrow_up");
                this.sprite.y = this.sprite.y - ARROW_SPEED;
            }
            if (this.aimDirection == 2){
                this.sprite.gotoAndStop("Arrow/arrow_down");
                this.sprite.y = this.sprite.y + ARROW_SPEED;
            }
            if (this.aimDirection == 3){
                this.sprite.gotoAndStop("Arrow/arrow_left");
                this.sprite.x = this.sprite.x - ARROW_SPEED;
            }
            if (this.aimDirection == 4){
                this.sprite.gotoAndStop("Arrow/arrow_right");
                this.sprite.x = this.sprite.x + ARROW_SPEED;
            }
            //if arrow goes off screen will be removed...
            if (this.sprite.x <= 0){
                this.remove();
            }
            if (this.sprite.y <= 0){
                this.remove();
            }
            if (this.sprite.x >= STAGE_WIDTH){
                this.remove();
            }
            if (this.sprite.y >= STAGE_HEIGHT){
                this.remove();
            }
        }

    }
    
}