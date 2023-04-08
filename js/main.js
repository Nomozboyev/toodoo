let elForm = elSelector(`.jsForm`);
let elInput = elSelector(`.jsInput`, elForm);
let allJobs = elSelector(`.all_jobs_js`);
let elTodoTemplate = elSelector(`.todoTemplate`).content;
let data = JSON.parse(localStorage.getItem(`allToDo`));
let elCount = elSelector(`.count`);



let allToDo = data ? data : [];

let onDelete = (evt) => {
  let arr = [];
  allToDo.forEach((todo) => {
    if (todo.id !== evt.target.dataset.id - 0) {
      arr.push(todo);
    }
  });
  allToDo = arr;
  onRender(arr);
  localStorage.setItem(`allToDo `, JSON.stringify(arr));
};
let onEdit = (evt) => {
  allToDo.forEach((todo) => {
    if (todo.id == evt.target.dataset.id - 0) {
      let editedText = prompt(`Edit todo`, todo.text);
      todo.text = editedText;
    }
  });
  onRender(allToDo);
  localStorage.setItem(`allToDo `, JSON.stringify(allToDo));
};

let onRender = (arr) => {
  allJobs.innerHTML = null;
  elCount.textContent = arr.length;
  console.log(elTodoTemplate);
  arr.forEach((item) => {
    let elTodo = elTodoTemplate.cloneNode(true);

    elTodo.querySelector(`.todoText`).textContent = item.text;


    let btnE = elTodo.querySelector(`.btnEdit`);
    btnE.dataset.id = item.id;
    btnE.addEventListener(`click`, onEdit);

    let btnD = elTodo.querySelector(`.btnDelete`);
    btnD.dataset.id = item.id;
    btnD.addEventListener(`click`, onDelete);

    allJobs.appendChild(elTodo);
  });
};



let onSubmit = (evt) => {
  evt.preventDefault();
  let inputValue = elInput.value.trim();

  if (!inputValue) {
    alert(`Enter the task first, then do sumbit`);
  }
  let newTodo = {
    id: allToDo.at(0) ? allToDo.at(0)?.id + 1 : 1,
    text: inputValue,
    isCompleted: false,
  };

  allToDo.unshift(newTodo);
  onRender(allToDo);
  localStorage.setItem(`allToDo`, JSON.stringify(allToDo));

  elInput.value = null;
  elInput.focus();
};

onRender(allToDo);
elForm.addEventListener(`submit`, onSubmit);
