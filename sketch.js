/// <reference path="./node_modules/@types/p5/global.d.ts" />

const playerSpeed = 4;

let groupEntity;
let groupWall;

let player;

function setup() {
    createCanvas(windowWidth - 20,windowHeight - 20);

    groupEntity = new Group();
    groupWall = new Group();

    player = createSprite(width/2,height/2,30,30);
    groupEntity.add(player);

    groupWall.add(createSprite(width/3,height/3,40,40));
}

function draw() {
    background(220);

    groupEntity.collide(groupWall,(a,b) => a.displace(b));


    playerMovement();
    drawSprites();
}


function playerMovement() {
    player.velocity.x = keyDown('a') ? -playerSpeed : keyDown('d') ? playerSpeed : 0;
    player.velocity.y = keyDown('w') ? -playerSpeed : keyDown('s') ? playerSpeed : 0;
}
