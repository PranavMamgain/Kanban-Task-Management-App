// variable declaration and main()

const status1 = "Todo-list";
const status2 = "Doing-list";
const status3 = "Done-list";

// for adding subtask
document.getElementById("addSubTask").addEventListener("click", ()=>
{

  let subList = document.getElementById("subtaskList");
  const newListTask = document.createElement("li");
  newListTask.innerHTML = `<input type="text" name="subtasks" class="subtasks" ><span class="close-subTask">&times;</span>`;
  subList.appendChild(newListTask);
});

// for removing li element with input and span tag
document.getElementById("subtaskList").addEventListener("click", (event)=>{
  if(event.target.classList.contains("close-subTask")) {
    let listItem = event.target.parentElement;
    listItem.remove();
  }
});

// list popup with title, description and subtasks





// functions declaration
window.onload = function () {
  arrayCheck();

  listCounter(status1, "todoCount");
  listCounter(status2, "doingCount");
  listCounter(status3, "doneCount");
};

function arrayCheck(){
  let arrayToDo = JSON.parse(localStorage.getItem("todo"));
  let arrayDoing = JSON.parse(localStorage.getItem("doing"));
  let arrayDone = JSON.parse(localStorage.getItem("done"));

  let updateArrayToDo = arrayToDo ? arrayToDo : [];
  let updateArrayDoing = arrayDoing ? arrayDoing : [];
  let updateArrayDone = arrayDone ? arrayDone : [];

  if (updateArrayToDo.length > 0) {
    updateTaskList(updateArrayToDo, status1);
    if (updateArrayDoing.length > 0) {
      updateTaskList(updateArrayDoing, status2);
      if (updateArrayDone.length > 0) {
        updateTaskList(updateArrayDone, status3);
      }
    }
  } else if (updateArrayDoing.length > 0) {
    updateTaskList(updateArrayDoing, status2);
    if (updateArrayDone.length > 0) {
      updateTaskList(updateArrayDone, status3);
    }
  } else {
    if (updateArrayDone.length > 0) {
      updateTaskList(updateArrayDone, status3);
    }
  }
}

function openNav() {
  document.getElementById("show-sidebar").style.display = "flex";
  document.getElementById("nav").style.marginLeft = "15rem";
  document.getElementById("innerContainer").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("show-sidebar").style.display = "none";
  document.getElementById("nav").style.marginLeft = "0rem";
  document.getElementById("innerContainer").style.marginLeft = "0px";
}

function showPopup() {
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function storeData() {

  let titleTask = document.getElementById("title");
  let subTaskArray = [];
  let subTask = document.getElementsByClassName("subtasks");
  // let subTaskArray = Array.from(subTask, input => input.value);

  for(var a = 0; a < subTask.length; a++ ){
    subTaskArray.push(subTask[a].value);
  }


  const newTasks = {
    title: titleTask.value,
    subtask: subTaskArray,
  };

  let tempToDo = JSON.parse(localStorage.getItem("todo"));
  let tempDoing = JSON.parse(localStorage.getItem("doing"));
  let tempDone = JSON.parse(localStorage.getItem("done"));

  const statusTask = document.getElementById("status").value;

  let finalToDo = tempToDo ? tempToDo : [];
  let finalDoing = tempDoing ? tempDoing : [];
  let finalDone = tempDone ? tempDone : [];

  switch (statusTask) {
    case "Todo":
      finalToDo.push(newTasks);
      localStorage.setItem("todo", JSON.stringify(finalToDo));
      break;

    case "Doing":
      finalDoing.push(newTasks);
      localStorage.setItem("doing", JSON.stringify(finalDoing));
      break;

    case "Done":
      finalDone.push(newTasks);
      localStorage.setItem("done", JSON.stringify(finalDone));
      break;
    default:
      console.log("No such option available");
  }
}

function updateTaskList(arrayTask, status) {
  const todoList = document.getElementById(status);
  todoList.innerHTML = "";
  arrayTask.forEach((e) => {
    var timestamp = Math.random();
    const newTaskElement = document.createElement("li");
    newTaskElement.setAttribute("draggable", "true");
    newTaskElement.setAttribute("class", "noDrop");
    newTaskElement.setAttribute("id", timestamp);
    // newTaskElement.setAttribute("ondragstart", "dragStart(event)");
    // newTaskElement.setAttribute("class", "drag");
    newTaskElement.innerHTML = `
        <div class="card">
        <p class="card-text-big"> ${e.title}</p >
        <p class="card-text-small">0 out of ${e.subtask.length}</p>
        </div > `;

    todoList.appendChild(newTaskElement);

    const dragg = document.querySelectorAll(".items li");
    for (let i = 0; i < dragg.length; i++) {
      dragg[i].addEventListener("dragstart", dragStart);
    }
  });
}

function listCounter(listId, counterId) {
  // method - 1 : count number of list items in ul

  let Ul = document.getElementById(listId);
  let a = 0,
    count = 0;
  // Todo List counter
  while (Ul.getElementsByTagName("li")[a++]) {
    count++;
  }
  document.getElementById(counterId).innerHTML = "(" + count + ")";
}

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {

  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  
  event.currentTarget.appendChild(document.getElementById(data));
  listCounter(status1, "todoCount");
  listCounter(status2, "doingCount");
  listCounter(status3, "doneCount");
}

function allowDrop(event) {
  event.preventDefault();
}

function popUpList(){
}
