const body = document.querySelector("body");
const IMG_NUMBER = 3;

function paintImage(imgNumber, time){
    const image = new Image();
    image.src = `./images/${time}/${imgNumber}.jpg`;
    image.classList.add('bgimg');
    body.appendChild(image);
}

function genRandom(n){
    const number = Math.floor(Math.random() * n);
    return number;
}

function init(){
    const randomNumber = genRandom(IMG_NUMBER);
    const time = getH();
    paintImage(randomNumber+1, time);
}
init();
