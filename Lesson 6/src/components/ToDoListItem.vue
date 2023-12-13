<template>
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
        <button @click.prevent="emit('delete', todoItem)">Удалить</button>
    </div>
    <div v-else class="element_buttons">
        <button @click.prevent="handleSaveEdited(todoItem)">
            Сохранить
        </button>
        <button @click.prevent="handleStopEdit(todoItem)">Отменить</button>
    </div>
</template>
<script setup lang="ts">
import { IToDoItem } from '../interfaces/ITodoItem';

interface Props {
    todoList: IToDoItem[];
}

const { todoList } = defineProps<Props>();

const emit = defineEmits<{
    (emit: "delete", todo: IToDoItem): void;
    (emit: "edit", todo: IToDoItem): void;
    (emit: "save", todo: IToDoItem): void;
    (emit: "stop", todo: IToDoItem): void;
}>();
</script>
<style></style>=""