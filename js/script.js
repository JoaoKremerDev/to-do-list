//Seleçõoes de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const tarefasFeitas = document.querySelector('select')
const search = document.querySelector('#search')
const searchInput = document.querySelector('#search-input')
const searchInputValue = searchInput.value
let tarefas = []
let tarefasFiltradas;
const done = 'done'
const all = 'all'
const afazer = 'todo'
let oldInputValue;

//Funções
const savetodo = (text) =>{
    
    const todo = document.createElement('div')  
    todo.classList.add('todo')
    const todoTitle  = document.createElement('h3')
    todoTitle.innerText = text
    todo.appendChild(todoTitle)
    
    const donebtn = document.createElement('button')
    donebtn.classList.add("finish-todo")
    donebtn.innerHTML = `<i class="fa-solid fa-check"></i>`
    todo.appendChild(donebtn)
    
    const editBtn = document.createElement('button')
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`
    todo.appendChild(editBtn)
    
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    todo.appendChild(deleteBtn)
    
    todoList.appendChild(todo)
    todoInput.value = ""
    todoInput.focus()
    
    tarefas.push(todo)
    console.log(tarefas)
    
}


todoForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputValue = todoInput.value
    if(inputValue){
        savetodo(inputValue)
    }
})


function toggleForms(){
    editForm.classList.toggle('hide')
    todoForm.classList.toggle("hide")
    todoList.classList.toggle('hide')
}

function updateTodo(text){
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector('h3')
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
}

//Eventos
document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest('div')
    let todoTitle;
    
    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerText;
    }
    
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
    }
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove()
    }
    if(targetEl.classList.contains('edit-todo')){
        toggleForms()
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms()
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const editInputValue = editInput.value
    
    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms()
})


tarefasFeitas.addEventListener('change', function () {
    if (this.value == all) {
        tarefas.forEach((item) => {
            if(item.classList.contains('todo')){
                item.classList.remove('hide')
            }   
        })
    }
})

tarefasFeitas.addEventListener('change', function () {
    if (this.value == done) {
         tarefas.forEach((item) => {
            if(item.classList.contains('done') === false){
                item.classList.add('hide')
            }
            if(item.classList.contains('done')){
                item.classList.remove('hide')
            }
        })
    }
   })

tarefasFeitas.addEventListener('change', function () {
    if (this.value == afazer) {
        tarefas.forEach((item) => {
            if(item.classList.contains('done') === false){
                item.classList.remove('hide')
            }
            if(item.classList.contains('done')){
                item.classList.add('hide')
            }
        })
    }
   })

   



   search.addEventListener('submit', (e) =>{
    e.preventDefault()
    const todo = document.querySelectorAll('.todo')
    const searchTitle = searchInput.value
 
    todo.forEach((item) =>{
        const title = item.querySelector('h3').innerText
        if(searchTitle.includes(title) === true){
            item.classList.remove('hide')
            item.classList.add('green')
        }
        if(searchTitle.includes(title) === false){
            item.classList.add('hide')
        }

    })
    searchInput.value = ""
    searchInput.focus()
})
