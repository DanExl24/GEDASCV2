<template>
  <th class="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#6b8a6b] bg-[#f8fbf8] border-b border-[#daeeda] whitespace-nowrap">
    {{ name }}
  </th>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    name:string,
  }>(),{
    name:'Name'
  })
</script>

<style>

</style>
