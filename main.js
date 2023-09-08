const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let alku = false;

let loppu = false;
//Tämä on tosi kun peli hävitään

const player = {
  x: 50,
  y: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  w: 100,
  h: 100
};

const keys = {}; 

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    const image = new Image();
    image.src = 'kuva/kuva.png'; 
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function newPos() {
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
  
  const image = new Image();
  image.src = 'kuva/kuva.png';
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
  drawPlayer();
  newPos();
  pisteytys()
  }
  requestAnimationFrame(update);
  
}

function aloita(event){
  event.preventDefault();
  document.removeEventListener("keydown", aloita);

  alku = true;

  update();

  const piste = document.getElementById("pistemaara");
  piste.style.display = "block";

}

function moveUp() {
  player.dy = -player.speed;
}

function moveDown() {
  player.dy = player.speed;
}

function moveRight() {
  player.dx = player.speed;
}

function moveLeft() {
  player.dx = -player.speed;
}

function stopMoving() {
  player.dx = 0;
  player.dy = 0;
}


document.addEventListener("keydown", (e) => {
  keys[e.key] = true; 
  handleKeys();
});

document.addEventListener("keyup", (e) => {
  delete keys[e.key]; 
  handleKeys();
});

function pisteytys(){
  let pistemaara = document.getElementById("pisteet");
  pistemaara.textContent = parseInt(pistemaara.textContent) + 1;

  if(loppu == true){
    pistemaara == 0;
    
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




