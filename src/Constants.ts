// game constants
export const STAGE_WIDTH:number = 400;
export const STAGE_HEIGHT:number = 400;
export const FRAME_RATE:number = 30;

export const PLAYER_SPEED:number = 2.5;
export const PLAYER_MAX_LIVES:number = 3;
export const PLAYER_MAX_HEALTH:number = 100;
export const PLAYER_MAX_SHIELD:number = 50;
export const STARTING_ARROW_AMOUNT:number = 20;

export const MAX_ARROWS_ON_SCREEN = 8;
export const ARROW_SPEED:number = 6;
export const ARROW_RELOAD:number = 20;

export const MAX_ENEMIES:number = 100;
export const MAX_PICKUPS:Number = 100;

export const GENERAL_MAP_SIZE:number = 768;

export const ASSET_MANIFEST:Object[] = [
    //assets
    {
        type:"json",
        src:"./lib/spritesheets/assets.json",
        id:"assets",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/assets.png",
        id:"assets",
        data:0
    },
    //sounds
    {
        type:"sound",
        src:"./lib/sounds/arrowFire.wav",
        id:"arrowFire",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/itemPickup.wav",
        id:"itemPickup",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/playerhurt.wav",
        id:"playerHurt",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/playerdeath.wav",
        id:"playerDeath",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/enemyhurt.wav",
        id:"enemyHurt",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/enemydeath.wav",
        id:"enemyDeath",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/enemyattack.wav",
        id:"enemyAttack",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/bosshurt.wav",
        id:"bossHurt",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/bossdeath.wav",
        id:"bossDeath",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/bossattack.wav",
        id:"bossAttack",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/bossmusic.wav",
        id:"bossMusic",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/deathmusic.wav",
        id:"gameLoss",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/winmusic.wav",
        id:"gameWin",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/titlemusic.wav",
        id:"titleMusic",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/levelmusic.wav",
        id:"mainLevelMusic",
        data:4
    },
    //glyphs
    {
        type:"json",
        src:"./lib/spritesheets/glyphs.json",
        id:"glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/glyphs.png",
        id:"glyphs",
        data:0
    }               
];
