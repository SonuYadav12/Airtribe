<script setup lang="ts">
import { ref } from "vue";
import type { Column } from "../types/index";
import { nanoid } from "nanoid";
import draggable from "vuedraggable"
import { useTrelloStore } from '../stores/trello';
const trelloStore = useTrelloStore();
trelloStore.getItems();

import { useKeyModifier } from '@vueuse/core'

const shift = useKeyModifier('Shift', { initial: false })

console.log(shift.value)


const remove = (idx) => {
  console.log("Columna ID: ", idx)
  trelloStore.columns = trelloStore.columns.filter((c) => c.id !== idx);
}

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
    console.log("Columnas: ", trelloStore.columns)
  });
}
</script>

<template>
  <div class="flex-wrap flex items-start overflow-x-auto gap-4">
    <draggable
      v-model="trelloStore.columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex-wrap flex gap-4 items-start"
    >
      <template #item="{ element: column }:  { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="justify-between flex font-bold mb-4 ">
            <drag-handle />
            <input
              class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
              @keydown.enter="($event.target as HTMLInputElement).blur()"
              @keydown.escape="
                column.title === ''
                  ? (trelloStore.columns = trelloStore.columns.filter((c) => c.id !== column.id))
                  : null
              "
              type="text"
              v-model="column.title"
            />
            <Remove @click="remove(column.id)"/>
          </header>
          <draggable
            v-model="column.tasks"
            group="tasks"
            :animation="150"
            item-key="id">
            <template #item="{ element: task }: { element: Task }">
              <TrelloBoardTask
              :task="task"
              @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)" 
              />
          </template>
          </draggable>   
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
    <button
      @click="createColumn"
      class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
    >
      +New Column
    </button>
    
  </div>  
</template> 