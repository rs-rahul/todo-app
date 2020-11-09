import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import * as todoService from "../services/todoService";

import "./todo-list";

class TodoApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: sans-serif;
          height: 100vh;
          width: 100%;
          background-color: #999;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        h1 {
          margin-bottom: 16px;
        }

        form {
          margin-bottom: 32px;
        }

        .todo-app {
          padding: 24px;
          width: 50%;
          margin: auto;
        }

        .todo-form {
          display: flex;
        }

        .todo-form input {
          width: 100%;
          padding: 16px;
        }

        .todo-form button {
          min-width: 100px;
        }
      </style>

      <div class="todo-app">
        <h1>Add Todo</h1>
        <form on-submit="handleFormSubmit" class="todo-form">
          <input type="text" name="text" />
          <button>Add Todo</button>
        </form>

        <todo-list
          todos="[[todos]]"
          is-loading="[[isLoading]]"
          fetch-todos="[[fetchTodos]]"
        ></todo-list>
      </div>
    `;
  }

  static get properties() {
    return {
      todos: {
        type: Array,
        value: [],
      },
      isLoading: {
        type: Boolean,
        value: true,
      },
    };
  }

  constructor() {
    super();

    this.fetchTodos();
  }

  ready() {
    super.ready();

    this.isLoading = false;
  }

  fetchTodos() {
    this.isLoading = true;

    todoService
      .getTodos()
      .then((docs) => {
        this.todos = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
      .then(() => {
        this.isLoading = false;
      });
  }

  addTodo(todo) {
    todoService
      .addTodo({
        ...todo,
        isCompleted: false,
      })
      .then(() => this.fetchTodos());
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const todoForm = event.target;
    const todoText = todoForm.text.value;

    this.addTodo({ text: todoText });

    todoForm.reset();
  }
}

customElements.define("todo-app", TodoApp);
