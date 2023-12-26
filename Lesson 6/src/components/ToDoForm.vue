<template>
    <form class="create_wrap">
        <input ref="inputRef" v-model="creatingToDo.name" class="create_input" type="text"
            placeholder="Введите имя задачи..." />
        <select v-model="creatingToDo.priority" class="create_select">
            <option value="normal">Обычная</option>
            <option value="important">Важная</option>
        </select>
        <button @click.prevent="createTodo">Завести задачу</button>
    </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IToDoItem } from '../interfaces/ITodoItem';

const inputRef = ref<HTMLInputElement | null>(null);

const creatingToDo = ref({
    name: "",
    priority: "normal",
});


const createTodo = () => {
    const todo = {
        id: Date.now(),
        status: false,
        name: creatingToDo.value.name,
        isEditing: false,
        priority: creatingToDo.value.priority,
    };
    if (!todo.name) {
        emit('notification', 'Введите имя задачи!', 'red')
    } else {
        emit('createTodo', todo)
        emit('notification', 'Новая задача успешно добавлена', '#6066FF')
        creatingToDo.value.name = "";
    };

    if (inputRef.value) {
        inputRef.value.focus();
    }
};

const emit = defineEmits<{
    (emit: "createTodo", todo: IToDoItem): void;
    (emit: "notification", message: string, bgColor: string): void;
}>();

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.focus();
    }
});
</script>
<style  lang="scss" scoped>
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
        color: rgb(179, 179, 179);
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
    }

    .create_select:focus {
        border-radius: 20px 20px 0 0;
    }

    .create_button {
        padding: 10px 15px;
    }
}
</style>