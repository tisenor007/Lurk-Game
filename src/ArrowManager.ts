import Arrow from "./Arrow";
import AssetManager from "./AssetManager";
import { MAX_ARROWS_ON_SCREEN } from "./Constants";
import Player from "./Player";
import SoundManager from "./SoundManager";
import World from "./World";

export default class ArrowManager{
 
    public arrowCoolDown:number = 0;
    public maxArrowsOnScreen:Arrow[] = [];
    private stage:createjs.StageGL;
    private assetManager:AssetManager;
    private world:World;
    private player:Player;
    private soundManager:SoundManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, world:World, player:Player, soundManager:SoundManager){
        this.stage = stage;
        this.assetManager = assetManager;
        this.world = world;
        this.player = player;
        this.soundManager = soundManager;
    }

    public InitArrows():void{
        //initiates every arrow
        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++)
        {
            this.maxArrowsOnScreen[i] = new Arrow(this.stage, this.assetManager, this.world, this.player, this.soundManager);
        }
    }

    //method used for level changes to prevent arrow, level warping
    public ResetArrows():void{
        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++)
        {
            this.maxArrowsOnScreen[i].remove();
        }
    }
    
    public Update():void{
        //drains arrow's reload / cooldown to prevent rapid fire
        this.arrowCoolDown--;
        if (this.arrowCoolDown <=0){this.arrowCoolDown = 0;}

        //updates every arrow
        for (let i:number = 0; i <= MAX_ARROWS_ON_SCREEN; i++)
        {
            this.maxArrowsOnScreen[i].Update();
        }
    }
}