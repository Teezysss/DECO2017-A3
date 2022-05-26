"use strict"

let center = document.getElementById('center');

let showTasks = tasks;
let selectedDate = "";
let selectedStatus = -1;
var page = {
    total: showTasks.length,
    pageSize: 6,
    pageCount: 0,
    currentPage: 0,
}
page.pageCount = Math.ceil(page.total/page.pageSize);
function resetPage(){
    page.total = showTasks.length;
    page.currentPage = 0;
    page.pageCount = Math.ceil(page.total / page.pageSize)
}
let taskList = document.getElementById("taskList");

document.querySelector("#selected-date").onchange= function(e){
    selectedDate = this.options[this.selectedIndex].text;
    if(selectedStatus!=-1){
        showTasks = tasks.filter(e => e.status==selectedStatus);
    }
    
    showTasks = tasks.filter(e => e.dueDate==selectedDate);
    console.log(this.selectedIndex);
    console.log(this.options[this.selectedIndex].text);
    resetPage();
    show();

};
document.querySelector("#selected-status").onchange = function (e) {
    selectedStatus = this.options[this.selectedIndex].value;
    if (selectedDate != "") {
        showTasks = tasks.filter(e => e.dueDate == selectedDate);
    }
    showTasks = tasks.filter(e => e.status==selectedStatus);
    console.log(this.selectedIndex);
    console.log(this.options[this.selectedIndex].text);
    resetPage();
    show();
};
function show() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    // resetPage();
    for (let i = page.currentPage * page.pageSize; i < page.total && i < page.pageSize * (page.currentPage + 1); i++) {
        let task =
            '<ul class="task-item" draggable="true"> \
        <li style = "width:250px;margin-left: -16px; text-align: left;" >\
            <input type="checkbox" name="" id="">\
            <h6 style="font-size: 12px;transform: scale(0.8);">'+ showTasks[i].name + '\
            </h6>\
        </li>\
        <li style="width:150px">'+ showTasks[i].dueDate + '\
        </li>\
        <li style="width:150px"><span class="'+ (showTasks[i].status == 0 ? 'uncompleted'
                : showTasks[i].status == 1 ? 'in-progress' : 'completed') + '">' + (showTasks[i].status == 0 ? 'Uncompleted'
                    : showTasks[i].status == 1 ? 'In Progress' : 'Completed') + '\
        </span></li>\
        <li style="width:150px"><span style="color: black;">'+ showTasks[i].gainGrade + '</span>/' + showTasks[i].totalGrade + '- <span style="color: green;">'
            + Math.round(showTasks[i].gainGrade * 100 / showTasks[i].totalGrade) + '% </span></li>\
        <li style="width:150px"><input type="radio" name="" id=""></li>\
    </ul >';
        // console.log(task);
        taskList.innerHTML += task;
    }
}
show();
let preBtn = document.getElementById("preBtn");
let nextBtn = document.getElementById("nextBtn");
preBtn.onclick = function (e) {
    
    if (page.currentPage == 0) {
        this.disabled = true;
        return;
    }
    console.log("previous page")
    page.currentPage--;
    document.getElementById("nextBtn").disabled = false;
    if(page.currentPage==0)
        this.disabled = true;
    show();

}
nextBtn.onclick = function (e) {
    if (page.currentPage==page.pageCount-1){
        this.disabled = true;
        return;
    }
    console.log("next page")
    page.currentPage++;
    document.getElementById("preBtn").disabled = false;
    if (page.currentPage == page.pageCount - 1)
        this.disabled = true;
    show();
}



console.log(center);


var addTask = document.querySelector("#add-task");
console.log(addTask);
addTask.onclick = function (e) {
    console.log("add task.");
    document.querySelector("#alert").style.display = "block";
}

let addBtn = document.querySelector("#add-btn");
addBtn.onclick = function (e) {
    let dueDate = document.querySelector('#alert input[name="due-date"]').value;
    let name = document.querySelector('#alert input[name="task-name"]').value;
    let sel = document.querySelector('#alert select[name="status"]');
    let status = sel.options[sel.selectedIndex].value;
    let grade = document.querySelector('#alert input[name="grade"]').value;
    let due = new Date(dueDate);
    let task = {
        name: name,
        status: status,
        totalGrade: grade,
        gainGrade: 0,
        dueDate: due,
    };
    console.log(task);
    document.querySelector("#alert").style.display = "none";
}

let playBtn = document.querySelector("#play-button");
let stopBtn = document.querySelector("#stop-button");
var timer = {
    id: 0,
    start: false,
    totalTime: 0
};
playBtn.onclick = function(e){
    
    if(timer.id!=0 && timer.start){
        clearInterval(timer.id);
        console.log("stop")
        timer.start = false;
        return;
    }
    console.log("start timer")
    timer.id = setInterval(function(){
        timer.start = true;
        timer.totalTime ++;
        let second = timer.totalTime;
        let min = 0;
        let hour = 0;
        console.log(second);
        if(second>=60){
            min = Math.floor(second/60);
            second = second % 60;
            console.log(min)
            if(min >= 60){
                hour = Math.floor(min / 60);
                min %= 60; 
            }
        }
        document.querySelector(".time").textContent = `${hour<10 ? '0'+ hour : hour}:${ min<10?'0'+min: min}:${second<10?'0'+second:second}`;
    }, 1000);
}
stopBtn.onclick = function(e){
    if(timer.id!=0){
        clearInterval(timer.id);
        document.querySelector(".time").textContent = "00:00:00";

        timer.id = 0;
        timer.totalTime = 0;
        timer.start = false;
    }
}
// drag event 

let ul = document.querySelectorAll("ul.task-item");


console.log(ul);
let container = null;
for (let i = 0; i < ul.length; i++) {

    ul[i].ondragstart = function () {
        //   console.log(this);
        container = this;
    }
  
    ul[i].ondragover = function (e) {
        e.preventDefault();
    }
 
    ul[i].ondrop = function () {
        console.log("drop");
        if (container != null && container != this) {
            let temp = document.createElement("li");
            // console.log(document.body);
            taskList.replaceChild(temp, this);
            taskList.replaceChild(this, container);
            taskList.replaceChild(container, temp);
        }
    }
}