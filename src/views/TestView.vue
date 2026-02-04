<script setup lang="ts">
import TicketTable from "@/components/TicketTable.vue";
</script>

<template>
  This is a test webpage <br/>
  <suspense>
    <template #default>
      <TicketTable/>
    </template>
    <template #fallback>
      loading...
    </template>
  </suspense>
</template>

<style scoped>

</style>
