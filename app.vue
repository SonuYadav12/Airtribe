<script setup>
import { useTrelloStore } from './stores/trello';
const trelloStore = useTrelloStore();
</script>

<template>
    <div class=" h-[100vh] bg-gradient-to-tr from-black  to-gray-500 over-flow-auto">
        <div class="text-4xl  p-3 bg-white  text-white flex items-center justify-between mb-10">
            <img width="200" class="mr-3" src="/download.jpg" alt="trello">
            <h1>Trello</h1>
            <button type="button"
                class="text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                v-on:click="trelloStore.addArray()">ADD
            </button>
        </div>
        <NuxtPage />
    </div>
</template>