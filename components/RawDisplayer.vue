<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  title: string
  value: any
}>()

const valueString = computed(() => {
  return JSON.stringify(props.value, null, 2);})

</script>

<template>
  <div>
    <h3>{{ props.title }}</h3>
    <pre>{{ valueString }}</pre>
  </div>
</template>

<style scoped>
pre {
  text-align: start;
}
</style>