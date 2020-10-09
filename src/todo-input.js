let todoInputTemplate = document.createElement('template')
todoInputTemplate.innerHTML = `
    <style>
        form input{
            font-size: 18pt;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .forDiv {
            margin-bottom: 5px;
            padding: 0 0 8px 0;
            border-bottom: solid 1px #f2f1f1;
        }
    </style>
    <div class="forDiv">
        <form id="todo-form">
            <input id="new-todo" type="text" placeholder="Adauga un task">
        </form>
    </div>
`

class ToDoInput extends HTMLElement {
    constructor() {
        super()

        let shadowRoot = this.attachShadow({ 'mode': 'open'})
        let temp = document.createElement('div')
        temp.innerHTML = todoInputTemplate.innerHTML
        shadowRoot.appendChild(temp)
    }

    connectedCallback(){
        this.form = this.shadowRoot.querySelector('#todo-form')
        this.input = this.shadowRoot.querySelector('input')
    
        this.form.addEventListener("submit", (event) =>{
            event.preventDefault()
            this.dispatchEvent(new CustomEvent('onSubmit', { detail: this.input.value }));
            this.input.value = ''
        })
    }

    disconnectedCallback(){
        console.log('task-ul a fost sters')
    }
}

window.customElements.define('todo-input', ToDoInput);