const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let position = 0;
let isJumping = false;
let score = 0;
let level = 25;

function handlekeyup(event) {
  if (event.keyCode === 32) {
    if (!isJumping) jump();
  }
}

function jump() {
  // começou a pular
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        //descendo
        position -= 20;
        dino.style.bottom = position + "px";
        //parando
        if (position <= 0) {
          clearInterval(downInterval);
          //parou de pular
          isJumping = false;
        }
      }, 20);
    } else {
      //subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  cactus.style.left = 1000 + "px";
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      score += 10;
      level -= 1;
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1 class="game-over">Fim de jogo!!<br>Pontuação: ${score}</h1>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, level);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener("keyup", handlekeyup);
