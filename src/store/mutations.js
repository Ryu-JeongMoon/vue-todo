export default {
    addOneItem(state, todoItem) {
        const obj = {completed: false, item: todoItem};

        // obj 그냥 넣으면 application 저장소에서 확인할 수가 없음
        // stringify api 를 이용해 string 형태로 넣어야 확인 가능
        // localStorage.setItem(this.newTodoItem, obj);
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    removeTodoItem(state, payload) {
        /** todoItem 자체를 삭제하려고 하니까 keyboard 어쩌구 뜨네 키 값과 todoItem.item 이 동일하게 매핑되어 있어서
         * todoItem.item 삭제해버리면 키 값을 삭제하는 것과 동일한 효과 */
        localStorage.removeItem(payload.todoItem.item);
        state.todoItems.splice(payload.index, 1);
    },
    clearTodoItem(state) {
        localStorage.clear();
        state.todoItems = [];
    },
    toggleOneItem(state, payload) {
        /** props 로 내린 data 를 이벤트로 다시 받아와서 그 데이터를 수정하는 것은 안티 패턴 중 하나
         * index 도 같이 넘겨오니까 컴퍼넌트 자신의 데이터를 직접 수정해야 한당 */
        // todoItem.completed = !todoItem.completed;
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;

        localStorage.removeItem(payload.todoItem.item);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    }
}