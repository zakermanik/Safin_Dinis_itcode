<template>
    <div class="task_list_wrap">
        <ToDoListItem :todoItem="todoItem" v-for="todoItem in todoList" :key="todoItem.id"
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
        emit('notification', 'Задача успешно удалена!', 'red')
    }
};

const editingTodos = ref<IToDoItem[]>([])
const handleEditToDo = (todoItem: IToDoItem) => {
    const copyTodo = JSON.parse(JSON.stringify(todoItem));
    editingTodos.value.push(copyTodo);
    todoItem.isEditing = true;
};

const handleStopEdit = (todoItem: IToDoItem) => {
    let editingTodo = editingTodos.value.find(editingTodo => editingTodo.id === todoItem.id);
    if (editingTodo) {
        todoItem.name = editingTodo.name;
        todoItem.isEditing = false;
        let editingTodoIndex = editingTodos.value.indexOf(editingTodo);
        editingTodos.value.splice(editingTodoIndex, 1);
        emit('notification', 'Редактирование успешно отменено', 'gray')
    }
};

const handleSaveEdited = (todoItem: IToDoItem) => {
    let editingTodo = editingTodos.value.find(editingTodo => editingTodo.id === todoItem.id);
    if (editingTodo) {
        todoItem.isEditing = false;
        let editingTodoIndex = editingTodos.value.indexOf(editingTodo);
        editingTodos.value.splice(editingTodoIndex, 1);
        emit('notification', 'Задача успешно сохранена!', 'green')
    }
};

const emit = defineEmits<{
    (emit: "notification", message: string, bgColor: string): void;
}>();
</script>
<style  lang="scss" scoped>
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
        padding: 5px 10px;

    }

    .completed {
        background-color: rgb(151, 251, 120);
    }

    .todo_list_element:hover {
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .9);
    }
}
</style>