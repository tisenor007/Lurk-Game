export function randomNum(low:number, high:number):number{
    let randomNum:number = 0;
    randomNum = Math.floor(Math.random() * (high - low + 1)) + low;
    return randomNum;
}

export function radiusHit(sprite1:createjs.Sprite, radius1:number, sprite2:createjs.Sprite, radius2:number):boolean{

    let a:number = sprite1.x - sprite2.x;
    let b:number = sprite1.y - sprite2.y;

    let c:number = Math.sqrt((a * a) + (b * b));
    if (c <= ( radius1 + radius2)){
        return true;
    }
    else{
        return false;
    }
}

export function boxHit(sprite1:createjs.Sprite, sprite2:createjs.Sprite):boolean {
    
    let width1:number = sprite1.getBounds().width;
    let height1:number = sprite1.getBounds().height;
    let width2:number = sprite2.getBounds().width;
    let height2:number = sprite2.getBounds().height;

    if ((sprite1.x + width1 > sprite2.x) &&
        (sprite1.y + height1 > sprite2.y) &&
        (sprite1.x < sprite2.x + width2) &&
        (sprite1.y < sprite2.y + height2)) {
        return true;
    } else {
        return false;
    }
}