<template>
  <div>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in this.todoItems" v-bind:key="todoItem.item" class="shadow">
        <i class="checkBtn fas fa-check-circle" v-bind:class="{checkBtnCompleted: todoItem.completed}"
           @click="toggleComplete({todoItem, index})"></i>
        <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <span class="removeBtn" @click="removeTodo({todoItem, index})">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import {mapGetters, mapState, mapMutations} from 'vuex';

export default {
  methods: {
    ...mapMutations({
      removeTodo: 'removeTodoItem',
      toggleComplete: 'toggleOneItem'
    }),
    /** template 에서의 parameter 순서와 다르면 제대로 동작 X */
    // removeTodo: function (todoItem, index) {
    //   this.$store.commit('removeTodoItem', {todoItem, index});
    // },
    // eslint-disable-next-line no-unused-vars
    // toggleComplete: function (todoItem, index) {
    //   this.$store.commit('toggleOneItem', {todoItem, index});
    // }
  },
  computed: {
    ...mapGetters(['storedTodoItems']),
    ...mapState(['todoItems'])
  }
}
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

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
}

/** list item transition effect */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}
</style>