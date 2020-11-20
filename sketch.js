var luna, lunastartimg;
var livesimg, life1, life2, life3, life4, life5;
var pumpkinsr, pumpkinsl, pumpkinsd, pumpkingroupr, pumpkingroupl, pumpkingroupd;
var evilred, evilblue, evilyellow, evilgreen;
var draw, bgsprite, bgimg, hurtsound, endpumpkin, endpumpimg;
var hearts, heartsgroup, heartimg, canvas;
var lives = 5;
var score = 0;
var drawing = [];
var currentPath = [];
var gamestate = "start";

function preload() {
  livesimg = loadImage("Images/Lives.png")
  endpumpimg = loadImage("Images/Evil end.png")

  evilred = loadImage("Images/Evil red.png");
  evilblue = loadImage("Images/Evil blue.png");
  evilyellow = loadImage("Images/Evil yellow.png");
  evilgreen = loadImage("Images/Evil green.png");

  bgimg = loadImage("Images/Background.png")
  heartimg = loadImage("Images/Lives powerup.png")

  hurtsound = loadSound("Sounds/Injured music.mp3")
  lunahurt = loadAnimation("Images/Luna hurt.png")
  lunastartimg = loadAnimation("Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png", "Images/Luna 1.png",  "Images/Luna 2.png", "Images/Luna 2.png", "Images/Luna 2.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(start);

  pumpkingroupr = new Group();
  pumpkingroupl = new Group();
  pumpkingroupd = new Group();
  drawgroup = new Group();
  heartsgroup = new Group();

  /*bgsprite = createSprite(700, 400, 1400, 800)
  bgsprite.addImage("bgimg", bgimg)
  bgsprite.scale = 2;*/

  luna = createSprite(width/2, height/2);
  luna.addAnimation("luna", lunastartimg)

  life1 = createSprite(50, 30);
  life1.addImage("life1", livesimg)

  life2 = createSprite(100, 30);
  life2.addImage("life2", livesimg)

  life3 = createSprite(150, 30);
  life3.addImage("life3", livesimg)

  life4 = createSprite(200, 30);
  life4.addImage("life4", livesimg)

  life5 = createSprite(250, 30);
  life5.addImage("life5", livesimg)
}

function draw() {
  background("blue");

  if (gamestate === "start") {
    if (mouseIsPressed) {
      var point = {
        x: mouseX,
        y: mouseY
      }
      currentPath.push(point);
    }
    noFill();
    stroke("lightgreen");
    strokeWeight(5)
    for (var i = 0; i<drawing.length; i++){
      var path = drawing[i]
      beginShape();
      for (var j =0; j < path.length; j++) {
        vertex(path[j].x, path[j].y)
      }
      endShape();
    }
  pumpkin();
  heart();

  luna.setCollider("rectangle", 0, 0, 100, 100)
    console.log(mouseX)

  if (pumpkinsr!== undefined) {
    if (pumpkinsr.x<width/2-20) {
      pumpkinsr.x = pumpkinsr.x+5;
    }
  }

  if (pumpkinsl!== undefined) {
    if (pumpkinsl.x>width/2+20) {
      pumpkinsl.x = pumpkinsl.x-5;
    }
  }

  if (pumpkinsd!== undefined) {
    if (pumpkinsd.y>height/2-20) {
      pumpkinsd.y = pumpkinsd.y-5;
    }
  }

  if (pumpkinsr!==undefined) {
    if(pumpkinsr.x>width/2-20&&pumpkinsr.x<width/2+30){
      for(var a=0; a<pumpkingroupr.length; a++){
           if(pumpkingroupr.isTouching(luna)){
             luna.addAnimation("luna", lunahurt)
             console.log("his")
             hurtsound.play();
             pumpkingroupr.get(a).destroy();
             lives = lives-1;
           } else {
            luna.addAnimation("luna", lunastartimg)
           }
       }
      }
  }

  if (pumpkinsl!==undefined) {
    if(pumpkinsl.x>width/2-20&&pumpkinsl.x<width/2+30){
      for(var b=0; b<pumpkingroupl.length; b++){
        if(pumpkingroupl.isTouching(luna)){
          luna.addAnimation("luna", lunahurt)
          hurtsound.play();
          pumpkingroupl.get(b).destroy();
          lives = lives-1;
        } else {
          luna.addAnimation("luna", lunastartimg)
         }
    }
  }
  }

  if (pumpkinsd!==undefined) {
    if(pumpkinsd.y<height/2-20&&pumpkinsd.y>height/2+50){
      for(var c=0; c<pumpkingroupd.length; c++){
           if(pumpkingroupd.isTouching(luna)){
            luna.addAnimation("luna", lunahurt)
            hurtsound.play();
            pumpkingroupd.get(c).destroy();
            lives = lives-1;
           } else {
            luna.addAnimation("luna", lunastartimg)
           }
      }
    }
  }
}

  if (lives === 5) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
  }

  if (lives === 4) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = false;
  }

  if (lives === 3) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = false;
    life5.visible = false;
  }

  if (lives === 2) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
  }

  if (lives === 1) {
    life1.visible = true;
    life2.visible = false;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
  }

  if (lives === 0) {
    life1.visible = false;
    life2.visible = false;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
    gamestate = "end"
  }

  drawSprites();

  if (gamestate === "end") {
    endpumpkin = createSprite(width/6, height/6);
    endpumpkin.addImage("end", endpumpimg)
    textSize(12)
    fill("white");
    stroke("pink");
    strokeWeight(1)
    text("Uh-oh! The pumpkins have take over!", width/2-80, height/2);
    text("Don't worry, we can try again! Press R to play", width/2-80, height/2+20)
    luna.destroy();
   // bgsprite.destroy();
    pumpkingroupl.destroyEach();
    pumpkingroupr.destroyEach();
    pumpkingroupd.destroyEach();
    hearts.destroy();
    if (mouseIsOver(endpumpkin)) {
      text("You cannot defeat me!", width/2-40, height/4)
    }
  }
  textSize(12);
  stroke("white")
  strokeWeight(1)
  fill("white");
  textFont("Comic Sans")
  text("Score: "+score, width-50, height-30)
}

function pumpkin() {
  if (frameCount%100===0&&gamestate==="start") {
    var position = Math.round(random(1,3));

    var randimg = Math.round(random(1,4));

    if (position === 1) {
      pumpkinsr = createSprite(30, random(height/2-20, height/2+30));
      pumpkinsr.shapeColor = "red";
      pumpkingroupr.add(pumpkinsr);

      if (randimg === 1){
        pumpkinsr.addImage("randomimgr", evilred);
      }
      if (randimg === 2){
        pumpkinsr.addImage("randomimgr", evilblue);
      }
      if (randimg === 3){
        pumpkinsr.addImage("randomimgr", evilyellow);
      }
      if (randimg === 4){
        pumpkinsr.addImage("randomimgr", evilgreen);
      }
      pumpkinsr.scale = 0.7;
    }

    if (position === 2) {
      pumpkinsl = createSprite(1370, random(height/2-20, height/2+30));
      pumpkinsl.shapeColor = "green";
      pumpkingroupl.add(pumpkinsl);

      if (randimg === 1){
        pumpkinsl.addImage("randomimgl", evilred);
      }
      if (randimg === 2){
        pumpkinsl.addImage("randomimgl", evilblue);
      }
      if (randimg === 3){
        pumpkinsl.addImage("randomimgl", evilyellow);
      }
      if (randimg === 4){
        pumpkinsl.addImage("randomimgl", evilgreen);
      }
      pumpkinsl.scale = 0.7;
    }

    if (position === 3) {
      pumpkinsd = createSprite(random(width/2-20, width/2+30), 750);
      pumpkinsd.shapeColor = "yellow";
      pumpkingroupd.add(pumpkinsd);

      if (randimg === 1){
        pumpkinsd.addImage("randomimgd", evilred);
      }
      if (randimg === 2){
        pumpkinsd.addImage("randomimgd", evilblue);
      }
      if (randimg === 3){
        pumpkinsd.addImage("randomimgd", evilyellow);
      }
      if (randimg === 4){
        pumpkinsd.addImage("randomimgd", evilgreen);
      }
      pumpkinsd.scale = 0.7;
    }
  }
}
function heart(){
  if (lives === 3) {
    hearts = createSprite(width/8, height/2);
    hearts.addImage("heart", heartimg);
    hearts.scale = 0.7;
    heartsgroup.add(hearts);
  } else {
    heartsgroup.destroyEach();
  }
}
function start(){
  currentPath = [];
  drawing.push(currentPath);
}
function mouseReleased(){
  drawing = [];
}

//link to game: https://www.google.com/doodles/halloween-2020


//Left to do: add the restart functoin

/*drawing shapes
 - sounds
 - add the score
 - luna images

 debug
 - pumkins stopping
 - sound
 - luna change image*/