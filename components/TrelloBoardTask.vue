<script setup lang="ts">
import type { Task, ID } from "@/types";
const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "delete", payload: ID): void;
}>();

const borrar = () => {
  if (focused.value) emit("delete", props.task.id);
}

const focused = ref(false);
onKeyStroke("Backspace", (e) => {
  if (focused.value) emit("delete", props.task.id);
});

</script>
<template>
  <div
    :title="task.createdAt.toLocaleString()"
    class="flex justify-between"
    @focus="focused = true"
    @blur="focused = false"
    tabindex="0"
  >
    <DragHandle class="pr-2 pt-2" />
    <div class="task bg-white p-2 mb-2 rounded shadow-sm w-full">
    <span class="h-60 w-60" >
      {{ task.title }}
    </span>
    </div>
    <div>
  <Remove class="ml-2 mt-1" @click="borrar"/>
</div>
    </div>
</template>
<style>
.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: "";
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}

.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}
</style>