const checkedToDos_LS = "checkedToDos",
    CHECK_CN = "checked",
    UNCHECK_CN = "unChecked";

let checks = [];
let checkNum = 0;

function saveChecks(){
    localStorage.setItem(checkedToDos_LS, JSON.stringify(checks));
}
function handleChecks(event){ // paintChecks 함수로 나누기
    const checkbox = event.target;
    const span = document.querySelector(`#span${checkbox.value}`);
    if(checkbox.checked){ // check
        span.classList.add(CHECK_CN);
        span.classList.remove(UNCHECK_CN);
        checks[checkNum] = checkbox.value;
        checkNum += 1;
    } else{ // uncheck
        span.classList.add(UNCHECK_CN);
        span.classList.remove(CHECK_CN);
        const index = checks.indexOf(checkbox.value);
        checks.splice(index, 1);
        checkNum -= 1;
    }
    saveChecks();
    finishToDos();
}
function paintCheckBox(li, newId){
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.id = `checkbox${newId}`;
    checkBox.value = newId;
    checkBox.addEventListener("click", handleChecks);
    li.appendChild(checkBox);
}
function loadChecks(){
    const loadedChecks = localStorage.getItem(checkedToDos_LS);
    let checkedSpan;
    let checkedBox;
    if(loadedChecks !== null){ // 하나 이상이라도 체크 되어있을때
        const parsedChecks = JSON.parse(loadedChecks); // JSON.parse(): string => object
        parsedChecks.forEach(function(value){
            checkedBox = document.querySelector(`#checkbox${value}`);
            checkedBox.checked = true;
            checkedSpan = document.querySelector(`#span${value}`);
            checkedSpan.classList.add(CHECK_CN);
            checks[checkNum] = value;
            checkNum++;
        });
    }  
}