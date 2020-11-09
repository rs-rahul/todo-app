import "@polymer/polymer/lib/elements/dom-if.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import * as todoService from "../services/todoService";

class TodoList extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          font-family: sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        h1 {
          margin-bottom: 16px;
        }

        .todo-item {
          background-color: maroon;
          border-radius: 8px;
          margin-bottom: 16px;
          display: flex;
          color: white;
          padding: 8px 16px;
          list-style-type: none;
          justify-content: space-between;
          align-items: center;
        }

        .delete-btn {
          border: 0;
          outline: none;
          background-color: brown;
          color: #fff;
          padding: 4px;
          border-radius: 4px;
          cursor: pointer;
          height: 30px;
          width: 30px;
          vertical-align: center;
        }
      </style>
      <div>
        <template is="dom-if" if="{{isLoading}}">
          ${this.renderLoading}
        </template>

        <h1>Todo List</h1>
        <ul class="todo-list">
          <template is="dom-repeat" items="{{todos}}">
            <li class="todo-item">
              <div class="todo-text">{{item.text}}</div>
              <button
                class="delete-btn"
                on-click="deleteTodo"
                data-id$="[[item.id]]"
                disabled="[[isLoading]]"
              >
                x
              </button>
            </li>
          </template>
        </ul>
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
      fetchTodos: {
        type: Function,
        value: () => {},
      },
    };
  }

  static get renderLoading() {
    return html`<div>Loading...</div>`;
  }

  deleteTodo(event) {
    const id = event.target.dataset.id;
    todoService.deleteTodo(id).then(() => this.fetchTodos());
  }
}

customElements.define("todo-list", TodoList);
