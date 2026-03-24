
  <!-- Tabla de componente-->
<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm font-quicksand">
      <slot/>
    </table>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

table{
  border-collapse: collapse;
  width: 100%;
  font-family: "quicksand";
}

</style>
