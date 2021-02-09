const show = document.querySelector(".showList");

function showList(event){
    let right = document.querySelector(".right");
    if(right.style.display === "none"){
        right.style.display = "block";
    } else{
        right.style.display = "none";
    }
}
function init(){
    show.addEventListener("click",showList);
}
init();