"use strict";
function getAllItems(tableName) {
    const entities = JSON.parse(localStorage.getItem(tableName)) || [];
    return entities;
}
function deleteItemById(tableName, id) {
    try {
        const entities = JSON.parse(localStorage.getItem(tableName)) || [];
        let delIndex = -1;
        for (let i = 0; i < entities.length; i++) {
            const _entity = entities[i];
            if (_entity.id == id) {
                delIndex = i;
            }
        }
        if (delIndex != -1) {
            entities.splice(delIndex, 1);
            localStorage.setItem(tableName, JSON.stringify(entities));
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
const todo = [];
if (!JSON.parse(localStorage.getItem("todoList"))) {
    localStorage.setItem("todoList", JSON.stringify(todo));
}
class TodoList {
    constructor(id, context, status) {
        this.id = id;
        this.context = context;
        this.status = status;
    }
}
function onAddJob() {
    const jobList = getAllItems("todoList");
    let id = jobList.length > 0 ? jobList[jobList.length - 1].id + 1 : 1;
    let jobContext = document.getElementById("jobInput");
    let jobValue = jobContext.value;
    let newTodoList = new TodoList(id, jobValue, false);
    jobList.push(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(jobList));
    jobContext.value = "";
    window.location.reload();
}
function renderJob() {
    let jobList = getAllItems("todoList");
    let displaynone = document.getElementById("noJob");
    let showTotalJob = document.getElementById("checkingJob");
    let renderTodo = document.getElementById("todoList");
    let showTotal = document.getElementById("checkingJob");
    let doneJob = document.getElementById("doneJob");
    if (jobList.length != 0) {
        displaynone.style.display = "none";
        showTotalJob.style.display = "block";
        doneJob.style.display = "none";
        let count = 0;
        renderTodo.innerHTML = ``;
        jobList.forEach((item) => {
            if (item.status == true) {
                count++;
                renderTodo.innerHTML += `<div id="jobText" style="text-decoration: line-through;">
      <input checked type="checkbox" onclick="onChangeStatus(${item.id})"/>
      <p>${item.context}</p>
      <div class="editBtn">
        <button onclick="onEdit(${item.id})">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button onclick="onDeleteJob(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
  `;
            }
            else {
                renderTodo.innerHTML += `<div id="jobText">
        <input type="checkbox" onclick="onChangeStatus(${item.id})"/>
        <p>${item.context}</p>
        <div class="editBtn">
          <button onclick="onEdit(${item.id})">
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button onclick="onDeleteJob(${item.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    `;
            }
            showTotal.innerHTML = ` <div class="checkingJob">
    <p>
      Công việc đã hoàn thành: <span><strong>${count}/ ${jobList.length}</strong></span>
    </p>
  </div>`;
        });
        if (count == jobList.length) {
            showTotalJob.style.display = "none";
            doneJob.style.display = "block";
        }
    }
    else {
        displaynone.style.display = "block";
        showTotalJob.style.display = "none";
        renderTodo.innerHTML = ``;
    }
}
function onDeleteJob(id) {
    let popUp = "Are you sure you want to delete this?";
    if (confirm(popUp)) {
        deleteItemById("todoList", id);
        renderJob();
    }
}
function onEdit(id) {
    let showEdit = document.getElementById("popUpForEdit");
    showEdit.style.display = "block";
    let editModal = document.getElementById("popUpForEdit");
    const jobData = getAllItems("todoList");
    let jobAfterFind = jobData.find((item) => item.id == id);
    editModal.innerHTML = ``;
    editModal.innerHTML = `<div id="popUpBody">
  <div class="popUpBox">
    <h2>Cập nhật công việc</h2>
    <p>Tên công việc</p>
    <div id="valueNow">
      <input
        type="text"
        id="jobEditValue"
        value="${jobAfterFind.context}"
      />
    </div>
    <div class="popUpBtn">
      <button class="cancelBtn" onclick="onCancelBtn()">Hủy</button>
      <button class="okBtn" onclick="okBtn(${id})">Đồng ý</button>
    </div>
  </div>
</div>`;
}
function onCancelBtn() {
    let showEdit = document.getElementById("popUpForEdit");
    showEdit.style.display = "none";
}
function okBtn(id) {
    const jobData = getAllItems("todoList");
    const newJob = document.getElementById("jobEditValue");
    let jobAfterEdit = newJob.value;
    let indexOfJob = jobData.findIndex((item) => item.id == id);
    jobData[indexOfJob].context = jobAfterEdit;
    localStorage.setItem("todoList", JSON.stringify(jobData));
    onCancelBtn();
    renderJob();
}
function onChangeStatus(id) {
    const jobData = getAllItems("todoList");
    let indexOfJob = jobData.findIndex((item) => item.id == id);
    if (jobData[indexOfJob].status == true) {
        jobData[indexOfJob].status = false;
    }
    else {
        jobData[indexOfJob].status = true;
    }
    localStorage.setItem("todoList", JSON.stringify(jobData));
    renderJob();
}
