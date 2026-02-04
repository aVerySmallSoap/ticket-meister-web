<script setup lang="ts">
import TicketItem from "@/components/TicketItem.vue";
import type {Ticket} from "@/types/types.ts"
const ticketsList: Ticket[] = await fetch(`http://localhost:8000/tickets/?offset=0&limit=100`)
  .then(response => response.json())
  .then(list => {
    let format_options = {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"}
    return (list as any[]).map(t => ({
      ...t,
      date: new Date(t.date).toLocaleDateString("en-US", format_options),
    })) as Ticket[]
  })
</script>

<template>
  <TicketItem :tickets="ticketsList"/>
</template>

<style scoped>

</style>
