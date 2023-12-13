<template>
    <form class="create_wrap">
        <input v-model="creatingToDo.name" class="create_input" type="text" placeholder="Введите имя задачи..." />
        <select v-model="creatingToDo.priority" class="create_select">
            <option value="normal">Обычная</option>
            <option value="important">Важная</option>
        </select>
        <button @click.prevent="handleSendToDo(creatingToDo)">Завести задачу</button>
    </form>
</template>
<script setup lang="ts">

</script>
<style></style>=""