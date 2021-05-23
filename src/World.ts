import Arrow from "./Arrow";
import AssetManager from "./AssetManager";
import { MAX_ARROWS_ON_SCREEN, MAX_ENEMIES, MAX_PICKUPS, PLAYER_SPEED } from "./Constants";
import Enemy from "./Enemy";
import GameCharacter from "./GameCharacter";
import Pickup from "./Pickup";
import Player from "./Player";

export default class World{

    private player:Player;
    private stage:createjs.StageGL;
    public maxArrowsOnScreen:Arrow[] = [];
    public enemies:Enemy[] = [];
    public pickups:Pickup[] = [];

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, maxArrowsOnScreen:Arrow[], enemies:Enemy[], pickups:Pickup[]){
        this.stage = stage;
        this.player = player;
        this.maxArrowsOnScreen = maxArrowsOnScreen;
        this.enemies = enemies; 
        this.pickups = pickups;
    }

    public OffSetWorld():void{
       
           
                
                    if (this.player.movement == GameCharacter.LEFT && this.player.vitalStatus == GameCharacter.ALIVE)
                    { 
                        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
                        if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.x = this.maxArrowsOnScreen[i].sprite.x + PLAYER_SPEED;}
                        }
                        for (let e:number = 0; e <= MAX_ENEMIES; e++){
                        if (this.enemies[e] == null){}
                        else{this.enemies[e].sprite.x = this.enemies[e].sprite.x + PLAYER_SPEED;}
                        }
                        for (let p:number = 0; p <= MAX_PICKUPS; p++){
                        if (this.pickups[p] == null){}
                        else{this.pickups[p].sprite.x = this.pickups[p].sprite.x + PLAYER_SPEED;}
                        }
                    }
                    if (this.player.movement == GameCharacter.RIGHT && this.player.vitalStatus == GameCharacter.ALIVE)
                    {
                        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
                        if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.x = this.maxArrowsOnScreen[i].sprite.x - PLAYER_SPEED;}
                        }
                        for (let e:number = 0; e <= MAX_ENEMIES; e++){
                        if (this.enemies[e] == null){}
                        else{this.enemies[e].sprite.x = this.enemies[e].sprite.x - PLAYER_SPEED;}
                        }
                        for (let p:number = 0; p <= MAX_PICKUPS; p++){
                        if (this.pickups[p] == null){}
                        else{this.pickups[p].sprite.x = this.pickups[p].sprite.x - PLAYER_SPEED;}
                        }
                    }
                    if (this.player.movement == GameCharacter.UP && this.player.vitalStatus == GameCharacter.ALIVE)
                    {
                        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
                        if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.y = this.maxArrowsOnScreen[i].sprite.y + PLAYER_SPEED;}
                        }
                        for (let e:number = 0; e <= MAX_ENEMIES; e++){
                        if (this.enemies[e] == null){}
                        else {this.enemies[e].sprite.y = this.enemies[e].sprite.y + PLAYER_SPEED;}
                        }
                        for (let p:number = 0; p <= MAX_PICKUPS; p++){
                        if (this.pickups[p] == null){}
                        else{this.pickups[p].sprite.y = this.pickups[p].sprite.y + PLAYER_SPEED;}
                        }
                    }
                    if (this.player.movement == GameCharacter.DOWN && this.player.vitalStatus == GameCharacter.ALIVE)
                    {
                        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++){
                        if (this.maxArrowsOnScreen[i].used == true){this.maxArrowsOnScreen[i].sprite.y = this.maxArrowsOnScreen[i].sprite.y - PLAYER_SPEED;}
                        }
                        for (let e:number = 0; e <= MAX_ENEMIES; e++){
                        if (this.enemies[e] == null){}
                        else{this.enemies[e].sprite.y = this.enemies[e].sprite.y - PLAYER_SPEED;}
                        }
                        for (let p:number = 0; p <= MAX_PICKUPS; p++){
                        if (this.pickups[p] == null){}
                        else{this.pickups[p].sprite.y = this.pickups[p].sprite.y - PLAYER_SPEED;}
                        }
                    }
                
            
        
    }
}