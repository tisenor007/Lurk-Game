import Arrow from "./Arrow";
import AssetManager from "./AssetManager";
import { MAX_ARROWS_ON_SCREEN, MAX_ENEMIES, PLAYER_SPEED } from "./Constants";
import Enemy from "./Enemy";
import Player from "./Player";

export default class World{

    public offsetX:number;
    public offsetY:number;
    private player:Player;
    private stage:createjs.StageGL;
    public maxArrowsOnScreen:Arrow[] = [];
    public enemies:Enemy[] = [];

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, maxArrowsOnScreen:Arrow[], enemies:Enemy[]){
        this.stage = stage;
        this.player = player;
        this.maxArrowsOnScreen = maxArrowsOnScreen;
        this.enemies = enemies; 
    }
    public Update():void{
        this.offsetX = this.player.xLoc;
        this.offsetY = this.player.yLoc;
        if (this.player.canWalk == false){
            if (this.player.direction == 1){this.player.yLoc = this.player.yLoc - 1;}
            else if (this.player.direction == 2){this.player.yLoc = this.player.yLoc + 1;}
            else if (this.player.direction == 3){this.player.xLoc = this.player.xLoc - 1;}
            else if (this.player.direction == 4){this.player.xLoc = this.player.xLoc + 1;}
        } 
    }

    public OffSetWorld():void{
        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
            for (let e:number = 0; e <= MAX_ENEMIES; e++){
                if (this.player.direction == 3)
                { 
                    if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.x = this.maxArrowsOnScreen[i].sprite.x + PLAYER_SPEED / 90;}
                    if (this.enemies[e] == null){}
                    else{this.enemies[e].sprite.x = this.enemies[e].sprite.x + PLAYER_SPEED / 9;}
                }
                if (this.player.direction == 4)
                {
                    if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.x = this.maxArrowsOnScreen[i].sprite.x - PLAYER_SPEED / 90 ;}
                    if (this.enemies[e] == null){}
                    else{this.enemies[e].sprite.x = this.enemies[e].sprite.x - PLAYER_SPEED / 9;}
                }
                if (this.player.direction == 1)
                {
                    if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.y = this.maxArrowsOnScreen[i].sprite.y + PLAYER_SPEED /90;}
                    if (this.enemies[e] == null){}
                    else {this.enemies[e].sprite.y = this.enemies[e].sprite.y + PLAYER_SPEED / 9;}
                }
                if (this.player.direction == 2)
                {
                    if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.y = this.maxArrowsOnScreen[i].sprite.y - PLAYER_SPEED /90;}
                    if (this.enemies[e] == null){}
                    else{this.enemies[e].sprite.y = this.enemies[e].sprite.y - PLAYER_SPEED / 9;}
                }
            }
        
        }
    }
}