<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import type { Column, Task } from "../types/index";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";
import { useTrelloStore } from '../stores/trello';
import { useKeyModifier } from '@vueuse/core';

const trelloStore = useTrelloStore();
trelloStore.getItems();

const shift = useKeyModifier('Shift', { initial: false });

const remove = (idx) => {
  console.log("Column ID: ", idx);
  trelloStore.columns = trelloStore.columns.filter((c) => c.id !== idx);
};

function createColumn() {
  const column: Column = {
    id: nanoid(),
    title: "",
    tasks: [],
  };
  trelloStore.columns.push(column);
  nextTick(() => {
    (
      document.querySelector(
        ".column:last-of-type .title-input"
      ) as HTMLInputElement
    ).focus();
    console.log("Columns: ", trelloStore.columns);
  });
}

const countTasks = computed(() => {
  const taskCounts = {};
  trelloStore.columns.forEach((column) => {
    taskCounts[column.id] = column.tasks.length;
  });
  return taskCounts;
});
</script>


<template>
  <div class="flex flex-wrap items-start overflow-x-auto gap-4 p-4">
    
    <draggable
      v-model="trelloStore.columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex flex-wrap gap-4"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="w-full md:w-72 bg-gray-200 p-4 rounded-md shadow-md">
         
          <header class="flex items-center justify-between mb-4 bg-blue-500 rounded-t-md py-2 px-4">
            <drag-handle class="cursor-move mr-2 text-white"></drag-handle>
            <input
              class="title-input bg-transparent focus:bg-white rounded px-2 py-1 w-3/4 md:w-full"
              @keydown.enter="($event.target as HTMLInputElement).blur()"
              @keydown.escape="
                column.title === ''
                  ? (trelloStore.columns = trelloStore.columns.filter((c) => c.id !== column.id))
                  : null
              "
              type="text"
              v-model="column.title"
              placeholder="Enter column title"
            />
            <Remove @click="remove(column.id)" class="cursor-pointer text-black"></Remove>
          </header>
          
          <draggable
            v-model="column.tasks"
            group="tasks"
            :animation="150"
            item-key="id"
          >
            <template #item="{ element: task }: { element: Task }">
              <div class="bg-white rounded-md p-2 mb-2">
                <TrelloBoardTask
                  :task="task"
                  @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)"
                />
              </div>
            </template>
          </draggable>
         
          <footer class="bg-gray-500 rounded-b-md py-2 px-4">
            <NewTask class="cursor-pointer text-black" @add="column.tasks.push($event)" />
          </footer>
         
          <div class="text-sm text-gray-700 mt-2">Tasks: {{ countTasks[column.id] }}</div>
        </div>
      </template>
    </draggable>
    
    
    <button
      @click="createColumn"
      class="bg-green-500 hover:bg-green-600 text-white whitespace-nowrap p-2 rounded shadow-md"
    >
      + New Task
    </button>
    
  </div>
</template>
