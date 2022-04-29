/// <reference path="./node_modules/@types/p5/global.d.ts" />

/*

Use the WSAD keys to move around. The goal is to collect 15 of the green points (ther are more points than required to compensate for some being unreachable). However, avoid the red squares or they will killy you!
*/


const playerSpeed = 4;
const pointsCount = 20;
const pointsToWin = 15;

var points = 0;
var lives = 3;

var groupEntity;
var groupWall;
var groupEnemy;
var groupGoal;

var player;

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);

    groupEntity = new Group();
    groupWall = new Group();
    groupEnemy = new Group();
    groupGoal = new Group();

    player = createSprite(width / 2, height / 2, 15, 15);
    player.friction = 0.1;
    player.shapeColor = color('blue');
    groupEntity.add(player);

    for (var i = 0; i < 150; i++) {
        const s = createSprite(random(width), random(height), 40, 40);
        s.shapeColor = color('grey');
        groupWall.add(s);
    }

    for (var i = 0; i < 15; i++) {
        const rot = random(0, 360);
        const dist = random(width / 4, width / 2);
        const s = createSprite(dist * cos(rot) + width / 2, dist * sin(rot) + height / 2, 25, 25);
        s.friction = 0.1;
        s.shapeColor = color('red');
        groupEntity.add(s);
        groupEnemy.add(s);
    }

    for (var i = 0; i < pointsCount; i++) {
        const s = createSprite(random(width), random(height), 20, 20);
        s.shapeColor = color('green');
        groupGoal.add(s);
        groupEntity.add(s);
    }

}

function draw() {
    background(220);

    textAlign(LEFT,TOP);

    if (lives > 0 && points < pointsToWin) {
        groupEntity.collide(groupWall, (a, b) => a.displace(b));

        groupEnemy.toArray().forEach((item) => {
            item.attractionPoint(0.1, player.position.x, player.position.y);
        });

        groupEnemy.collide(player, (a, b) => {
            lives--;
            a.remove();
        });

        groupGoal.collide(player, (a, b) => {
            points++;
            a.remove()
        });


        playerMovement();
        drawSprites();

        textSize(30);
        text("Points: " + points + "/" + pointsToWin, 0, 0);
        text("Lives: " + lives, 0,30);
    } else {
        textSize(30);
        textAlign(CENTER,CENTER);
        if(points < pointsToWin) {
            text("YOU LOSE, HIT SPACE TO PLAY AGAIN",width/2,height/2);
        } else {
            text("YOU WIN! PRESS SPACE TO PLAY AGAIN",width/2,height/2);
        }

        if(keyDown('space')) {
            lives = 3;
            points = 0;
            while(allSprites.length > 0) {
                allSprites[0].remove();
            }
            setup();
        }
    }
}


function playerMovement() {
    player.velocity.x = keyDown('a') ? -playerSpeed : keyDown('d') ? playerSpeed : player.velocity.x;
    player.velocity.y = keyDown('w') ? -playerSpeed : keyDown('s') ? playerSpeed : player.velocity.y;
}
