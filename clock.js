const clockTitle = document.querySelector('.js-clock');
const dateTitle = document.querySelector('.js-date');
const dayArray = ['일','월','화','수','목','금','토'];
const inputColor = document.querySelector('.input');

function getTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getUTCMonth()+1;
    const day = date.getDate();
    const dayOfTheWeek = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let fullDate = `${year}년 ${month < 10 ? `0${month}` : month}월 ${day < 10 ? `0${day}` : day}일 ${dayArray[dayOfTheWeek]}요일`;
    let time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    clockTitle.dateTime = time;
    clockTitle.innerText = time;
    dateTitle.innerText = fullDate;
}
function getH(){
    const date = new Date();
    const hours = date.getHours();
    if(hours >= 6 && hours < 7){
        return "dawn";
    } else if(hours >= 7 && hours < 12){
        return "morning";
    } else if(hours >= 12 && hours < 18){
        body.style.color = "black";
        inputColor.style.borderBottom = "1px solid black";
        return "afternoon";
    } else if(hours >= 18 && hours < 19){
        return "sunset";
    } else{
        return "night";
    }
}
function init(){
    getTime();
    setInterval(getTime, 1000);
}
init();