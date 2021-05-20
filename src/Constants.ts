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

export const GENERAL_MAP_SIZE:number = 768;

export const ASSET_MANIFEST:Object[] = [
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
    {
        type:"sound",
        src:"./lib/sounds/beep.ogg",
        id:"beep",
        data:4
    },
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
