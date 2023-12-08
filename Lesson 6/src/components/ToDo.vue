<template>
    <div class="todo_container">
        <div class="todo_wrap">
            <div class="title_wrap">
                <p class="title">ToDo List</p>
            </div>
            <form class="create_wrap">
                <input v-model="creatingToDo.name" class="create_input" type="text" />
                <select v-model="creatingToDo.priority" class="create_select">
                    <option value="normal">Обычная</option>
                    <option value="important">Важная</option>
                </select>
                <button @click.prevent="handleSendToDo(creatingToDo)">Завести задачу</button>
            </form>
            <div class="filter_wrap">
                <button @click="handleFilter('all')">Все задачи</button>
                <button @click="handleFilter('important')">Важные задачи</button>
            </div>
            <div class="task_list_wrap">
                <div v-for="(todoItem, index) in filteredTodoList" :key="index" class="todo_list_element">
                    <div class="element_content">
                        <input v-model="todoItem.status" type="checkbox" />
                        <p :class="{ 'strikethrough': todoItem.status }" v-if="!todoItem.isEditing">
                            {{ todoItem.name }}
                        </p>
                        <input v-else ref="editingInput" :value="todoItem.name" :index="index" type="text" />
                    </div>
                    <div v-if="!todoItem.isEditing" class="element_buttons">
                        <button @click.prevent="handleEditToDo(todoItem)">
                            Редактировать
                        </button>
                        <button @click.prevent="handleDeleteToDo(todoItem)">Удалить</button>
                    </div>
                    <div v-else class="element_buttons">
                        <button @click.prevent="handleSaveEdited(todoItem)">
                            Сохранить
                        </button>
                        <button @click.prevent="handleStopEdit(todoItem)">Отменить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="notification" class="notification">{{ notification }}</div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';

const creatingToDo = ref({
    name: "",
    priority: "normal",
});

const editingInput = ref();
const filter = ref('all');

const notification = ref<string | null>(null);

const showNotification = (message: string) => {
    notification.value = message;
    setTimeout(() => {
        notification.value = null;
    }, 3000); // Hide the notification after 3 seconds
};

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

const handleDeleteToDo = (todoItem: IToDoItem) => {
    let todoToDeleteIndex = todoList.value.indexOf(todoItem);
    if (todoToDeleteIndex !== -1) {
        todoList.value.splice(todoToDeleteIndex, 1);
        showNotification('Задача успешно удалена!');
    }
};

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

    const foundInput = editingInput.value.find((input: HTMLElement) => {
        // Check if 'index' attribute exists before accessing it
        return input.attributes && 'index' in input.attributes;
    });

    if (foundInput && foundInput.attributes) {
        // Access the 'index' attribute value
        const indexAttribute = foundInput.attributes.getNamedItem('index');
        const indexValue = indexAttribute ? indexAttribute.value : null;

        // Use the index value if available
        if (indexValue !== null) {
            todoList.value[todoToSaveIndex].name = indexValue;
            todoList.value[todoToSaveIndex].isEditing = false;
        }
    }
};

interface IToDoItem {
    status: boolean;
    name: string;
    isEditing: boolean;
    priority: string; // новое свойство для приоритета
}

const todoList = ref<IToDoItem[]>([
    {
        status: false,
        name: "Сделать домашку",
        isEditing: false,
        priority: "normal"
    },
]);
</script>
  
<style lang="scss" scoped>
.todo_container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .todo_wrap {
        width: 500px;
        height: 800px;
        border: 1px black solid;
        padding: 0 20px;
        background-color: #242424;

        .title {
            color: black;
            font-size: 24px;
            font-weight: 700;
        }

        .create_wrap {
            display: flex;
            align-items: center;
            gap: 10px;

            .create_input {
                height: 24px;
            }

            .create_button {
                padding: 4px 8px;
            }
        }

        .task_list_wrap {
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            .todo_list_element {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                background-color: #6d6d6d;
                border-radius: 10px;
                padding: 0 10px;

                .element_content {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    p {
                        margin: 6px 0;
                    }
                }

                .element_buttons {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    button {
                        padding: 3px 6px;
                        font-size: 14px;
                    }
                }
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