<template>
    <div class="filter_wrap">
        <button @click="handleFilter('all')">Все задачи</button>
        <button @click="handleFilter('important')">Важные задачи</button>
    </div>
    <div class="task_list_wrap">
        <ToDoListItem :todoItem="todoItem" v-for="(todoItem, index) in todoList" :key="index"
            @delete="handleDeleteToDo(todoItem)" @edit="handleEditToDo(todoItem)" @save="handleSaveEdited(todoItem)"
            @stop="handleStopEdit(todoItem)" class="todo_list_element" />
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { IToDoItem } from '../interfaces/ITodoItem';

import ToDoListItem from './ToDoListItem.vue';

interface Props {
    todoList: IToDoItem[]
}
const props = defineProps<Props>();
const { todoList } = toRefs(props);



const handleDeleteToDo = (todoItem: IToDoItem) => {
    let todoToDeleteIndex = todoList.value.indexOf(todoItem);
    if (todoToDeleteIndex !== -1) {
        todoList.value.splice(todoToDeleteIndex, 1);
        emit('notification', 'Задача успешно удалена!')
        // showNotification('Задача успешно удалена!');
    }
};

const editingInput = ref();

const handleEditToDo = (todoItem: IToDoItem) => {
    let todoToEditIndex = todoList.value.indexOf(todoItem);
    todoList.value[todoToEditIndex].isEditing = true;
};

const handleStopEdit = (todoItem: IToDoItem) => {
    let todoEditingIndex = todoList.value.indexOf(todoItem);
    todoList.value[todoEditingIndex].isEditing = false;
};

const handleSaveEdited = (todoItem: IToDoItem) => {
    let todoToSaveIndex = todoList.value.indexOf(todoItem);
    todoList.value[todoToSaveIndex].name = editingInput.value.find(
        (input) => +input.attributes.index.value === todoToSaveIndex
    ).value;
    todoList.value[todoToSaveIndex].isEditing = false;
};

const emit = defineEmits<{
    (emit: "notification", todo: IToDoItem): void;
}>();
</script>
<style  lang="scss" scoped>
.filter_wrap {}

.task_list_wrap {
    margin: 20px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .todo_list_element {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: white;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
        border-radius: 20px;
        padding: 10px 15px;

    }
    .todo_list_element:hover {
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .9);
    }
}
</style>