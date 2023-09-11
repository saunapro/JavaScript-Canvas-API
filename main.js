const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const musa = document.getElementById("taustamusa");
const aani = document.getElementById("loppuaani");

let alku = false;
let loppu = false;
//Tämä on tosi kun peli hävitään
let peliohi = false;
//Tämäkin on tosi kun peli hävitään, estää pelaajaa liikkumasta kun peli on hävitty
let pisteetohi = false;
//Estää pistemäärää muuttumasta kun peli on hävitty

let pointWall = 1000; //pelin vaikeustaso vaihtuu joka 500 pisteen jälkeen

const player = {
  x: 50,
  y: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  w: 100,
  h: 100
};

const ball = {
  x: 200,
  y: 200,
  dx: 2,
  dy: 1,
  w: 60,
  h: 60
}

const keys = {}; 

function musaSoimaan(){
  musa.play().catch((error) => {
    console.error("Virhe äänentoistossa", error);
  });
}

function loppuAani(){
  aani.play().catch((error) => {
    console.error("Virhe äänentoistossa", error);
  });
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    const image = new Image();
    image.src = 'kuva/kuva.png'; 
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function drawBall() {
  const image = new Image();
  image.src = 'kuva/este.png';
  ctx.drawImage(image, ball.x, ball.y, ball.w, ball.h);
}

function newPos() {  // pallon liikkuminen 
  ball.x += ball.dx;
  ball.y += ball.dy;
   // vasen ja oikee
   if (ball.x + ball.w > canvas.width || ball.x < 0) {
     ball.dx *= -1;
   }
   // ylä ja ala
   if (ball.y + ball.h > canvas.height || ball.y < 0) {
    ball.dy *= -1;
   }

  if (
    ball.x < player.x + player.w &&
    ball.x + ball.w > player.x &&
    ball.y < player.y + player.h &&
    ball.y + ball.h > player.y
  ) {
    peliohi = true;
    loppu = true;
    alku = false;
    loppuAani()
    const canvask = document.getElementById("canvas");
    const aloitus = document.getElementById("aloitus");
    const maara = document.getElementById("pisteet");
    const loppuruutu = document.getElementById("havio");
    const loppuruutu2 = document.getElementById("havio2");
    const pisteetpiiloon = document.getElementById("pisteet");
    const loppupisteet = document.getElementById("lopputulos");
    loppupisteet.textContent = maara.textContent;
    loppupisteet.style.fontSize = "x-large"
    loppupisteet.style.color = "white";
    canvask.style.background = "grey";
    aloitus.style.display = "none";
    pisteetpiiloon.style.display = "none";
    loppuruutu.style.display = "block";
    loppuruutu2.style.display = "block";

    setTimeout(function() {
      location.reload("index.html");
    }, 3000); 
  }
  

  player.x += player.dx;
  player.y += player.dy;
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
  if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;
}

function update() {
  clear();

  if(!alku){
    const aloitus = document.getElementById("alkuruutu");
    aloitus.style.display = "block";

    document.addEventListener("keydown", aloita)
  } else{
    const aloitus = document.getElementById("alkuruutu");
    aloitus.style.display = "none";

    const piste = document.getElementById("pistemaara");
    piste.style.display = "block";
  
    drawPlayer();
    drawBall();
    newPos();
    pisteytys()
  }

  requestAnimationFrame(update);
}

function aloita(event){
  event.preventDefault();
  if(!peliohi){
  document.removeEventListener("keydown", aloita);
  musaSoimaan()

  alku = true;

  update();

  const piste = document.getElementById("pistemaara");
  piste.style.display = "block";
  }
}

function moveUp() {
  if(!peliohi){
  player.dy = -player.speed;
  }
}

function moveDown() {
  if(!peliohi){
  player.dy = player.speed;
}
}

function moveRight() {
  if(!peliohi){
  player.dx = player.speed;
  }
}

function moveLeft() {
  if(!peliohi){
  player.dx = -player.speed;
  }
}

function stopMoving() {
  if(!peliohi){
  player.dx = 0;
  player.dy = 0;
  }
}

document.addEventListener("keydown", (e) => {
  if(!peliohi){
  keys[e.key] = true; 
  handleKeys();
  }
});

document.addEventListener("keyup", (e) => {
  if(!peliohi){
  delete keys[e.key]; 
  handleKeys();
  }
});

function pisteytys(){
  if(!peliohi && !pisteetohi){
  let pistemaara = document.getElementById("pisteet");
  pistemaara.textContent = parseInt(pistemaara.textContent) + 1;

  if (parseInt(pistemaara.textContent) === pointWall) {
    pointWall += 1000; // pitää kirjaa siitä millon pistemäärä mennyt 500, jolloin pallon liikkuminen nopeutuu

    // pallon suunnan vaihtaminen kun nopeus vaihtuu
    // Math.sign() kertoo onko negatiivinen -1 nolla 0 tai positiivinen 1
    console.log(`sign [${Math.sign(ball.dx)} ${ball.dx}] [${Math.sign(ball.dy)} ${ball.dy}]`)
    if (Math.sign(ball.dx) === 1 || Math.sign(ball.dx) === 0) {ball.dx += 1}
    if (Math.sign(ball.dx) === -1) {ball.dx -= 1}
    if (Math.sign(ball.dy) === 1 || Math.sign(ball.dy) === 0) {ball.dy += 1}
    if (Math.sign(ball.dy) === -1) {ball.dy -= 1} 
  }
  pisteetohi = false;
}
}
function handleKeys() {
  stopMoving(); 
  if (keys["ArrowRight"]) {
    moveRight();
  } else if (keys["ArrowLeft"]) {
    moveLeft();
  }
  if (keys["ArrowUp"]) {
    moveUp();
  } else if (keys["ArrowDown"]) {
    moveDown();
  }
}

update();
