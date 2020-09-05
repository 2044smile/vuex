<template>
  <div>
    <ul>
      <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
        <font-awesome-icon class="fa-2x checkBtn" icon="check" v-bind:class="{checkBtnCompleted: todoItem.completed}" @click="toggleComplete(todoItem, index)" />
        <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <span class="removeBtn" @click="removeTodo(todoItem, index)">
          <font-awesome-icon class="fa-2x" icon="trash" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      todoItems: []
    };
  },
  methods: {
    removeTodo: function(todoItem, index) {
      console.log(todoItem, index);
      localStorage.removeItem(todoItem); // Key 이름을 입력하면 해당하는 key를 가진 데이터가 삭제
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function(todoItem, index) {
      todoItem.completed = !todoItem.completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
      console.log(index)
    }
  },
  created: function() {
    // 인스턴스가 생성되자마자 생성
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (
          localStorage.key(i) !== "loglevel:webpack-dev-server" &&
          localStorage.key(i) !== ""
        ) {
          JSON.parse(localStorage.getItem(localStorage.key(i)));
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
</style>