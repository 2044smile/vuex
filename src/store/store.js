import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (
          localStorage.key(i) !== "loglevel:webpack-dev-server" &&
          localStorage.key(i) !== ""
        ) {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch()
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems
    }
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj) 
    },
    removeOneItem(state, payload){
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1); // TODO: 현재 제대로 동작하지않음
    },
    toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed

      localStorage.removeItem(payload.item);
      localStorage.setItem(payload.item, JSON.stringify(payload));
    },
    clearAllItem(state) {
      localStorage.clear();
      state.todoItems = [];
    }
  }
});
