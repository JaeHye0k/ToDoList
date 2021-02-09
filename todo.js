const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList'),
    clear = document.querySelector('.js-clear'),
    errorComment = document.querySelector('.js-errorComment'),
    TODOS_LS = "toDos", 
    UNSHOWING_CN = "unShowing";

let toDos = [];
let todoId = 1;

function deleteAll(event){
    const list = toDoList;
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    toDos = [];
    checks = [];
    todoId = 1;
    checkNum = 0;
    saveToDos();
    saveChecks();
}
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    let idx;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ // filter(): array에 있는 요소 하나하나의 조건식에 대한 값이 true인 것만 반환함
        return toDo.id !== parseInt(li.id);
    });
    idx = checks.indexOf(li.id);
    if(idx !== -1){
        checks.splice(idx, 1);
        checkNum -= 1;
    }
    toDos = cleanToDos;
    saveToDos();
    saveChecks();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify(): object => string
}
function handleSubmit(event){
    event.preventDefault();
    const inputValue = toDoInput.value;
    if(inputValue === ""){ // input 이 공백일 경우
        toDoInput.classList.add("error");
        setTimeout(function() {
            toDoInput.classList.remove("error");
            errorComment.classList.remove("unShowing");
        }, 300);
    } else{
        const loadedLocal = localStorage.getItem(TODOS_LS);
        if(loadedLocal === "[]"){ // localStorage toDos 에 값이 없는 상태에서 추가하는 경우
            paintToDo(inputValue, todoId);
        } else if(loadedLocal === null){ // localStorage에 toDos라는 이름이 없을 경우
            paintToDo(inputValue, todoId);
        } else{ // localStorage toDos 에 값이 있는 상태에서 추가하는 경우
            todoId = toDos[toDos.length -1].id + 1;
            paintToDo(inputValue, todoId);
        }
        
        errorComment.classList.add("unShowing");
        toDoInput.value = "";
    }
} 
function paintToDo(text, todoId){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    paintCheckBox(li, todoId);
    
    span.id = `span${todoId}`;
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = todoId;

    toDoList.appendChild(li);
    const toDosObj = {
        text: text,
        id: todoId
    };
    toDos.push(toDosObj);
    saveToDos();
}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // JSON.parse(): string => object
        parsedToDos.forEach(function(todo){ // forEach(): array에 있는 요소 하나하나에 적용
            paintToDo(todo.text, todo.id);
        });
    }
}
function init(){
    loadToDos();
    loadChecks();
    toDoForm.addEventListener("submit", handleSubmit);
    clear.addEventListener("click", deleteAll);
}
init();