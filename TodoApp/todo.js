let taskArray = [];
let dueTasks;
let isRepeated = false;

function getFormValues(event) {
    event.preventDefault();
    closeModal();
    const task = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    isRepeated = false;

    storeData(task, description, date);
}

function storeData(task, description, date) {
    checkRepetition();
    const newTask = {
        task,
        description,
        date,
    };

    if (isRepeated === false){
        taskArray.push(newTask);
        displayData();
    }else{
        swal({
            title: "Task already exists!",
            text: "tasks with same name not allowed!",
            icon: "warning",
            button: "ok!",
          });
    }
    
}

function checkRepetition(){
    taskArray.forEach((item) => {
        if (task.value == item.task){
            isRepeated = true;
        }
    })
}

function checkDueDate() {

    const rows = document.querySelector('.tasks-table').getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.backgroundColor = "white";
    }


    dueTasks = taskArray.filter((element) => {
        const currentDate = new Date();
        const elementDueDate = new Date(element.date);
        return elementDueDate < currentDate;
    });

    dueTasks.forEach((element, index) => {
        const tr = document.querySelector('.tasks-table').getElementsByTagName('tr')[taskArray.indexOf(element) + 1];
        tr.style.backgroundColor = "red";
    });
}
checkDueDate();

function displayData() {
    const table = document.querySelector('.tasks-table');
    table.innerHTML = '';

    //table headers
    const tr = document.createElement('tr');

    const serialheader = document.createElement('th');
    serialheader.textContent = "SL";
    tr.appendChild(serialheader);

    const taskHeader = document.createElement('th');
    taskHeader.textContent = "Task";
    tr.appendChild(taskHeader);

    const descriptionHeader = document.createElement('th');
    descriptionHeader.textContent = "Description";
    tr.appendChild(descriptionHeader);

    const deadlineHeader = document.createElement('th');
    deadlineHeader.textContent = "Deadline";
    tr.appendChild(deadlineHeader);

    const actionHeader = document.createElement('th');
    actionHeader.textContent = "Action";
    tr.appendChild(actionHeader);

    table.appendChild(tr);

    
    taskArray.forEach((element, index) => {
        const tr = document.createElement('tr');


        // Serial Number 
        const slNoCell = document.createElement('td');
        const slNoInput = document.createElement('input');
        slNoInput.setAttribute("type", "number");
        slNoInput.setAttribute("value", index + 1);
        slNoInput.setAttribute("class", "editableTaskFields");
        slNoInput.classList.add("serialNumber");
        slNoInput.setAttribute("disabled", "");
        slNoCell.appendChild(slNoInput);
        tr.appendChild(slNoCell);

        // Task 
        const taskCell = document.createElement('td');
        const taskInput = document.createElement('input');
        taskInput.setAttribute("type", "text");
        taskInput.setAttribute("value", element.task);
        taskInput.setAttribute("class", "editableTaskFields");
        taskInput.setAttribute("disabled", "");
        taskCell.appendChild(taskInput);
        tr.appendChild(taskCell);

        // Description 
        const descriptionCell = document.createElement('td');
        const descriptionInput = document.createElement('textarea');
        // descriptionInput.setAttribute("type", "text");
        descriptionInput.textContent = element.description;
        descriptionInput.setAttribute("class", "editableTaskFields");
        descriptionInput.setAttribute("disabled", "");
        descriptionCell.appendChild(descriptionInput);
        tr.appendChild(descriptionCell);

        // Date 
        const dateCell = document.createElement('td');
        const dateInput = document.createElement('input');
        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("value", element.date);
        dateInput.setAttribute("class", "editableTaskFields");
        dateInput.setAttribute("disabled", "");
        dateCell.appendChild(dateInput);
        tr.appendChild(dateCell);

        // Action Buttons 
        const actionButtonsCell = document.createElement('td');
        const actionButtonsCellContainer = document.createElement('div');
        actionButtonsCellContainer.setAttribute('class', 'buttons');

        // Edit Button 
        const editTaskButton = document.createElement('button');
        editTaskButton.setAttribute("onclick", `editTasks(${index})`);
        editTaskButton.setAttribute("class", "action-btn btn edit-btn");
        editTaskButton.textContent = "EDIT";
        actionButtonsCellContainer.appendChild(editTaskButton);

        // Completed Button 
        const completedButton = document.createElement('button');
        completedButton.setAttribute("onclick", `markAsCompleted(${index})`);
        completedButton.setAttribute("class", "action-btn complete-btn");
        completedButton.textContent = "COMPLETED";
        completedButton.style.backgroundColor="grey";
        actionButtonsCellContainer.appendChild(completedButton);

        // Remove Button 
        const removeTaskButton = document.createElement('button');
        removeTaskButton.setAttribute("onclick", `removeTask(${index})`);
        removeTaskButton.setAttribute("class", "action-btn btn remove-btn");
        removeTaskButton.textContent = "REMOVE";
        actionButtonsCellContainer.appendChild(removeTaskButton);

        actionButtonsCell.appendChild(actionButtonsCellContainer);
        tr.appendChild(actionButtonsCell);
        table.appendChild(tr);
    });
    checkDueDate();
}

function editTasks(index) {
    const tr = document.querySelector('.tasks-table').getElementsByTagName('tr')[index + 1];
    const inputFields = tr.querySelectorAll('.editableTaskFields');
    const serialNumber = tr.querySelector('.serialNumber');

    inputFields.forEach(input => {
        if(serialNumber !== input ){
            input.disabled = !input.disabled;
        }
    });
    

    const editTaskButton = tr.querySelector('.edit-btn');
    editTaskButton.textContent = editTaskButton.textContent === 'EDIT' ? 'SAVE' : 'EDIT';

    if (editTaskButton.textContent === 'EDIT') {
        const task = inputFields[1].value;
        const description = inputFields[2].value;
        const date = inputFields[3].value;

        taskArray[index].task = task;
        taskArray[index].description = description;
        taskArray[index].date = date;
    }
    checkDueDate();
}

function removeTask(index) {
    const tr = document.querySelector('.tasks-table').getElementsByTagName('tr')[index + 1];
    if (tr) {
        tr.remove();
    }
    taskArray.splice(index, 1);
    displayData();
}

function markAsCompleted(index) {
    const tr = document.querySelector('.tasks-table').getElementsByTagName('tr')[index+1];
    const completeBtn = tr.querySelector('.complete-btn');
    if (completeBtn.style.backgroundColor === 'grey') {
        completeBtn.style.backgroundColor = 'green';
    } else {
        completeBtn.style.backgroundColor = 'grey';
    }
    checkDueDate();
}

function openModal() {
    document.querySelector('.modal').classList.remove('hidden');
}

function closeModal() {
    document.querySelector('.modal').classList.add('hidden');
}

function searchTasks(event){
    event.preventDefault();
    const searchBox = document.getElementById('searchBox').value;
    const elementfound = taskArray.filter(task => task.task.includes(searchBox));
    
    taskArray.forEach((element,index) =>{
        const tr = document.querySelector('.tasks-table').getElementsByTagName('tr')[index + 1];
        tr.style.backgroundColor='white';
        tr.style.border="none";
    })

    if(elementfound.length > 0){
        const index = taskArray.findIndex(task =>  task.task === elementfound[0].task );
        if(index !== -1){
            const tr = document.querySelector('.tasks-table').getElementsByTagName('tr')[index + 1];
            tr.style.border="5px solid red";
            tr.scrollIntoView({behaviour:'smooth',block:'center'});
        }
    }else{
        swal({
            title: "Task not Found!",
            text: "no tasks with this task name is found!",
            icon: "warning",
            button: "ok!",
          });
    }
    checkDueDate();
}
function markAllTasks(){
    taskArray.forEach((element,index) =>{
        const tr = document.querySelector('.tasks-table').getElementsByTagName('tr')[index + 1];
        const completeBtn = tr.querySelector('.complete-btn');
        if (completeBtn.style.backgroundColor === 'grey') {
            completeBtn.style.backgroundColor = 'green';
        } else {
            completeBtn.style.backgroundColor = 'grey';
        }
    })
}

