let todoListTemplate = document.createElement('template')
todoListTemplate.innerHTML = `
    <style>
    :root {
        align-content: center;
    }
    .container {
        width: 60%;
        position: relative;
        padding: 0 0 15px 0;
        border-radius: 25px;
        box-shadow: 5px 5px 5px #888888;
        background: #ffffff;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        ul {
            list-style-type: none;
        }
        
    </style>
    <div class ="container">
        <h1>To Do List</h1>
        <todo-input></todo-input>
        <ul id="list-style"></ul>
    </div>
`

class ToDoList extends HTMLElement {
    constructor() {
        super()

        let shadowRoot = this.attachShadow({ 'mode': 'open'})
        let temp = document.createElement('div')
        temp.innerHTML = todoListTemplate.innerHTML
        shadowRoot.appendChild(temp)

        this.todos = []

        this.todos = JSON.parse(localStorage.getItem('todos'))
        
    }

    connectedCallback() {
        this.input = this.shadowRoot.querySelector('todo-input')
        this.list = this.shadowRoot.querySelector('#list-style')
        this.input.addEventListener('onSubmit', this.addElement.bind(this));
        this.render()
    }


    disconnectedCallback() {

    }

    addElement(todoElement) {
        let newToDo = {id: this.todos.length + 1, text: todoElement.detail.trim(), completed: false}

        this.todos.push(newToDo)
        this.saveTodos()
        this.render()
    }

    deleteElement(todoDeleted) {
        let element = this.todos[todoDeleted.detail]

        this.todos = this.todos.filter(item => item !== element)
        this.render()
    }

    toggleElement(todoElement){
        let item = this.todos[todoElement.detail]

        this.todos[todoElement.detail] = Object.assign({}, item, {
            completed: !item.completed
        })
        this.render()
    }

    saveTodos(){
        let parsed = JSON.stringify(this.todos)
        localStorage.setItem('todos', parsed)
    }

    render() {
        if(!this.list) return

        this.list.innerHTML = ''
        this.todos.forEach((item,index) => {
            let $item = document.createElement('todo-item');
            $item.setAttribute('text', item.text);
            $item.completed = item.completed
            $item.index = index
            $item.addEventListener('onDelete', this.deleteElement.bind(this));
            $item.addEventListener('onToggle', this.toggleElement.bind(this));
            this.list.appendChild($item);
        })
    }
}

window.customElements.define('todo-list', ToDoList);