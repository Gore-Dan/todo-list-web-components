let todoItemTemplate = document.createElement('template')
todoItemTemplate.innerHTML = `
    <style>
        li label{
            font-size: 18pt;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .checked {
            text-decoration: line-through;
        }
        .myButton {
            background-color: Transparent;
            background-repeat:no-repeat;
            border: none;
            cursor:pointer;
            overflow: hidden;
            outline:none;
            font-size: 18pt;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        .listItem {
            margin-bottom: 5px;
            padding: 0 0 8px 0;
            border-bottom: solid 1px #f2f1f1;
        }
    </style>
    <li class="listItem">
        <input type="checkbox" checked="checked">
        <label></label>
        <button class="deleted">Delete</button>
    </li>
`

class ToDoItem extends HTMLElement {
    constructor() {
        super()

        let shadowRoot = this.attachShadow({ 'mode': 'open'})
        let temp = document.createElement('div')
        temp.innerHTML = todoItemTemplate.innerHTML
        shadowRoot.appendChild(temp)

        this._completed = this.completed
        this._index = this._index
        this._text = ''
    }

    connectedCallback() {
        this.item = this.shadowRoot.querySelector('.listItem')
        this.deleteButton = this.shadowRoot.querySelector('.deleted')
        this.text = this.shadowRoot.querySelector('label')
        this.checkbox = this.shadowRoot.querySelector('input')

        this.deleteButton.addEventListener('click', (event) => {
            event.preventDefault()
            this.dispatchEvent(new CustomEvent('onDelete', { detail: this.index}))
        })

        this.checkbox.addEventListener('click', (event) => {
            event.preventDefault()
            this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index}))
        })
        this.render()
    }

    disconnectedCallback() { }
    static get observedAttributes() {
        return ['text'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this._text = newValue;
    }
    set index(value) {
        this._index = value;
    }
    get index() {
        return this._index;
    }
    set completed(value) {
        this._completed = Boolean(value); // data-completed
        
    }
    get completed() {
        return this.hasAttribute('completed');
    }
    render() {
        if (!this.item) return;
        this.text.textContent = this._text;
        if (this._completed) {
            this.item.classList.add('checked');
            this.checkbox.setAttribute('checked', '');
        } else {
            this.item.classList.remove('checked');
            this.checkbox.removeAttribute('checked');
        }

    }
}

window.customElements.define('todo-item', ToDoItem);