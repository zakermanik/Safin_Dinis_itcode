<template>
    <div class="filter_wrap">
        <button @click="handleFilter('all')">Все задачи</button>
        <button @click="handleFilter('important')">Важные задачи</button>
    </div>
    <div class="task_list_wrap">
    <ToDoListItem 
    :todoList="todoList"
    v-for="(todoItem, index) in todoList" 
    :key="index" 
    class="todo_list_element" />
    
        
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { IToDoItem } from '../interfaces/ITodoItem';
import ToDoListItem from './ToDoListItem.vue';
interface Props {
    todoList: IToDoItem[]
}
const { todoList } = defineProps<Props>();


</script>
<style></style>=""