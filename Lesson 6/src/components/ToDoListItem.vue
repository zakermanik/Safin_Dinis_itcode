<template>
    <div :class="{ 'completed': todoItem.status }">
        <div class="element_content">
            <input v-model="todoItem.status" type="checkbox" />
            <div v-if="todoItem.priority == 'important'" class="element_priority">
                Важно!
            </div>
            <p :class="{ 'strikethrough': todoItem.status }" v-if="!todoItem.isEditing">
                {{ todoItem.name }}
            </p>
            <input v-else v-model="todoItem.name" type="text" />
        </div>
        <div v-if="!todoItem.isEditing" class="element_buttons">
            <button 
                @click.prevent="emit('edit', todoItem)"
                >Редактировать
            </button>
            <button 
                @click.prevent="emit('delete', todoItem)"
                >Удалить</button>
        </div>
        <div v-else class="element_buttons">
            <button 
                @click.prevent="emit('save', todoItem)"
                >Сохранить
            </button>
            <button 
                @click.prevent="emit('stop', todoItem)"
                >Отменить</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { IToDoItem } from '../interfaces/ITodoItem';
import { toRefs } from 'vue';

interface Props {
    todoItem: IToDoItem;
}

const props = defineProps<Props>();
const { todoItem } = toRefs(props);
;

const emit = defineEmits<{
    (emit: "delete", todo: IToDoItem): void;
    (emit: "edit", todo: IToDoItem): void;
    (emit: "save", todo: IToDoItem): void;
    (emit: "stop", todo: IToDoItem): void;
}>();

</script>
<style lang="scss" scoped>
.element_content {
    display: flex;
    align-items: center;
    gap: 10px;

    p {
        min-width: 10px;
        margin: 6px 0;
    }

    .strikethrough {
        text-decoration: line-through;
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
</style>