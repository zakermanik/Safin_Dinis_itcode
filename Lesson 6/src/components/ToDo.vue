<template>
    <div class="todo_container">
        <div class="todo_wrap">
            <div class="title_wrap">
                <p class="title">Список дел</p>
            </div>
            <TodoForm />
            
            <ToDoList :todoList="filteredTodoList" />
        </div>
    </div>
    <div v-if="notification" class="notification">{{ notification }}</div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { IToDoItem } from '../interfaces/ITodoItem'
import TodoForm from '../components/ToDoForm.vue'
import ToDoList from '../components/ToDoList.vue'




const notification = ref<string | null>(null);

const showNotification = (message: string) => {
    notification.value = message;
    setTimeout(() => {
        notification.value = null;
    }, 3000);
};


const filter = ref('all');
const filteredTodoList = computed(() => {
    if (filter.value === 'important') {
        return todoList.value.filter(item => item.priority === 'important');
    }
    return todoList.value;
});
const handleFilter = (type: string) => {
    filter.value = type;
};

const handleSendToDo = (todoData: { name: string; priority: string }) => {
    todoList.value.push({ status: false, ...creatingToDo.value, isEditing: false });
    creatingToDo.value = { name: "", priority: "normal" };
    showNotification('Задача успешно создана!');

    console.log('Creating ToDo:', todoData);
};




const todoList = ref<IToDoItem[]>([
    {
        status: false,
        name: "Сделать домашку",
        isEditing: false,
        priority: "normal"
    },
    {
        status: false,
        name: "Пойти гулять",
        isEditing: false,
        priority: "normal"
    },
    {
        status: false,
        name: "Дождаться GTA VI",
        isEditing: false,
        priority: "important"
    },
]);
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

        .create_wrap {
            display: flex;
            align-items: center;
            width: 100%;
            gap: 10px;

            .create_input {
                width: 50%;
                padding: 10px 15px;
                border: 2px solid #6066FF;
                border-radius: 20px;
            }

            .create_input::placeholder {
                font-weight: 500;
                font-size: 15px;
            }


            .create_select {
                padding: 10px 15px;
                border: 2px solid #252EFF;
                border-radius: 20px;
                color: #252EFF;
                transition: all .1s ease;
            }

            .create_select:hover {
                color: #252EFF;
                background-color: white;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
                font-weight: 700;
            }

            .create_select:focus {
                border-radius: 20px 20px 0 0;
            }

            .create_button {
                padding: 10px 15px;
            }
        }


        .element_buttons {
            display: flex;
            align-items: center;
            gap: 10px;

            button {
                background-color: #6066FF;
                padding: 5px 10px;
                font-size: 12px;
            }

            button:hover {
                background-color: white;
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