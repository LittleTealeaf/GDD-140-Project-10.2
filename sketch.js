/// <reference path="./node_modules/@types/p5/global.d.ts" />

const playerSpeed = 4;

let groupEntity;
let groupWall;
let groupEnemy;
let groupGoal;

let player;

function setup() {
    createCanvas(windowWidth - 20,windowHeight - 20);

    groupEntity = new Group();
    groupWall = new Group();
    groupEnemy = new Group();
    groupGoal = new Group();

    player = createSprite(width/2,height/2,15,15);
    player.friction = 0.1;
    groupEntity.add(player);

    for(var i = 0; i < 150; i++) {
        const s = createSprite(random(width),random(height),40,40);
        s.shapeColor = color('grey');
        groupWall.add(s);
    }

    for(var i = 0; i < 15; i++) {
        const rot = random(0,360);
        const dist = random(width/4,width/2);
        const s = createSprite(dist * cos(rot) + width / 2,dist * sin(rot) + height / 2,30,30);
        s.friction = 0.1;
        s.shapeColor = color('red');
        groupEntity.add(s);
        groupEnemy.add(s);
    }

    for(var i = 0; i < 5; i++) {
        const s = createSprite(random(width),random(height),20,20);
        s.shapeColor = color('green');
        groupGoal.add(s);
        groupEntity.add(s);
    }

}

function draw() {
    background(220);

    groupEntity.collide(groupWall,(a,b) => a.displace(b));

    groupEnemy.toArray().forEach((item) => {
        item.attractionPoint(0.1,player.position.x,player.position.y);
    });

    groupEnemy.collide(player, (a,b) => {
        
    });


    playerMovement();
    drawSprites();
}


function playerMovement() {
    player.velocity.x = keyDown('a') ? -playerSpeed : keyDown('d') ? playerSpeed : player.velocity.x;
    player.velocity.y = keyDown('w') ? -playerSpeed : keyDown('s') ? playerSpeed : player.velocity.y;
}
