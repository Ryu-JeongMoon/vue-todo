<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems"
              v-on:removeItem="removeTodoItem"
              v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearItem="clearTodoItem"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "@/components/TodoHeader"
import TodoFooter from "@/components/TodoFooter"
import TodoList from "@/components/TodoList"
import TodoInput from "@/components/TodoInput"

export default {
  name: 'App',
  data: function () {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem(todoItem) {
      const obj = {completed: false, item: todoItem};

      // obj 그냥 넣으면 application 저장소에서 확인할 수가 없음
      // stringify api 를 이용해 string 형태로 넣어야 확인 가능
      // localStorage.setItem(this.newTodoItem, obj);
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeTodoItem(todoItem, index) {
      /** todoItem 자체를 삭제하려고 하니까 keyboard 어쩌구 뜨네 키 값과 todoItem.item 이 동일하게 매핑되어 있어서
       * todoItem.item 삭제해버리면 키 값을 삭제하는 것과 동일한 효과 */
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    clearTodoItem() {
      localStorage.clear();
      this.todoItems = [];
    },
    toggleOneItem(todoItem, index) {
      /** props 로 내린 data 를 이벤트로 다시 받아와서 그 데이터를 수정하는 것은 안티 패턴 중 하나
       * index 도 같이 넘겨오니까 컴퍼넌트 자신의 데이터를 직접 수정해야 한당 */
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed;

      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
  created: function () {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 300px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
