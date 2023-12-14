<template>
    <div class="todo_container">
        <div class="todo_wrap">
            <div class="title_wrap">
                <p class="title">Список дел</p>
            </div>
            <TodoForm @createTodo="handleCreateToDo" @notification="showNotification" />
            <div class="filter_wrap">
                <button @click="handleFilter('all')">Все задачи</button>
                <button @click="handleFilter('normal')">Обычные задачи</button>
                <button @click="handleFilter('important')">Важные задачи</button>
            </div>
            <ToDoList :todoList="filteredTodoList" @notification="showNotification" />
        </div>
    </div>
    <div v-if="notification" class="notification" :style="{ backgroundColor: notification.bgColor }">{{ notification.message }}</div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { IToDoItem } from '../interfaces/ITodoItem'
import TodoForm from '../components/ToDoForm.vue'
import ToDoList from '../components/ToDoList.vue'

const todoList = ref<IToDoItem[]>([
    {
        id: 0,
        status: false,
        name: "Сделать домашку",
        isEditing: false,
        priority: "normal"
    },
    {
        id: 1,
        status: false,
        name: "Пойти гулять",
        isEditing: false,
        priority: "normal"
    },
    {
        id: 2,
        status: false,
        name: "Дождаться GTA VI",
        isEditing: false,
        priority: "important"
    },
]);


const notification = ref<{ message: string; bgColor: string } | null>(null);

const showNotification = (message: string, bgColor: string) => {
    notification.value = { message, bgColor };
    setTimeout(() => {
        notification.value = null;
    }, 3000);
};


const filter = ref('all');
const filteredTodoList = computed(() => {
    if (filter.value === 'important') {
        return todoList.value.filter(item => item.priority === 'important');
    } else if (filter.value === 'normal') {
        return todoList.value.filter(item => item.priority === 'normal');
    }
    return todoList.value;
});
const handleFilter = (type: string) => {
    filter.value = type;
};


const handleCreateToDo = (creatingTodo: IToDoItem) => {
    todoList.value.push(creatingTodo);
};


</script>
  
<style lang="scss" scoped>
.todo_container {
    display: flex;
    align-items: center;
    justify-content: center;

    .todo_wrap {
        display: flex;
        flex-direction: column;
        gap: 10px;

        min-width: 700px;
        min-height: 500px;
        align-items: flex-start;
        border-radius: 10px;
        padding: 20px;
        background-color: white;
        color: black;

        .title {
            color: black;
            font-size: 24px;
            font-weight: 700;
        }

        .filter_wrap {
            display: flex;
            gap: 5px;

            button {
                padding: 5px 10px;
                font-size: 14px;
            }
        }

    }
}


.notification {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
}

.strikethrough {
    text-decoration: line-through;
}
</style>