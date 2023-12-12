<template>
    <div class="todo_container">
        <div class="todo_wrap">
            <div class="title_wrap">
                <p class="title">Список дел</p>
            </div>
            <form class="create_wrap">
                <input v-model="creatingToDo.name" class="create_input" type="text" placeholder="Введите имя задачи..."/>
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

                        <div v-if="todoItem.priority == 'important'" class="element_priority">
                            Важно!
                        </div>
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
    }, 3000);
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
    todoList.value[todoToSaveIndex].name = editingInput.value.find(
        (input) => +input.attributes.index.value === todoToSaveIndex
    ).value;
    todoList.value[todoToSaveIndex].isEditing = false;
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

                .element_content {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    p {
                        min-width: 10px;
                        margin: 6px 0;
                    }

                    .element_priority {
                        background-color: rgb(128, 197, 240);
                        padding: 5px 10px;
                        font-size: 12px;
                        border-radius: 20px;
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