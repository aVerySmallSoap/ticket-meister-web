<script setup lang="ts">
import { ticket_columns } from '@/components/tickets/ticket_columns.ts'
import { Priorities, RequestType, type Ticket } from '@/types/types.ts'
import TicketTable from '@/components/tickets/TicketTable.vue'
import { onMounted, ref } from 'vue'

const data = ref<Ticket[]>([])

async function fetchTickets() {
  const response = await fetch(`http://localhost:8000/tickets/?offset=0&limit=100`)
  const tickets = await response.json()
  return formatTickets(tickets)
}

function formatTickets(tickets: object) {
  const format_options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  return (tickets as any[]).map((t) => ({
    ...t,
    date: new Date(t.date).toLocaleDateString('en-US', format_options),
    priority: Priorities[t.priority],
    request_type: RequestType[t.request_type],
    personnel: t.personnel ? t.personnel : 'None',
  })) as Ticket[]
}

function testEmit(n: Ticket[]) {
  console.log(typeof n)
}

onMounted(async () => {
  data.value = await fetchTickets()
})
</script>

<template>
  <TicketTable :columns="ticket_columns" :data="data" @update:mark-all="(n) => testEmit(n)"/>
</template>

<style scoped></style>
