function getAllItems(tableName: string) {
  const entities = JSON.parse(localStorage.getItem(tableName) as string) || [];
  return entities;
}

function deleteItemById(tableName: string, id: number) {
  try {
    const entities =
      JSON.parse(localStorage.getItem(tableName) as string) || [];

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
  } catch (error) {
    return false;
  }
}

interface Todo {
  id: number;
  context: string;
  status: boolean;
}
const todo: Todo[] = [];
if (!JSON.parse(localStorage.getItem("todoList") as string)) {
  localStorage.setItem("todoList", JSON.stringify(todo));
}
class TodoList implements Todo {
  id: number;
  context: string;
  status: boolean;

  constructor(id: number, context: string, status: boolean) {
    this.id = id;
    this.context = context;
    this.status = status;
  }
}

function onAddJob(): void {
  const jobList: TodoList[] = getAllItems("todoList");
  let id: number = jobList.length > 0 ? jobList[jobList.length - 1].id + 1 : 1;
  let jobContext: HTMLInputElement = document.getElementById(
    "jobInput"
  ) as HTMLInputElement;
  let jobValue: string = jobContext.value;
  let newTodoList: TodoList = new TodoList(id, jobValue, false);
  jobList.push(newTodoList);
  localStorage.setItem("todoList", JSON.stringify(jobList));
  jobContext.value = "";
  window.location.reload();
}

function renderJob(): void {
  let jobList: TodoList[] = getAllItems("todoList");
  let displaynone: HTMLElement = document.getElementById(
    "noJob"
  ) as HTMLElement;
  let showTotalJob: HTMLElement = document.getElementById(
    "checkingJob"
  ) as HTMLElement;
  let renderTodo: HTMLElement = document.getElementById(
    "todoList"
  ) as HTMLElement;
  let showTotal: HTMLElement = document.getElementById(
    "checkingJob"
  ) as HTMLElement;
  let doneJob: HTMLElement = document.getElementById("doneJob") as HTMLElement;
  if (jobList.length != 0) {
    displaynone.style.display = "none";
    showTotalJob.style.display = "block";
    doneJob.style.display = "none";
    let count: number = 0;
    renderTodo.innerHTML = ``;
    jobList.forEach((item: TodoList) => {
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
      } else {
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
  } else {
    displaynone.style.display = "block";
    showTotalJob.style.display = "none";
    renderTodo.innerHTML = ``;
  }
}
function onDeleteJob(id: number): void {
  let popUp = "Are you sure you want to delete this?";
  if (confirm(popUp)) {
    deleteItemById("todoList", id);
    renderJob();
  }
}
function onEdit(id: number): void {
  let showEdit: HTMLElement = document.getElementById(
    "popUpForEdit"
  ) as HTMLElement;
  showEdit.style.display = "block";
  let editModal: HTMLElement = document.getElementById(
    "popUpForEdit"
  ) as HTMLElement;
  const jobData = getAllItems("todoList");
  let jobAfterFind = jobData.find((item: TodoList) => item.id == id);
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
function onCancelBtn(): void {
  let showEdit: HTMLElement = document.getElementById(
    "popUpForEdit"
  ) as HTMLElement;
  showEdit.style.display = "none";
}

function okBtn(id: number): void {
  const jobData: TodoList[] = getAllItems("todoList");
  const newJob: HTMLInputElement = document.getElementById(
    "jobEditValue"
  ) as HTMLInputElement;
  let jobAfterEdit = newJob.value;
  let indexOfJob: number = jobData.findIndex((item: TodoList) => item.id == id);
  jobData[indexOfJob].context = jobAfterEdit;
  localStorage.setItem("todoList", JSON.stringify(jobData));
  onCancelBtn();
  renderJob();
}

function onChangeStatus(id: number): void {
  const jobData: TodoList[] = getAllItems("todoList");
  let indexOfJob: number = jobData.findIndex((item: TodoList) => item.id == id);
  if (jobData[indexOfJob].status == true) {
    jobData[indexOfJob].status = false;
  } else {
    jobData[indexOfJob].status = true;
  }
  localStorage.setItem("todoList", JSON.stringify(jobData));
  renderJob();
}
